<template>
	<div class="topview">
		<!-- <van-nav-bar title="入组申请" left-arrow @click-left="goback" /> -->
		<!-- 新增开始 -->
		<Topphoto></Topphoto>
		<!-- 新增结束 -->
		<!-- 内容 -->
		<div class="centxt">
			<p class="ctitle">{{msg}}</p>
			<p class="csecond">为你匹配合适的伙伴</p>
			<!-- 局部滚动 -->
			<div class="content">
				<div class="list" v-for="(item,index) in careerList" :key="index">
					<div class="item">
						<div class="timesty">
							<div class="div">
								<van-field v-model="item.startTime" readonly clickable placeholder="开始时间" @click="showindex(index)" class="iptsty" />
								<van-field v-model="item.stopTime" readonly clickable placeholder="至今" @click="showindex1(index)" class="iptsty" />
								<div class="iconfont icon-bolangxian wave" style="color:#333333;font-size:20px"></div>
							</div>
						</div>
						<van-field v-model="item.company" clearable maxlength="128" placeholder="请输入您的单位名称" @click="setIndex(index, $event)" />
						<van-field v-model="item.position" clearable maxlength="128" placeholder="请输入您的职务" @click="setIndex(index, $event)" />
					</div>
					<div class="del" @click="delItem(index)" v-if="careerList.length > 1"></div>
				</div>
			</div>
			<div class="add" @click="add" v-show="showBtn">
				<div class="iconfont icon-jiashang" style="color:#E95D39;font-size: 24px;"></div>
			</div>
		</div>
		<div class="btn" @click="gobr" v-show="showBtn">下一步</div>
		<!-- 开始时间控件 -->
		<van-popup v-model="show" position="bottom">
			<van-datetime-picker v-model="currentDate" type="year-month" :min-date="minDate" :max-date="maxDate" @confirm="confirm(index)" @cancel="cancel" :formatter="formatter" />
		</van-popup>
		<!-- 结束时间控件 -->
		<van-popup v-model="show1" position="bottom">
			<van-datetime-picker v-model="currentDate1" type="year-month" :min-date="minDate" :max-date="maxDate" @confirm="confirm1(index)" @cancel="cancel1" :formatter="formatter" />
		</van-popup>

	</div>

</template>

<script>
	import Topphoto from './Topphoto'
	export default {
		name: 'career',

		data() {
			return {
				msg: '工作经历',
				resume: this.getSSObj('resume'),
				show: false, //开始时间弹窗
				show1: false, //结束时间弹窗
				minDate: new Date(2000, 1, 1),
				maxDate: new Date(),
				currentDate: new Date(), //开始标准时间
				currentDate1: new Date(), //结束标准时间
				starttime1: "", //开始时间时间戳
				endtime1: "", //结束时间时间戳
				careerList: [],
				fbottom: 0,
				showBtn: true,
				index: 0,
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
				if (this.resume === null || this.resume === undefined) {
					this.$router.push({
						name: 'entry'
					})
				}

				if (this.resume.career === undefined || this.resume.career === null) {
					//初始化一个数组元素，用于页面默认显示（因为允许stopTime不填，默认初始化一个空的stopTime）
					this.resume.career = [{
						stopTime: ''
					}];
				}
				this.careerList = this.resume.career;
			},

			checkFilled() {
				console.log(this.careerList);

				//遍历数组，统计所有为空的地方
				let emptyStart = 0;
				// eslint-disable-next-line no-unused-vars
				let emptyStop = 0;
				let emptyCompany = 0;
				let emptyPosition = 0;
				for (let item of this.careerList) {
					if (this.isEmptyStr(item.startTime)) {
						emptyStart++;
					}
					if (this.isEmptyStr(item.stopTime)) {
						emptyStop++;
					}
					if (this.isEmptyStr(item.company)) {
						emptyCompany++;
					}
					if (this.isEmptyStr(item.position)) {
						emptyPosition++;
					}
				}

				if (emptyStart > 0) {
					this.$toast("请选择开始时间");
					return false;
				}
				//允许不填结束时间，表示该项履历当前尚未结束
				// if (emptyStop > 0) {
				//   this.$toast("请选择结束时间");
				//   return false
				// }
				if (emptyCompany > 0) {
					this.$toast("请填写单位名称");
					return false;
				}
				if (emptyPosition > 0) {
					this.$toast("请填写职位名称");
					return false;
				}

				return true;
			},

			goback() {
				this.setSSObj('resume', this.resume);

				this.$router.go(-1);
			},

			setIndex(index, e) {
				// let pos = e.currentTarget.getBoundingClientRect();
				let pos = e.target.getBoundingClientRect();
				this.fbottom = pos.bottom;

				console.log("index", index);
				this.index = index;
				return true;
			},

			// 传index
			showindex(index) {
				console.log(index);
				this.index = index;
				this.show = true;
			},

			showindex1(index) {
				console.log(index);
				this.index = index;
				this.show1 = true;
			},

			sortList() {
				this.careerList.sort((v1, v2) => {
					return (v1.startTime >= v2.startTime) ? -1 : 1;
				});
			},

			// 点击添加组件
			add() {
				//对数组排序
				this.sortList();

				if (!this.checkFilled()) {
					return;
				}

				this.careerList.unshift({
					stopTime: ''
				});
			},

			// 删除工作信息
			delItem(index) {
				this.careerList.splice(index, 1);
				console.log(index);
			},

			// 下一步
			gobr() {
				//对数组排序
				this.sortList();

				if (this.checkFilled()) {
					this.setSSObj('resume', this.resume);

					this.$router.push({
						name: 'project',
					})
				}
			},

			// 选择开始时间
			start() {
				this.show = true;
			},

			// 选择结束时间
			end() {
				this.show1 = true;
			},

			// 点击确定
			confirm(index) {
				console.log("confirm", index);
				this.show = false;
				let year = this.currentDate.getFullYear();
				let month = this.currentDate.getMonth() + 1;
				if (month >= 1 && month <= 9) {
					month = `0${month}`;
				}
				this.careerList[this.index].startTime = `${year}-${month}`;
				console.log(this.careerList[this.index].startTime);
			},

			// 点击取消
			cancel() {
				this.show = false;
			},

			confirm1(index) {
				console.log("confirm1", index);
				this.show1 = false;
				let year = this.currentDate1.getFullYear();
				let month = this.currentDate1.getMonth() + 1;
				if (month >= 1 && month <= 9) {
					month = `0${month}`;
				}
				this.careerList[this.index].stopTime = `${year}-${month}`;
				console.log(this.careerList[this.index].stopTime);
			},

			cancel1() {
				this.show1 = false;
			},

			// 处理控件显示的时间格式
			formatter(type, value) {
				// 格式化选择器日期
				if (type === "year") {
					return `${value}年`;
				} else if (type === "month") {
					return `${value}月`;
				}
				return value;
			},
		}
	}
</script>

<style scoped>
	.van-cell{
		padding:7.5px 0;
		font-size: 16px;
	}
	.firstfield {
		padding-top: 0px;
	}

	/* 添加 */
	.add {
		font-size: 15px;
		margin: 0 auto;
	}

	[class*=van-hairline]::after {
		border: none;
	}

	/* 删除按钮 */
	.centxt .content {
		height:135px;
	}
	.del {
		color: #333;
		margin-left: 3px;
		width: 15px;
		height: 15px;
		background: url(../../assets/del.png) no-repeat center;
		background-size: 100% auto;
	}

	.list {
		margin: 0px auto;
		display: flex;
		align-items: flex-end;
	}

	.item {
		margin-left: 60px;
		width: 255px;
	}

	/* 起始结束时间选择 */

	.list:first-child {
		margin-top: 0;
	}

	.list .timesty:last-child {
		padding-top: 0;
	}

	.van-cell__value--alone {
		text-align: center;
	}

	.div {
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-content: center;
		position: relative;
	}
	.wave{
		position: absolute;
		top:13%;
		left:46%;
	}
	.content {
		margin: 0 auto;
		width: 100%;
		-webkit-overflow-scrolling: touch;
		overflow-x: scroll;
		white-space: nowrap;
	}
</style>
