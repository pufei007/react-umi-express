import dynamic from "umi/dynamic";

//通用方法————方法按名称排序
const utils = {
  //修改url参数
  changeUrlParam: (url, paramName, paramValue) => {
    try {
      let strParam = "";
      if (url.indexOf("?") !== -1) {
        strParam = url.substr(url.indexOf("?") + 1);
        let returnUrl = "";
        let setParam = "";
        let arrParam;
        let modify = "0";
        if (strParam.indexOf("&") !== -1) {
          arrParam = strParam.split("&");
          for (let i in arrParam) {
            if (arrParam[i].split("=")[0] === paramName) {
              setParam = paramValue;
              modify = "1";
            } else {
              setParam = arrParam[i].split("=")[1];
            }
            returnUrl =
              returnUrl + arrParam[i].split("=")[0] + "=" + setParam + "&";
          }
          returnUrl = returnUrl.substr(0, returnUrl.length - 1);
          if (modify === "0" && returnUrl === strParam) {
            returnUrl = returnUrl + "&" + paramName + "=" + paramValue;
          }
        } else {
          if (strParam.indexOf("=") !== -1) {
            arrParam = strParam.split("=");
            if (arrParam[0] === paramName) {
              setParam = paramValue;
              modify = "1";
            } else {
              setParam = arrParam[1];
            }
            returnUrl = arrParam[0] + "=" + setParam;
            if (modify === "0" && returnUrl === strParam) {
              returnUrl = returnUrl + "&" + paramName + "=" + paramValue;
            }
          } else {
            returnUrl = paramName + "=" + paramValue;
          }
        }
        url = url.substr(0, url.indexOf("?")) + "?" + returnUrl;
      } else {
        url = url + "?" + paramName + "=" + paramValue;
      }
      return url;
    } catch (e) {
      utils.throwError(e);
      return;
    }
  },
  //获取动态组件
  getDynamicComponent: url => {
    try {
      return dynamic(async function() {
        //"~/" + url+".js"
        return import(`~/${url}.js`);
      });
    } catch (e) {
      utils.throwError(e);
    }
  },
  //获取新Guid
  getNewGuid: () => {
    try {
      var d = new Date().getTime();
      if (
        typeof performance !== "undefined" &&
        typeof performance.now === "function"
      ) {
        d += performance.now();
      }
      return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16).toUpperCase();
      });
    } catch (e) {
      utils.throwError(e);
    }
  },
  //判断js对象是否为空、NULL、undefined等    common.base.isNullOrEmpty
  isNullOrEmpty: obj => {
    var result = false;
    try {
      var type = typeof obj;
      switch (type) {
        case "string":
          if (obj === "" || obj === undefined || obj === null) {
            result = true;
          }
          break;
        case "number":
          if (obj === undefined || obj === null) {
            result = true;
          }
          break;
        case "object":
          if (obj === undefined || obj === null || obj.length === 0) {
            result = true;
          }
          break;
        default:
          if (obj === undefined || obj === null) {
            result = true;
          }
          break;
      }
    } catch (e) {
      utils.throwError(e);
      result = true;
    }
    return result;
  },
  //将json格式转为keyValue形式（key=value&key1=value1）
  jsonToKeyValue: obj => {
    try {
      let result = [];
      for (let i in obj) {
        result.push(i + "=" + obj[i]);
      }
      return result.join("&");
    } catch (e) {
      utils.throwError(e);
    }
  },
  //抛错
  throwError: e => {
    console.error(e);
  },
  //设置cookie
  setCookie: (name, value) => {
    var Days = 30; //此 cookie 将被保存 30 天
    var exp = new Date(); //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    if (typeof value == "string" && value.length > 0) {
      document.cookie =
        name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    } else {
      var exp = new Date();
      exp.setTime(exp.getTime() - 1);
      var cval = utils.getCookie(name);
      if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
  },
  //获取cookie
  getCookie: name => {
    // (^| )name=([^;]*)(;|$),match[0]为与整个正则表达式匹配的字符串，match[i]为正则表达式捕获数组相匹配的数组；
    var arr = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]*)(;|$)")
    );
    if (arr != null) {
      return unescape(arr[2]);
    }
    return null;
  }
  // //删除cookie
  // delCookie:name=>{
  //   let exp = new Date();
  //   exp.setTime(exp.getTime() - 1);
  //   let cval=utils.getCookie(name);
  //   if(cval!=null)
  //       document.cookie= name + "="+cval+";expires="+exp.toGMTString();

  // }
};

export default utils;
