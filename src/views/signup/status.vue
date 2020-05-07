<template>
	<div class="status">
		<div class="centxts">
			<p class="title">{{msg}}</p>
			<p class="linght"> </p>
			<div class="address">
				<p>私享会地址</p>
				<p class="scroll">{{comer.expectLocale}}</p>
			</div>
			<p class="linght"> </p>
			<div class="tpop">
				<p>你的困惑</p>
				<p class="pop">{{comer.question}}</p>
			</div>
			<p class="linght"> </p>
			<!-- 你的能力 -->
			<div class="tpop">
				<p>你的能力</p>
				<p class="pop">{{comer.ability}}</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				msg: '等待审核', //状态
				comer: this.getSSObj('comer'),
				showBtn: true,
			}
		},

		mounted: function() {
			this.initValue();
		},

		methods: {
			initValue() {
				if (this.comer === null || this.comer === undefined) {
					this.$router.push({
						name: 'entry'
					})
				}

				if (this.comer.checkResult === 0) {
					this.msg = "等待审核";
				} else if (this.comer.checkResult === 1) {
					this.msg = "审核通过";
				} else if (this.comer.checkResult === 2) {
					this.msg = "审核未通过";
				}
			}

		}
	}
</script>

<style scoped>
	.centxts {
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
	}

	.centxts .title {
		font-size: 18px;
		margin: 10px auto;
		text-align: center;
	}

	.centxts .address {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		margin: 11px 0px;
		padding:0 17px;
	}

	.centxts .address p:first-child {
		padding-right: 17px;
		font-weight: 700;
		font-size: 16px;
	}

	.centxts .address p:last-child {
		flex: 1;
		font-size: 13px;
	}

	.tpop {
		text-align: left;
		padding: 0px 17px;
	}

	.tpop p {
		font-weight: 700;
		font-size: 16px;
		margin:21px auto;
	}

	.tpop .pop {
		font-weight: normal;
		width: 80%;
		height: 142px;
		background-color: #F6F8F9;
		overflow: auto;
		margin: 0 auto;
		text-align: justify;
		white-space: pre-wrap;
		margin-bottom: 22px;
		font-size: 13px;
		padding: 10px 10px;
	}
	.scroll {
		width: 150px;
		text-align: justify;
		color: #333333;
		margin-left: 30px;
	}
	/* .btns {
		width:295px;
		height:48px;
		line-height: 48px;
		-moz-box-shadow: 0 0px 12px rgba(174, 172, 179, 0.3);
		-webkit-box-shadow: 0 0px 12px rgba(174, 172, 179, 0.3);
		box-shadow: 0 0px 12px rgba(174, 172, 179, 0.3);
		text-align: center;
		margin: 0 auto;
		margin-top: 40px;
		border-radius: 25px;
		font-size: 18px;
		letter-spacing: 2px;
		background-color: #E95D39;
		color:#FFFFFF;
	} */
</style>
