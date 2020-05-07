<template>
	<div class="topview">
		<!-- <van-nav-bar title="入组申请" @click-left="goback" /> -->
		<!-- 新增开始 -->
		<Topphoto></Topphoto>
		<!-- 新增结束 -->
		<div class="centxt">
			<p class="ctitle">{{msg}}</p>
			<p class="csecond">让大家更好的认识你</p>
			<div class="content">
				<van-field class="int" style="visibility:hidden;" disabled/>
				<van-field type="text" clearable maxlength="32" v-model="user.fullname" class="int" placeholder="请输入你的名字" @click="getbottom($event)" />
			</div>
		</div>
		<div class="btn" @click="gobr" v-show="showBtn">下一步</div>
	</div>
</template>
<script>
	import Topphoto from './Topphoto'
	export default {
		name: 'uname',

		data() {
			return {
				msg: '尊姓大名',
				user: this.getSSObj('user'),
				fbottom: 0,
				showBtn: true,
				headImgUrl: '',
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
				if (this.user === null || this.user === undefined) {
					this.$router.push({
						name: 'entry'
					})
				}
			},

			checkFilled() {
				if (this.isEmptyStr(this.user.fullname)) {
					this.$toast("请填写您的姓名");
					return false;
				}

				return true;
			},

			goback() {
				//往前也要保存数据
				this.setSSObj('user', this.user);

				this.$router.go(-1);
			},

			gobr() {
				window.scrollTo(0, document.documentElement.clientHeight);
				this.setSSObj('user', this.user);

				if (this.checkFilled()) {
					this.$router.push({
						name: 'birthday'
					})
				}
			},

			getbottom(e) {
				let pos = e.target.getBoundingClientRect();
				this.fbottom = pos.bottom;
			},
		}
	}
</script>

