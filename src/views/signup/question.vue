<template>
	<div class="topview question">
		<!-- <van-nav-bar title="入组申请" left-arrow @click-left="goback" /> -->
		<!-- 新增开始 -->
		<Topphoto></Topphoto>
		<!-- 新增结束 -->
		<div class="centxt">
			<p class="ctitle">{{msg}}</p>
			<p class="csecond">最让你夜不能寐的问题</p>
			<div class="content">
				<!-- 你的问题 -->
				<div class="tpop">
					<!-- <textarea class="textarea" cols="30" rows="10" maxlength="1000" v-show="hiddenThis" v-model="comer.question" placeholder="简述最让你纠结、头秃的问题。" @click="getbottom($event)" />
					<div v-show="hiddenThis" @click="getbottom($event)" class="topshade">{{comer.question}}</div> -->
					<van-field v-model="comer.question" readonly class="textarea" v-show="hiddenThis" type="textarea" placeholder="简述最让你纠结、头秃的问题。" @click="getbottom($event)" />
					<div class="showpop" v-show="showPop">
						<div class="flexrow">
							<van-icon name="arrow-left" color="#666666" size="22px" @click="closePop" />
							<div class="iconfont icon-wancheng1" style="font-size:22px;color:#666666" @click="subMsg"></div>
						</div>
						<van-field v-model="comer.question" ref="inputVal" input-align type="textarea" maxlength="500" placeholder="简述最让你纠结、头秃的问题。" show-word-limit />
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
		name: 'question',

		data() {
			return {
				msg: '你的困惑',
				comer: this.getSSObj('comer'),
				fbottom: 0,
				showBtn: true,
				headImgUrl: '',
				showPop: false,
				hiddenThis: true,
			}
		},
		components: {
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

			goback() {
				this.setSSObj('comer', this.comer);

				this.$router.go(-1);
			},

			checkFilled() {
				if (this.isEmptyStr(this.comer.question)) {
					this.$toast("请填写你的困惑");
					return false;
				}

				return true;
			},

			gobr() {
				this.setSSObj('comer', this.comer)

				if (this.checkFilled()) {
					this.$router.push({
						name: 'ability'
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
			}
		}
	}
</script>

<style scoped>
	.tpop {
		margin: 0 auto;
	}
/* 	.showpop .textarea{
		position: absolute;
		top:0;
		left:0;
		right:0;
		padding:0px 20px;
		padding-top:50px;
		background-color: #F6F8F9;
		resize: none;
		border: none;
		font-size:16px;
		width:90%;
		height: 450px;
		text-align: justify;
	}
	.showpop .xianzhi{
		position: fixed;
		top:0;
		left:0;
		right:0;
		padding:0px 20px;
		padding-top:15px;
		font-size: 16px;
		z-index: 999;
	} */
</style>
