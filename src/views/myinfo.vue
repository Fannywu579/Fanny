<template>
	<!-- 生日界面 -->
	<div class="myinfo">
		<!-- 新增开始 -->
		<div class="colorop">
			<div class="bg">
				<img :src="headImgUrl">
			</div>
			<div class="bottomsty">
				<div class="ltp">
					<img :src="headImgUrl" alt="">
				</div>
				<div class="frtxt">{{user.fullname}}</div>
				<div class="sctxt">{{nickName}}</div>
			</div>
		</div>
		<p class="linght" style="margin-top: 20px;"></p>
		<div class="centxt">
			<!-- 个人信息 -->
			<div class="cenmsg">
				<p class="centitle">个人信息</p>
				<div class="flex">
					<p>手机：</p>
					<p>{{user.mobile}}</p>
				</div>
				<div class="flex" style="margin:15px 0">
					<p>微信：</p>
					<p class="scroll">{{user.wxId}}</p>
				</div>
				<div class="flex" style="margin:15px 0">
					<p>生日：</p>
					<p>{{user.birthday}}</p>
				</div>
				<div class="flex flex-start" style="margin:15px 0">
					<p>地址：</p>
					<div class="rightmove">
						<p class="scroll" style="color:#666666">{{address}}</p>
						<p class="scroll" style="margin-top: 5px;">{{detailedAddress}}</p>
					</div>

				</div>
			</div>
			<p class="linght"></p>
			<!-- 工作经历 -->
			<div class="work">
				<p class="centitle">工作经历</p>
				<div v-for="(item,index) in resume.career" :key="index" class="worksty">
					<div class="flex wrap">
						<p>起止：</p>
						<p><span>{{item.startTime}}</span> ～ <span>{{isEmptyStr(item.stopTime) ? '至今' : item.stopTime}}</span></p>
					</div>
					<div class="flex wrap" style="margin:15px 0">
						<p>单位：</p>
						<p class="scroll">{{item.company}}</p>
					</div>
					<div class="flex wrap">
						<p>职务：</p>
						<p class="scroll">{{item.position}}</p>
					</div>
				</div>
			</div>
			<p class="linght"></p>
			<!-- 项目经历 -->
			<div class="project">
				<p class="centitle">项目经历</p>
				<p class="pop" v-for="(item,index) in resume.project" :key="index">{{item.description}}</p>
			</div>
			<div class="pup" v-show="noUserInfo">
				<p>我还不认识你呢，请先完成报名</p>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'myinfo',

		data() {
			return {
				user: {},
				resume: {},
				headImgUrl: '',
				nickName: '',
				address: '',
				detailedAddress:'',
				noUserInfo: true,
			}
		},

		watch: {
			user: 'getResume',
			resume: 'initValue',
		},

		mounted: function() {
			this.getUser();
			this.getNickname();
		},

		methods: {
			getNickname() {
				this.nickName = localStorage.getItem('nickName')
				console.log(this.nickName);
			},
			initValue() {
				this.noUserInfo = false;
				this.headImgUrl = localStorage.getItem('headImgUrl');
				this.address = this.user.address.province + ' ' +
					this.user.address.city + ' ' +
					this.user.address.county ;
				this.detailedAddress = this.user.address.paraddress;
			},

			//获取个人信息
			getUser() {
				let userId = localStorage.getItem('userId');
				this.api.getUser(userId).then(data => {
					if (data.code === 200) {
						let user = data.data;
						if (user !== null) {
							this.user = user;
							console.log(user);
						}
					}
				});
			},

			//获取个人履历
			getResume() {
				let userId = localStorage.getItem('userId');
				this.api.getResume(userId).then(data => {
					if (data.code === 200) {
						let resume = data.data;
						if (resume !== null) {
							this.resume = resume;
							console.log(resume);
						}
					}
				});
			}
		}
	}
</script>

<style scoped>
	.centxt {
		margin-top: 0px;
	}

	/* 遮罩层样式 */
	.pup {
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 9999;
		background-color: #fff;
	}

	.pup p {
		text-align: center;
		color: #333;
		line-height: 20px;
		font-size: 16px;
	}

	/* 内容 */
	.topmsg {
		margin: 10px auto;
		margin-top: 30px;
		padding-left: 18px;
	}

	/* 背景模糊开始 */
	.colorop {
		position: relative;
		width: 100%;
		height: 190px;
		overflow: hidden;
	}

	.bottomsty {
		width: 100%;
		height: 190px;
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.bottomsty .ltp img {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		margin-bottom: 10px;
	}

	.frtxt {
		color: #FFFFFF;
		font-size: 24px;
	}

	.sctxt {
		margin-top: 4px;
		color: #FFFFFF;
		font-size: 13px;
	}

	/* 背景模糊结束 */
	.topmsg .flex div {
		width: 52px;
		height: 52px;
		margin: 2px 5px;
		display: flex;
		margin-left: 20px;
		justify-content: center;
		align-items: center;

	}

	.topmsg .flexs {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}

	.topmsg .flexs div {
		width: 52px;
		height: 52px;
		margin: 2px 5px;
		display: flex;
		justify-content: center;
		align-items: center;

	}

	.topmsg .flex div img {
		width: 100%;
		height: 100%;
		text-align: center;
	}

	.topmsg .flexs div img {
		width: 100%;
		height: 100%;
		text-align: center;
	}

	.topmsg .flexs .uphoto img {
		width: 52px;
		height: 52px;
		border-radius: 50%;
	}

	.topmsg .flex .uphone img {
		width: 15px;
		height: 22px;
	}

	.topmsg .flex .ucode img {
		width: 25px;
		height: 20px;
	}

	.centitle {
		line-height: 40px;
		text-align: left;
		padding-left: 18px;
		font-size: 18px;
		font-weight: 700;
	}

	.cenmsg .flex {
		margin: 0 auto;
		/*padding: 0px 15px;*/
		padding-left: 57px;

	}

	.cenmsg .flex p:first-child {
		padding-right: 10px;
		font-size: 14px;
		color: #333333;
	}

	.cenmsg .flex p:last-child {
		font-size: 14px;
		color: #666666;
	}

	.work .flex {
		margin: 0 auto;
		padding: 0px 15px;
		padding-left: 57px;
	}
	.work .centitle{
		line-height: 20px;
		padding-top: 10px;
	}
	.work .flex p:first-child {
		padding-right: 10px;
		font-size: 14px;
		color: #333333;
	}

	.work .flex p:last-child {
		font-size: 14px;
		color: #666666;
	}

	.worksty {
		padding: 15px 0px;
		background: #ffffff;
	}

	.worksty:nth-child(2n+1) {
		background: #F6F8F9;
	}

	.project {
		padding-bottom: 22px;
	}

	.pop {
		width: 70%;
		/*height: 142px;*/
		color: #666666;
		/*background-color: #F6F8F9;*/
		/*overflow: hidden;*/
		/*margin: 0 auto;*/
		margin-top: 5px;
		margin-left: 57px;
		/*margin-bottom: 22px;*/
		font-size: 15px;
		/*padding: 5px;*/
		text-align: justify;
		white-space: pre-wrap;
		/*overflow: auto;*/
	}

	.btn {
		bottom: 9px;
	}
	.flex-start{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-start;
	}
	.rightmove{
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}
	.rightmove .scroll {
		width: 220px;
		text-align: justify;
	}
	.wrap{
		align-items: flex-start;
	}
	.wrap .scroll {
		width: 220px;
		text-align: justify;
	}
</style>
