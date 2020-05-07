<template>
	<div class="topview">
		<!-- <van-nav-bar title="入组申请" left-arrow @click-left="goback" /> -->
		<!-- 新增开始 -->
		<Topphoto></Topphoto>
		<!-- 新增结束 -->
		<div class="centxt">
			<p class="ctitle">{{msg}}</p>
			<p class="csecond">方便我们给你通风报信</p>
			<div class="content">
				<van-field type="tel" clearable v-model="user.mobile" placeholder="请输入您的手机号" class="int" @click="getbottom($event)" />
				<van-field v-model="user.wxId" clearable placeholder="请输入您的微信号" class="int" @click="getbottom($event)" />
			</div>
		</div>
		<div class="btn" @click="gobr" v-show="showBtn">下一步</div>
	</div>
</template>

<script>
	import Topphoto from './Topphoto'
	export default {
		name: 'contact',

		data() {
			return {
				msg: '接头暗号',
				user: this.getSSObj('user'),
				fbottom: 0,
				showBtn: true,
				headImgUrl: ''
			}
		},
		components:{
			Topphoto
		},
		mounted() {
			this.initValue()
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
				if (this.user === null || this.user === undefined) {
					this.$router.push({
						name: 'entry'
					})
				}
			},

			checkFilled() {
				if (this.isEmptyStr(this.user.mobile)) {
					this.$toast("请输入您的手机号");
					return false;
				}
				if (!(/^1[345789]\d{9}$/.test(this.user.mobile))) {
					this.$toast("请检查您的的手机号");
					return false;
				}
				if (this.isEmptyStr(this.user.wxId)) {
					this.$toast("请输入您的微信号");
					return false;
				}
				if (!(/^[a-zA-Z1-9][a-zA-Z0-9_-]{5,19}$/.test(this.user.wxId))) {
					this.$toast("请检查您的微信号");
					return false;
				}

				return true;
			},

			goback() {
				//往前也要保存数据
				this.setSSObj('user', this.user);

				this.$router.go(-1);
			},

			// 提交数据
			gobr() {
				//先存一次，以免调用接口失败再回退页面丢失已填数据
				this.setSSObj('user', this.user);

				if (!this.checkFilled()) {
					return;
				}

				console.log('提交数据');

				let api = this.api.updateUser;
				if (this.user.id === null || this.user.id === undefined) {
					this.user.id = localStorage.getItem('userId');
					api = this.api.newUser;
				}
				api(this.user).then(data => {
					console.log(data);
					if (data.code === 200) {
						//保存数据
						this.setSSObj('user', this.user);

						this.$router.push({
							name: 'career'
						});
					}
				});
			},

			getbottom(e) {
				let pos = e.target.getBoundingClientRect();
				this.fbottom = pos.bottom;
			}
		}
	}
</script>

<style scoped>
	.intnum {
		width: 75%;
		margin: 0 auto;
		margin-top: 6%;
		font-size: 18px;
		color: #333;
		border-bottom: 1px solid #333;
		text-align: center;
	}

	.wxid {
		width: 75%;
		margin: 0 auto;
		font-size: 18px;
		color: #333;
		border-bottom: 1px solid #333;
		text-align: center;
	}

	.intnum::-webkit-input-placeholder {
		color: #999;
	}

	.intnum::-moz-placeholder {
		color: #999;
	}

	.intnum:-ms-input-placeholder {
		color: #999;
	}

	.intnum::-ms-input-placeholder {
		text-align: center;
	}

	.intnum::-webkit-input-placeholder {
		text-align: center;
	}

	.cli {
		padding: 0px 48px;
	}
</style>
