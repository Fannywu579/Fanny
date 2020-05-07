<template>
  <div class="login">

  </div>
</template>

<script>
  import globalConfig from "../globalConfig";

  export default {
    // data() {
    //
    // },

    mounted: function() {
      //清除token
      localStorage.removeItem('token');
      this.login();
    },

    methods: {
      getRequest(){ //获取回调url及参数
        let url = location.search; //获取url中"?"符后的字串
        let theRequest = {};
        if (url.indexOf("?") !== -1) {
          let str = url.substr(1);
          let strs = str.split("&");
          for(let i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
          }
        }
        return theRequest;
      },

      getWxCode() {
        let url = encodeURIComponent(globalConfig.myUrl + '/login');
        console.log(url);
        window.location.href =
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + globalConfig.appId + "&redirect_uri=" + url +
          "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
      },

      login() {
        let theRequest = this.getRequest();
        let code = theRequest.code;
        // 如果没有code进行授权
        if (!code) {
          this.getWxCode();
        } else {
          // 有code请求接口获取token
          this.api.login({
              appType: "mp",
              appNo: 1,
              params: {
                'code': code
              }
            })
            .then(data => {
              // console.log(data.status)
              console.log(data)
              if (data.code === 200) {
                console.log(data.msg);
                this.saveLogin(data.data);

                //跳转回登录前页面
                this.goback();
              }
            })
        }
      },

      saveLogin(data) {
        let token = data.token;
        let userId = data.user.userId;
        let headImgUrl = data.user.headImgUrl;
		let nickName = data.user.nickname;
		console.log(nickName);
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('headImgUrl', headImgUrl);
		localStorage.setItem('nickName', nickName);
      },

      goback() {
        //取出登录前url（在拦截器里保存的），跳转回去
        let url = sessionStorage.getItem('fromUrl');
        this.$router.replace({path: url});
      }
    }
  }
</script>

<style scoped>
</style>
