var oproto = Object.prototype;
var serialize = oproto.toString;
var Rxports = {
  /*判定是否类数组，如节点集合，纯数组，arguments与拥有非负整数的length属性的纯JS对象*/
  isArrayLike: function(obj) {
    if (!obj) return false;
    var n = obj.length;
    if (n === n >>> 0) {
      //检测length属性是否为非负整数
      var type = serialize.call(obj).slice(8, -1);
      if (/(?:regexp|string|function|window|global)$/i.test(type)) return false;
      if (type === "Array") return true;
      try {
        if ({}.propertyIsEnumerable.call(obj, "length") === false) {
          //如果是原生对象
          return /^\s?function/.test(obj.item || obj.callee);
        }
        return true;
      } catch (e) {
        //IE的NodeList直接抛错
        return !obj.window; //IE6-8 window
      }
    }
    return false;
  },
  /*遍历数组与对象,回调的第一个参数为索引或键名,第二个或元素或键值*/
  each: function(obj, fn) {
    var That = this;
    if (obj) {
      //排除null, undefined
      var i = 0;
      if (That.isArrayLike(obj)) {
        for (var n = obj.length; i < n; i++) {
          if (fn(i, obj[i]) === false) break;
        }
      } else {
        for (i in obj) {
          if (obj.hasOwnProperty(i) && fn(i, obj[i]) === false) {
            break;
          }
        }
      }
    }
  },
  /**
	  * 获取url传过来的参数
	  * @param name 	获取的参数
	  * @param Url 		自定义获取参数的链接
	  * @param return
	*/
  getUrlQuery: function(name, Url) {
    //URL GET 获取值
    var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i"),
      url = Url || location.href;
    if (reg.test(url)) return unescape(RegExp.$2.replace(/\+/g, " "));
    return "";
  }
};

export default Rxports;
