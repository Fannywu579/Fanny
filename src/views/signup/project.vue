<template>
	<div class="topview project">
		<!-- <van-nav-bar title="入组申请" left-arrow @click-left="goback" /> -->
		<!-- 新增开始 -->
		<Topphoto></Topphoto>
		<!-- 新增结束 -->
		<div class="centxt">
			<p class="ctitle">{{msg}}</p>
			<p class="csecond">介绍一个你印象最深的项目</p>
			<div class="content">
				<div class="tpop" v-for="(item,index) in projectList" :key="index">
					<!-- <textarea class="textarea" v-show="hiddenThis" maxlength="1000" disabled="disabled" v-model="item.description" placeholder="包括但不限于项目名称、你的角色、项目简介、经验教训。" @click="getbottom($event)" /> -->
					<!-- <div v-show="hiddenThis" @click="getbottom($event)" class="topshade">{{item.description}}</div> -->
					<van-field v-model="item.description" readonly class="textarea" v-show="hiddenThis" type="textarea" placeholder="包括但不限于项目名称、你的角色、项目简介、经验教训。" @click="getbottom($event, index)"/>
					<div class="showpop" v-show="showPop">
						<div class="flexrow">
							<van-icon name="arrow-left" color="#666666" size="22px" @click="closePop"/>
							<div class="iconfont icon-wancheng1" style="font-size:22px;color:#666666" @click="subMsg"></div>
						</div>
						<van-field v-model="item.description" :ref='"inputVal" + index' input-align type="textarea" maxlength="1000" placeholder="包括但不限于项目名称、你的角色、项目简介、经验教训。" show-word-limit />
					</div>
				</div>
			</div>
		</div>
    <div class="btn" @click="gobr" v-show="showBtn">下一步</div>
  </div>
</template>

<script>
	import Topphoto from './Topphoto'
	export default {
    name: 'project',
    data() {
      return {
        msg: '光辉业绩',
        resume: this.getSSObj('resume'),
        projectList: [],
        fbottom: 0,
        showBtn: true,
		headImgUrl:'',
		showPop:false,
		hiddenThis:true
      }
    },
	components:{
		Topphoto
	},
    mounted: function() {
		this.initValue();
      window.onresize = () => {
        if (this.fbottom > document.documentElement.clientHeight) {
          this.showBtn = false;
        } else {
          this.showBtn = true;
        }
      }
      document.body.addEventListener('focusout', function() {
        window.scrollTo(0, 0);
      });
    },

    methods: {
      initValue() {
		this.headImgUrl = localStorage.getItem('headImgUrl')
        if (this.resume === null || this.resume === undefined) {
          this.$router.push({
            name: 'entry'
          })
        }

        if (this.resume.project === undefined || this.resume.project === null) {
          //初始化一个数组元素，用于页面默认显示
          this.resume.project = [{"description" : ''}]
        }
        this.projectList = this.resume.project
		// console.log(this.projectList);
      },

      checkFilled() {
        if (this.isEmptyStr(this.projectList[0].description)) {
          this.$toast("请输入您的项目经历");
          return false;
        }

        return true;
      },

      goback() {
        this.setSSObj('resume', this.resume);

        this.$router.go(-1);
      },

      //提交数据
      gobr() {
        //先存一次，以免调用接口失败再回退页面丢失已填数据
        this.setSSObj('resume', this.resume);

        if (!this.checkFilled()) {
          return;
        }
        console.log('提交数据');

        let api = this.api.updateResume;
        if (this.resume.userId === null || this.resume.userId === undefined) {
          this.resume.userId = localStorage.getItem('userId');
          api = this.api.newResume;
        }
        api(this.resume).then(data => {
          console.log(data);
          if (data.code === 200) {
            this.setSSObj('resume', this.resume);

            this.$router.push({
              name: 'question'
            });
          }
        });
      },
	getbottom(e,index) {
		let pos = e.target.getBoundingClientRect();
		this.fbottom = pos.bottom;
		this.showPop = true;
		this.hiddenThis = false;
		this.$nextTick(()=>{
			this.$refs['inputVal' + index][0].focus()
		})
		// setTimeout("document.getElementById('getfocus').focus()",500);
	},
	closePop() {
		this.showPop = false;
		this.hiddenThis = true;
		this.projectList = this.getSSObj('resume').project;
	},
	subMsg(){
		this.showPop = false;
		this.hiddenThis = true;
		// this.setSSObj('resume', this.resume);
	}

    }
  }
</script>

<style scoped>


</style>
