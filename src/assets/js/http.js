import axios from 'axios';
import router from "../../router";
import {Toast} from 'vant'

// 设置请求超时时间和域名

axios.defaults.timeout = 5000;

// axios.defaults.baseURL = 'http://gweixin-dev.80points.com.cn/public';

//  http request 拦截器
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('token')) {
      config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    }
    // config.data = JSON.stringify(config.data);
    // config.headers = {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // };
    return config
  }, err => {
    return Promise.reject(err);
  }
);

//  响应拦截器即异常处理
axios.interceptors.response.use(response => {
  if (response.data.code !== 200) {
    //token失效或授权失败
    if (response.data.code === 1101205) {
      //存储当前页面Url，在登录成功后做重定向
      sessionStorage.setItem('fromUrl', router.currentRoute.fullPath);
      router.replace({
        name: 'login'
      })
    } else {
      Toast("接口调用失败");
    }
  }
  return response
}, err => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        console.log('错误请求');
        break;
      case 401:
        console.log('未授权，请重新登录');
        break;
      case 403:
        console.log('拒绝访问');
        break;
      case 404:
        console.log('请求错误,未找到该资源');
        break;
      case 405:
        console.log('请求方法未允许');
        break;
      case 408:
        console.log('请求超时');
        break;
      case 500:
        console.log('服务器端出错');
        break;
      case 501:
        console.log('网络未实现');
        break;
      case 502:
        console.log('网络错误');
        break;
      case 503:
        console.log('服务不可用');
        break;
      case 504:
        console.log('网络超时');
        break;
      case 505:
        console.log('http版本不支持该请求');
        break;
      default:
        console.log(`连接错误${err.response.status}`);
    }
  } else {
    console.log('连接到服务器失败');
  }

  return Promise.resolve(err.response);
});

/**
* 封装get方法
* @param url
* @param data
* @returns {Promise}
*/
function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
        params: params
      })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
* 封装post请求
* @param url
* @param data
* @returns {Promise}
*/
function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

/**
* 封装patch请求
* @param url
* @param data
* @returns {Promise}
*/
function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

/**
* 封装put请求
* @param url
* @param data
* @returns {Promise}
*/
function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

//   开放接口
export default {
  get: get,
  post: post,
  put: put,
  patch: patch
}

// 4. 在api中编辑测试接口

// import http from './http'

// export const api = {

//   getProductList: function(paramObj) {

//     return http.get('/product/list', paramObj)

//   }

// }

// 5. 在main.js中设置全局变量

// import {
//   api
// } from './server/api'

// 定义全局变量

// Vue.prototype.$api = api

// 6. 在vue组件中调用

// export default {

//   name: 'homeIndex',

//   data() {

//     let paramObj = {

//       page_no: 1,

//       page_size: 10

//     }

//     this.$api.getProductList(paramObj).then(data => {

//       console.log(data)

//     })

//     return {

//       list: []

//     }

//   }

// }
