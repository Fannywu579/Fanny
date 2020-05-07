<template>
	<!-- 生日界面 -->
	<div class="topview">
		<!-- <van-nav-bar title="入组申请" left-arrow @click-left="goback" /> -->
		<!-- 新增开始 -->
		<Topphoto></Topphoto>
		<!-- 新增结束 -->
		<div class="centxt">
			<p class="ctitle">{{msg}}</p>
			<p class="csecond">为你匹配更懂你的人</p>
			<div class="content">
				<van-field class="int" style="visibility:hidden;" disabled/>
				<van-field readonly clickable input-align="center" class="int" :value="user.birthday" placeholder="选择出生日期" @click="showPicker = true" />
				<van-popup v-model="showPicker" position="bottom">
					<van-datetime-picker v-model="currentDate" :min-date="minDate" :max-date="maxDate" type="date" @cancel="showPicker = false" @confirm="onConfirm" :formatter="formatter" />
				</van-popup>
			</div>
		</div>
		<div class="btn" @click="gobr">下一步</div>
	</div>
</template>

<script>
	import Topphoto from './Topphoto'
	export default {
		name: 'birthday',

		data() {
			return {
				msg: "出生日期",
				user: this.getSSObj('user'),
				currentDate: new Date(),
				minDate: new Date(1970, 1, 1),
				maxDate: new Date(),
				showPicker: false,
				headImgUrl: '',
			}
		},
		components:{
			Topphoto
		},
		mounted: function() {
			this.initValue();
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
				if (this.user.birthday === null || this.user.birthday === undefined) {
					this.$toast("请选择您的出生日期");
					return false;
				}

				return true;
			},

			goback() {
				this.setSSObj('user', this.user);

				this.$router.go(-1);
			},

			gobr() {
				this.setSSObj('user', this.user);

				if (this.checkFilled()) {
					this.$router.push({
						name: 'addr'
					})
				}
			},

			formatter(type, value) {
				// 格式化选择器日期
				if (type === "year") {
					return `${value}年`;
				} else if (type === "month") {
					return `${value}月`;
				} else if (type === "day") {
					return `${value}日`;
				}
				return value;
			},

			// 选中日期格式化
			onConfirm(value) {
				this.showPicker = false;
				let year = value.getFullYear();
				let month = value.getMonth() + 1;
				let day = value.getDate();
				if (month >= 1 && month <= 9) {
					month = `0${month}`
				}
				if (day >= 1 && day <= 9) {
					day = `0${day}`
				}
				this.user.birthday = `${year}-${month}-${day}`
			}

		}
	}
</script>
