import http from '../js/http'
import globalConfig from "../../globalConfig";

const apiUrl = {
  'baseUrl':globalConfig.baseUrl,
  'login': globalConfig.baseUrl + '/user/login',//获取账号头像
  'getUser': globalConfig.baseUrl + '/opclub/user',//获取用户信息
  'newUser': globalConfig.baseUrl + '/opclub/user/new',//创建新的用户
  'updateUser': globalConfig.baseUrl + '/opclub/user/update',//更新用户信息
  'getResume': globalConfig.baseUrl + '/opclub/resume',//获取履历信息
  'newResume': globalConfig.baseUrl + '/opclub/resume/new',//创建履历信息
  'updateResume': globalConfig.baseUrl + '/opclub/resume/update',//更新履历信息
  'getComer': globalConfig.baseUrl + '/opclub/comer',//获取报名信息
  'newComer': globalConfig.baseUrl + '/opclub/comer/new',//创建报名信息
  'updateComer': globalConfig.baseUrl + '/opclub/comer/update',//更新报名信息
  'getWxUser': globalConfig.baseUrl + '/user/wxuserinfo'//判断token是否失效
 };

const api = {
  login: function (params) {
    return http.post(apiUrl.login, params);
  },

  getUser: function (userId) {
    return http.get(apiUrl.getUser + '/' + userId);
  },

  newUser: function (user) {
    return http.post(apiUrl.newUser, user);
  },

  updateUser: function (user) {
    return http.post(apiUrl.updateUser, user);
  },

  getResume: function (userId) {
    return http.get(apiUrl.getResume + '/' + userId);
  },

  newResume: function (resume) {
    return http.post(apiUrl.newResume, resume);
  },

  updateResume: function (resume) {
    return http.post(apiUrl.updateResume, resume);
  },

  getComer: function (userId) {
    return http.get(apiUrl.getComer + '/' + userId);
  },

  newComer: function (comer) {
    return http.post(apiUrl.newComer, comer);
  },

  updateComer: function (comer) {
    return http.post(apiUrl.updateComer, comer);
  },

};

export default api;
