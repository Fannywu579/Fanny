export default {
  // eslint-disable-next-line no-unused-vars
  install(Vue, options) {
    /*设置本地储存变量值*/
    Vue.prototype.setLSObj = function(name, value) {
      localStorage.setItem(name, JSON.stringify(value));
    };

    /*获取本地储存变量值*/
    Vue.prototype.getLSObj = function(name) {
      return JSON.parse(localStorage.getItem(name));
    };

    /*设置会话储存变量值*/
    Vue.prototype.setSSObj = function(name, value) {
      sessionStorage.setItem(name, JSON.stringify(value));
    };

    /*获取会话储存变量值*/
    Vue.prototype.getSSObj = function(name) {
      return JSON.parse(sessionStorage.getItem(name));
    };

    Vue.prototype.isEmptyStr = function(str) {
      if(str === undefined || str === null || str === '') {
        return true;
      }
      return false;
    }
  }
}
