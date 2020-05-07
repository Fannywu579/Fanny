<template>
  <div class="topview">
    <!-- <van-nav-bar /> -->
	<div class="img">
		<img src="../../assets/logo.png" alt="" >
	</div>
    <div class="centxt">
      <p class="bgtxt">
        你好，欢迎来到80分运营俱乐部
        <br />这里是面向运营从业者的私享会组织
        <br />让我们一起突破瓶颈，成为更优秀的运营人
      </p>
      <p class="btmtxt">立即定制属于你的私享会！</p>
    </div>
    <div class="btn" @click="gobr">开始</div>
    <!-- 开始 -->
  </div>
</template>

<script>
  export default {
    name: 'entry',
    data() {
      return {
        user: null,
        resume: null,
        comer: null
      }
    },

    watch: {
      user: {
        handler: 'getResumeAndComer'
      },
      resume: {
        handler: 'decideJump'
      },
      comer: {
        handler: 'decideJump'
      }
    },

    mounted: function() {
      sessionStorage.clear();
      this.getUser();
    },

    methods: {
      //获取个人信息
      getUser() {
        let userId = localStorage.getItem('userId');
        console.log(userId);
        this.api.getUser(userId).then(data => {
          if (data.code === 200) {
            this.user = data.data;
            if (this.user == null) {
              this.user = {}
            }
          }
        });
      },

      //获取个人履历
      getResume() {
        let userId = localStorage.getItem('userId');
        this.api.getResume(userId).then(data => {
          if (data.code === 200) {
            this.resume = data.data;
            if (this.resume == null) {
              this.resume = {}
            }
          }
        });
      },

      //获取报名信息
      getComer() {
        let userId = localStorage.getItem('userId');
        this.api.getComer(userId).then(data => {
          if (data.code === 200) {
            this.comer = data.data;
            if (this.comer == null) {
              this.comer = {
                  question : '',
                  ability : ''
              }
            }
          }
        });
      },

      getResumeAndComer() {
        this.getResume();
        this.getComer();
      },

      // 跳转页判断
      decideJump() {
        if (this.user == null || this.resume == null || this.comer == null) {
          return;
        }

        this.setSSObj('user', this.user);
        this.setSSObj('resume', this.resume);
        this.setSSObj('comer', this.comer);

        //如果没有个人信息和履历信息，则不直接跳转
        if (this.user.id === undefined || this.resume.userId === undefined) {
          return;
        }

        // let nextPage = '';

        // if (this.comer.userId === undefined) {
        //   nextPage = 'question';
        // } else {
        //   if (this.comer.isInvalid === true || this.comer.checkResult === 2) {
        //     nextPage = 'question';
        //   } else {
        //     nextPage = 'status';
        //   }
        // }
        //
        // this.$router.push({
        //   name: nextPage
        // });
      },

      gobr() {
        this.$router.push({
          name: 'uname'
        })
      }
    }
  }
</script>

<style scoped>
    .topview .img img{
      width:102px;
      height:67px;
      margin-top: 118px;
    }
  /* 设置遮罩层 */
  .centxt .bgtxt {
    line-height: 30px;
    text-align: center;
    margin-top: 30px;
    font-size: 15px;
  }

  .centxt .btmtxt {
    text-align: center;
    margin-top: 30px;
    font-size: 15px;
  }
</style>
