'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var index = require('../index');

describe('index', function () {
  var from = '\u4E00\u65E6\u6784\u9020\u597D\u5F02\u5E38\u5BF9\u8C61\uFF0C\u63A7\u5236\u6D41\u5373\u53CD\u5411\u4F5C\u4E1A\uFF08\u5728\u8C03\u7528\u6808\u5411\u4E0A\uFF09\u76F4\u81F3\u5B83\u62B5\u8FBE try \u5757\u7684\u8D77\u70B9\uFF0C\u5728\u8BE5\u70B9\u6309\u51FA\u73B0\u987A\u5E8F\u6BD4\u8F83\u6240\u6709\u5173\u8054\u7684 catch \u5757\u53C2\u6570\u548C\u5F02\u5E38\u5BF9\u8C61\u7684\u7C7B\u578B\uFF0C\u4EE5\u627E\u5230\u5339\u914D\uFF08\u6B64\u8FC7\u7A0B\u7684\u7EC6\u8282\u89C1 try-catch \uFF09\u3002\u82E5\u627E\u4E0D\u5230\u5339\u914D\uFF0C\u5219\u63A7\u5236\u6D41\u7EE7\u7EED\u56DE\u6EAF\u6808\uFF0C\u76F4\u81F3\u4E0B\u4E2A try \u5757\uFF0C\u6B64\u540E\u4EA6\u7136\u3002\u82E5\u627E\u5230\u5339\u914D\uFF0C\u5219\u63A7\u5236\u6D41\u8DF3\u5230\u5339\u914D\u7684 catch \u5757\u3002';
  var to = '\u4E00\u65E6\u69CB\u9020\u597D\u7570\u5E38\u5C0D\u8C61\uFF0C\u63A7\u5236\u6D41\u5373\u53CD\u5411\u4F5C\u696D\uFF08\u5728\u8ABF\u7528\u68E7\u5411\u4E0A\uFF09\u76F4\u81F3\u5B83\u62B5\u9054 try \u584A\u7684\u8D77\u9EDE\uFF0C\u5728\u8A72\u9EDE\u6309\u51FA\u73FE\u9806\u5E8F\u6BD4\u8F03\u6240\u6709\u95DC\u806F\u7684 catch \u584A\u53C3\u6578\u548C\u7570\u5E38\u5C0D\u8C61\u7684\u985E\u578B\uFF0C\u4EE5\u627E\u5230\u5339\u914D\uFF08\u6B64\u904E\u7A0B\u7684\u7D30\u7BC0\u898B try-catch \uFF09\u3002\u82E5\u627E\u4E0D\u5230\u5339\u914D\uFF0C\u5247\u63A7\u5236\u6D41\u7E7C\u7E8C\u56DE\u6EAF\u68E7\uFF0C\u76F4\u81F3\u4E0B\u500B try \u584A\uFF0C\u6B64\u5F8C\u4EA6\u7136\u3002\u82E5\u627E\u5230\u5339\u914D\uFF0C\u5247\u63A7\u5236\u6D41\u8DF3\u5230\u5339\u914D\u7684 catch \u584A\u3002';

  it('should have expected keys', function () {
    ['ready', 'Converter', 'DictSource'].forEach(function (name) {
      expect(index[name]).toBeTruthy();
    });
  });

  it('should work as an example', function (done) {
    var Converter = index.Converter,
        DictSource = index.DictSource;


    var dictSource = new DictSource('s2t.json');
    dictSource.get().then(function (args) {
      var converter = new (Function.prototype.bind.apply(Converter, [null].concat(_toConsumableArray(args))))();

      expect(converter.convert(from)).toBe(to);

      converter.delete();
      done();
    });
  });
});