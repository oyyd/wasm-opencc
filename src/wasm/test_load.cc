#include <fstream>
#include <stdio.h>

int main() {
  std::ifstream ifs;

  ifs.open("/s2t.json");
  if (ifs.is_open()) {
    fprintf(stderr, "%s\n", "YES");
  } else {
    fprintf(stderr, "%s\n", "FALSE");
  }

  return 0;
}
