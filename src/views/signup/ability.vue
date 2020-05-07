<template>
	<div class="topview ability">
		<!-- <van-nav-bar title="入组申请" left-arrow @click-left="goback" /> -->
		<!-- 新增开始 -->
		<Topphoto></Topphoto>
		<!-- 新增结束 -->
		<div class="centxt">
			<p class="ctitle">{{msg}}</p>
			<p class="csecond">你能贡献何种知识或能力</p>
			<div class="content">
				<!-- 您的能力 -->
				<div class="tpop">
					<!-- <textarea class="textarea" name="" v-show="hiddenThis" cols="30" rows="10" maxlength="500" v-model="comer.ability" placeholder="这是一个互助组织,我们需要了解你能提供给他人的帮助,不管是能力、经验或者是资源都可以。" @click="getbottom($event)"/>
					<div v-show="hiddenThis" @click="getbottom($event)" class="topshade">{{comer.ability}}</div> -->
					<van-field v-model="comer.ability" readonly class="textarea" v-show="hiddenThis" type="textarea" placeholder="这是一个互助组织,我们需要了解你能提供给他人的帮助,不管是能力、经验或者是资源都可以。" @click="getbottom($event)" />
					<div class="showpop" v-show="showPop">
						<div class="flexrow">
							<van-icon name="arrow-left" color="#666666" size="22px" @click="closePop"/>
							<div class="iconfont icon-wancheng1" style="font-size:22px;color:#666666" @click="subMsg"></div>
						</div>
						<van-field v-model="comer.ability" ref="inputVal" input-align type="textarea" maxlength="500" placeholder="这是一个互助组织,我们需要了解你能提供给他人的帮助,不管是能力、经验或者是资源都可以。" show-word-limit @click="getbottom($event)"/>
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
		name: 'ability',

		data() {
			return {
				msg: '你的价值',
				comer: this.getSSObj('comer'),
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
				if (this.comer === null || this.comer === undefined) {
					this.$router.push({
						name: 'entry'
					})
				}
			},

			checkFilled() {
				if (this.isEmptyStr(this.comer.ability)) {
					this.$toast("请填写价值描述");
					return false;
				}

				return true;
			},

			goback() {
				this.setSSObj('comer', this.comer);

				this.$router.go(-1)
			},

			gobr() {
				this.setSSObj('comer', this.comer);

				if (this.checkFilled()) {
					this.$router.push({
						name: 'meetaddr'
					})
				}
			},

			getbottom(e) {
				let pos = e.target.getBoundingClientRect();
				this.fbottom = pos.bottom;
				this.showPop = true;
				this.hiddenThis = false;
				this.$nextTick(()=>{
					this.$refs.inputVal.focus()
				})
				// setTimeout("document.getElementById('getfocus').focus()",500);
			},
			closePop() {
				this.showPop = false;
				this.hiddenThis = true;
				this.comer = this.getSSObj('comer')
			},
			subMsg() {
				this.showPop = false;
				this.hiddenThis = true;
				this.setSSObj('comer', this.comer);
			},
		}
	}
</script>

<style scoped>
	.tpop {
		margin: 0 auto;
	}
</style>
