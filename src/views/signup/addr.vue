<template>
	<div class="topview">
		<!-- <van-nav-bar title="入组申请" left-arrow @click-left="goback" /> -->
		<!-- 新增开始 -->
		<Topphoto></Topphoto>
		<!-- 新增结束 -->
		<div class="centxt">
			<p class="ctitle">{{msg}}</p>
			<p class="csecond">说不定会有意外惊喜</p>
			<div class="content">
				<van-field readonly clickable input-align="center" class="int" :value="addr" placeholder="省/市/区" @click="show = true" />
				<van-popup v-model="show" position="bottom">
					<van-area :area-list="areaList" :columns-num='3' @confirm='confirmFn' @cancel="show = false" />
				</van-popup>
				<van-field type="text" clearable maxlength="128" v-model="address.paraddress" class="int" placeholder="详细地址" @click="getbottom($event)" />
			</div>
		</div>
		<div class="btn" @click="gobr" v-show="showBtn">下一步</div>
	</div>
</template>

<script>
	import Topphoto from './Topphoto'
	import areaList from '../../assets/js/area.js'
	export default {
		name: 'addr',

		data() {
			return {
				msg: '家住何处',
				user: this.getSSObj('user'),
				address: {},
				addr: null,
				show: false,
				areaList: areaList,
				fbottom: 0,
				showBtn: true,
				headImgUrl: ''
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

				if (this.user.address === undefined || this.user.address === null) {
					this.user.address = {}
				}
				this.address = this.user.address;

				if (this.address.province !== null && this.address.paraddress !== undefined) {
					this.addr = this.address.province + ' ' + this.address.city + ' ' + this.address.county;
				}
			},

			checkFilled() {
				if (this.isEmptyStr(this.addr)) {
					this.$toast("请选择城市信息");
					return false;
				}
				if (this.isEmptyStr(this.address.paraddress)) {
					this.$toast("请填写详细地址")
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
						name: 'contact'
					})
				}

			},

			//地址点击确定按钮
			confirmFn(event) {
				this.show = false;
				let arr, SelectProvinceName, SelectCityName, SelectCountyName;
				arr = event;
				SelectProvinceName = arr[0].name; // 省
				SelectCityName = arr[1].name; // 市
				SelectCountyName = arr[2].name; // 区
				this.address.province = SelectProvinceName
				this.address.city = SelectCityName;
				this.address.county = SelectCountyName;
				this.addr = SelectProvinceName + ' ' + SelectCityName + ' ' + SelectCountyName; //系那个获取的省、市、区赋值给address
				this.$emit('ProCityCountyVal', [SelectProvinceName, SelectCityName, SelectCountyName]);
				console.log('选中的地址是：', SelectProvinceName, SelectCityName, SelectCountyName);
			},

			getbottom(e) {
				let pos = e.target.getBoundingClientRect();
				this.fbottom = pos.bottom;
			}
		}
	}
</script>

<style scoped>
	.addr {
		width: 75%;
		margin: 0 auto;
		margin-top: 6%;
		font-size: 18px;
		color: #333;
		border-bottom: 1px solid #333;
		text-align: center;
	}

	.paraddress {
		width: 75%;
		margin: 0 auto;
		font-size: 18px;
		color: #333;
		border-bottom: 1px solid #333;
		text-align: center;
	}

	-moz-placeholder {
		color: #999;
	}

	::-moz-placeholder {
		color: #999;
	}

	input:-ms-input-placeholder,
	textarea:-ms-input-placeholder {
		color: #999;
	}

	input::-webkit-input-placeholder,
	textarea::-webkit-input-placeholder {
		color: #999;
	}
</style>
