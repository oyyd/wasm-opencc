// TODO: Add memory tests.
#include "ConversionChain.hpp"
#include "Converter.hpp"
#include "DictGroup.hpp"
#include "Lexicon.hpp"
#include "MaxMatchSegmentation.hpp"
#include "TextDict.hpp"
#include <emscripten/bind.h>

using namespace emscripten;
using namespace opencc;

static DictEntry* ParseKeyValues(const char* buff, size_t lineNum) {
  size_t length;
  const char* pbuff = UTF8Util::FindNextInline(buff, '\t');
  if (UTF8Util::IsLineEndingOrFileEnding(*pbuff)) {
    throw InvalidTextDictionary("Tabular not found " + string(buff), lineNum);
  }
  length = static_cast<size_t>(pbuff - buff);
  string key = UTF8Util::FromSubstr(buff, length);
  vector<string> values;
  while (!UTF8Util::IsLineEndingOrFileEnding(*pbuff)) {
    buff = pbuff = UTF8Util::NextChar(pbuff);
    pbuff = UTF8Util::FindNextInline(buff, ' ');
    length = static_cast<size_t>(pbuff - buff);
    const string& value = UTF8Util::FromSubstr(buff, length);
    values.push_back(value);
  }
  if (values.size() == 0) {
    throw InvalidTextDictionary("No value in an item", lineNum);
  } else if (values.size() == 1) {
    return DictEntryFactory::New(key, values.at(0));
  } else {
    return DictEntryFactory::New(key, values);
  }
}

class Wasm {
public:
  Wasm() {}

  ~Wasm() {}

  // TODO: Remove this.
  void CreateDictFromStringLine_(std::string line) {
    DictEntry* entry = ParseKeyValues(line.c_str(), line.size());
    delete entry;
  }

  void CreateDictFromString_(std::string text) {
    this->CreateDictFromString(text);
  }

  void PushTextDict_(std::string text) { this->PushTextDict(text); }

  void CreateConverter_() { this->CreateConverter(); }

  void PushConversion_(std::string text) { this->PushConversion(text); }

  std::string Convert(std::string text) {
    if (!converter) {
      throw std::runtime_error(
          "You need `Wasm.CreateConverter` before 'Wasm.Convert'.");
    }

    return converter->Convert(text);
  }

private:
  DictEntry* CreateDictFromStringLine(const char* buffer, size_t size) {
    return ParseKeyValues(buffer, size);
  }

  // TODO: Errors here won't be catched.
  // TODO: Test this.
  LexiconPtr CreateDictFromString(std::string text) {
    const int ENTRY_BUFF_SIZE = 4096;

    LexiconPtr lexicon(new Lexicon);

    long index = 0;
    long next = text.find('\n', index);
    size_t lineNum = 1;

    while (next != std::string::npos) {
      char buffer[ENTRY_BUFF_SIZE];
      memcpy(buffer, text.c_str() + index, next - index + 1);
      lexicon->Add(this->CreateDictFromStringLine(buffer, lineNum));

      lineNum += 1;
      index = next + 1;
      next = text.find('\n', index);
    }

    return lexicon;
  }

  DictPtr CreateTextDict(std::string text) {
    LexiconPtr lex = this->CreateDictFromString(text);
    TextDict* textDict = new TextDict(lex);
    return TextDictPtr(textDict);
  }

  void PushTextDict(std::string text) {
    textDictList.push_back(CreateTextDict(text));
  }

  void PushConversion(std::string text) {
    DictPtr dict;
    dict = this->CreateTextDict(text);
    ConversionPtr conversion(new Conversion(dict));
    conversions.push_back(conversion);
  }

  void CreateConverter() {
    if (textDictList.size() == 0) {
      throw std::runtime_error(
          "'Wasm.CreateConverter' needs at least one dict text.");
    }

    if (conversions.size() == 0) {
      throw std::runtime_error(
          "'Wasm.CreateConverter' needs at least one conversion.");
    }

    DictPtr dict = DictGroupPtr(new DictGroup(textDictList));
    SegmentationPtr segmentation =
        SegmentationPtr(new MaxMatchSegmentation(dict));
    ConversionChainPtr chain(new ConversionChain(conversions));

    // TODO:
    std::string name = "Simplified Chinese to Traditional Chinese";
    converter = ConverterPtr(new Converter(name, segmentation, chain));
  }

  std::list<DictPtr> textDictList;
  std::list<ConversionPtr> conversions;
  ConverterPtr converter;
};

EMSCRIPTEN_BINDINGS(wasm) {
  class_<Wasm>("Wasm")
      .constructor<>()
      .function("createDictFromStringLine_", &Wasm::CreateDictFromStringLine_)
      .function("createDictFromString_", &Wasm::CreateDictFromString_)
      .function("createTextDict_", &Wasm::PushTextDict_)
      .function("createConverter_", &Wasm::CreateConverter_)
      .function("pushConversion_", &Wasm::PushConversion_)
      .function("convert", &Wasm::Convert);
}
