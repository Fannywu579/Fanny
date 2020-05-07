<template>
	<div class="topview meetaddr">
		<!-- <van-nav-bar title="入组申请" left-arrow @click-left="goback" /> -->
		<!-- 新增开始 -->
		<Topphoto></Topphoto>
		<!-- 新增结束 -->
		<div class="centxt">
			<p class="ctitle">{{msg}}</p>
			<p class="csecond">你希望在哪里与我们相遇</p>
			<div class="content">
				<van-radio-group v-model="radio">
					<van-radio name="localeOption1" checked-color="#E95D39" :class="radio=='localeOption1'?'nint':'gary'">
						<p :class="radio=='localeOption1'?'nint':'gary'">{{locale1}}</p>
					</van-radio>
					<van-radio name="localeOptionCustom" checked-color="#E95D39" :class="radio=='localeOptionCustom'?'nint':'gary'" @click="showair">
						<van-field readonly clickable :class="radio=='localeOptionCustom'?'nint':'gary'" :value="localeCustom" placeholder="选择其他区域"  />
					</van-radio>
				</van-radio-group>
			</div>
			<van-popup v-model="showAreaList" position="bottom">
				<van-area :area-list="areaList" :columns-num="2" @confirm='confirmFn' @cancel="showAreaList = false" />
			</van-popup>
			<!-- 用户协议开始 -->
			<div class="sty">
				<!-- 选框 -->
				<div>
					<van-checkbox v-model="checked" checked-color="#E95D39" icon-size="15px" @click="showCheck"> </van-checkbox>
				</div>
				<div class="xieyi">我已阅读并同意
					<p @click="popUserAgreement">《服务条款》、</p>
					<p @click="popPrivacy">《隐私条款》</p>
				</div>
			</div>
<!--			<div v-show="showUserAgreement" class="bgcolor">-->
<!--				<div class="vansty">-->
<!--&lt;!&ndash;					<div class="iconfont icon-guanbi" style="font-size: 28px;color:#ffffff;width: 30px;position: absolute;top: -8px; right: -5px;z-index:5000;" @click="pophidden"></div>&ndash;&gt;-->
<!--					<van-icon size="40" color="#999" style="position: absolute; bottom: -55px; left: 44%; z-index:5000;" name="close" @click="pophidden" />-->
<!--					<p style="text-align: center;font-size: 18px;font-weight: 700;">服务条款</p>-->
<!--					<Serveterms></Serveterms>-->
<!--				</div>-->
<!--			</div>-->
<!--			<div v-show="showPrivacy" class="bgcolor">-->
<!--				<div class="vansty">-->
<!--&lt;!&ndash;					<div class="iconfont icon-guanbi" style="font-size: 28px;color:#ffffff;width: 30px;position: absolute;top: -8px; right: -5px;z-index:9998;" @click="pophidden1"></div>&ndash;&gt;-->
<!--					<van-icon size="40" color="#999" style="color:#F6F8F9; position: absolute; bottom: -55px; left: 44%; z-index:5000;" name="close" @click="pophidden1"/>-->
<!--					<p style="text-align: center;font-size: 18px;font-weight: 700;">隐私条款</p>-->
<!--					<Privacypolicy></Privacypolicy>-->
<!--				</div>-->
<!--			</div>-->
			<van-popup v-model="showUserAgreement" class="vansty">
<!--				<p style="text-align: center;font-size: 18px;font-weight: 700;">服务条款</p>-->
				<Serveterms></Serveterms>
<!--				<div class="vbtn" @click="pophidden">知道了</div>-->
			</van-popup>
			<van-popup v-model="showPrivacy" class="vansty">
<!--				<p style="text-align: center;font-size: 18px;font-weight: 700;">隐私条款</p>-->
				<Privacypolicy></Privacypolicy>
<!--				<div class="vbtn" @click="pophidden1">知道了</div>-->
			</van-popup>
		</div>
		<div class="btn" @click="commit">提交</div>
	</div>
</template>

<script>
	import Topphoto from './Topphoto'
	import Serveterms from './Serveterms'
	import Privacypolicy from './Privacypolicy'
	import areaList from '../../assets/js/area.js'
	export default {
		name: 'meetaddr',

		data() {
			return {
				msg: '私享会地点',
				comer: this.getSSObj('comer'),
				visible: false,
				locale1: '上海',
				localeCustom: '',
				radio: 'localeOption1',
				showPicker: false,
				showAreaList: false,
				// columns: ['上海', '杭州', '成都', '武汉', '其他地方暂未开通'],
				areaList: areaList,
				showUserAgreement: false,
				showPrivacy: false,
				checked: false ,//用户协议
				headImgUrl:''
			}
		},
		components:{
			Topphoto,
			Serveterms,
			Privacypolicy
		},
		mounted: function() {
			this.initValue();
		},

		methods: {
			initValue() {
				this.headImgUrl = localStorage.getItem('headImgUrl')
				if (this.comer === null || this.comer === undefined) {
					this.$router.push({
						name: 'entry'
					})
				}

				if (this.isEmptyStr(this.comer.expectLocale) || this.comer.expectLocale === '上海') {
					this.radio = 'localeOption1';
				} else {
					this.radio = 'localeOptionCustom';
					this.localeCustom = this.comer.expectLocale;
				}
			},

			goback() {
				if (this.radio === 'localeOption1') {
					this.comer.expectLocale = this.locale1;
				} else if (this.radio === 'localeOptionCustom') {
					this.comer.expectLocale = this.localeCustom;
				}

				this.setSSObj('comer', this.comer);

				this.$router.go(-1);
			},

			checkFilled() {
				if (this.radio === 'localeOptionCustom' && this.isEmptyStr(this.localeCustom)) {
					this.$toast("请选择你的期望地址");
					return false;
				}
				if (this.checked === false) {
					this.$toast("请勾选用户协议");
					return false;
				}

				return true;
			},

			// 勾选按钮
			showCheck() {
				this.checked = true;
			},

			// 显示用户协议弹窗
			popUserAgreement() {
				this.showUserAgreement = true;
			},

			popPrivacy() {
				this.showPrivacy = true;
			},
			pophidden() {
				this.showUserAgreement = false;
			},
			pophidden1() {
				this.showPrivacy = false;
			},
			// 显示地区选择
			showair() {
				if (this.radio == 'localeOptionCustom') {
					this.showAreaList = true;
				}

			},
			//地址点击确定按钮
			confirmFn(event) {
				this.showAreaList = false;
				let arr, SelectProvinceName, SelectCityName;
				arr = event;
				SelectProvinceName = arr[0].name; // 省
				SelectCityName = arr[1].name; // 市
				this.localeCustom = SelectProvinceName + ' ' + SelectCityName; //系那个获取的省、市、区赋值给address
				this.$emit('ProCityCountyVal', [SelectProvinceName, SelectCityName]);
				console.log('选中的地址是：', SelectProvinceName, SelectCityName);
			},

			// 提交方法
			commit() {
				if (this.radio === 'localeOption1') {
					this.comer.expectLocale = this.locale1;
				} else if (this.radio === 'localeOptionCustom') {
					this.comer.expectLocale = this.localeCustom;
				}

				//先存一次，以免调用接口失败再回退页面丢失已填数据
				this.setSSObj('comer', this.comer);

				if (!this.checkFilled()) {
					return;
				}

				var api = this.api.updateComer;
				if (this.comer.userId === null || this.comer.userId === undefined) {
					this.comer.userId = localStorage.getItem('userId');
					api = this.api.newComer;
				}
				api(this.comer).then(data => {
					console.log(data);
					if (data.code === 200) {
						this.setSSObj('comer', this.comer);

						//回到开始页面去做数据拉取和跳转
						this.$router.push({
							name: 'entry'
						});
					}
				});
			}
		}
	}
</script>

<style scoped>
	.van-radio-group {
		margin-top: 30px;
		margin-left: 100px;
		margin-right: 100px;
	}

	/* 选框样式 */
	.sty {
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		left: 0;
		right: 0;
		margin: auto;
		margin-top: 18px;
	}

	.xieyi {
		color: #333;
		display: flex;
		justify-content: center;
		font-size: 11px;
		margin-top: -1px;
	}

	.xieyi p {
		color: #e95c3b;
	}
	.nint {
		margin: 0 auto;
		font-size: 18px;
		color: #333;
		padding: 5px 0px;
		padding-left: 8px;
	}
	.gary{
		color:#999;
		margin: 0 auto;
		font-size: 18px;
		padding: 5px 0px;
		padding-left: 8px;
	}

	/* 协议内容 */
	.bgcolor{
		position: absolute;
		top: 0;
		left:0;
		right: 0;
		width:100%;
		height: 100%;
		background-color: rgba(34, 34, 34, 0.8);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.vansty {
		width: 75%;
		height: 450px;
		border-radius: 10px;
		padding: 5px 8px;
		background-color: #F6F8F9;
		/*position:relative;*/
	}
	.vanpop .ccen {
		padding: 0px 10px;
	}

	.vanpop .txtdent {
		text-indent: 15px;
	}

	/* 选择地址样式默认样式更改 */
	.van-cell {
		border: none;
	}
	/* 知道了 按钮样式 */
	.vbtn {
		width: 60%;
		margin: 0 auto;
		-moz-box-shadow: 0 0px 12px rgba(174, 172, 179, 0.3);
		-webkit-box-shadow: 0 0px 12px rgba(174, 172, 179, 0.3);
		box-shadow: 0 0px 12px rgba(174, 172, 179, 0.3);
		border-radius: 20px;
		padding: 8px 0;
		margin-top: 5px;
		margin-bottom: 20px;
		font-size:15px;
		color:#FFFFFF;
		background-color: #E95D39;
	}
</style>
