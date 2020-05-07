<template>
	<div>
		<p style="text-align: center;font-size: 18px;font-weight: 700;">隐私条款</p>
		<div class="vanpop">
			<!-- <p style="text-align: center;font-size: 18px;font-weight: 700;">隐私条款</p> -->
			<p class="vtitle" style="margin: 10px auto;margin-top: 0;">
				我们以本隐私申明声明对访问者隐私保护的许诺。以下文字公开我公众号（80分运营俱乐部）对信息收集和使用的情况。本站的隐私申明正
				在不断改进中，随着我服务号服务范围的扩大，我们会随时更新我们的隐私申明。同时我们欢迎你随时来查看本申明。请向上海智而亮信息科技限公司邮箱反馈你的意见。若你接受
				80分运营俱乐部服务协议（简称“协议”，下同），即表明你已经同意我们按照本隐私申明来使用和披露你的个人信息。本隐私申明的全部条款属于该协议的一部份。
			</p>
			<p class="f7">一、未成年人的特别注意事项</p>
			<p class="vtitle">如果你未满 18 周岁，你将无权使用公司服务，因此我们希望你不要向我们提供任何个人信息。</p>
			<p class="f7">二、用户名及注册信息</p>
			<p class="vtitle">
				当你报名80分运营俱乐部时，我们要求你填写注册信息。注册信息要求提供你的真实姓名、地址、国籍、电话号码和电子邮件地址，及你急需解决的问题。另外，你还将被要求提供个人就职经历，你还有权选择是否填写附加信息。这些信息可能包括贵公司所在的省份和城市、时区、邮政编码、传真号码，主页和你的职务。我们使用注册信息来获得报名人员的统计资料。同时我们将会用这些统计数据来给我们的报名人员分类，例如年龄、行业和问题描述，以便有针对性地向我们的会
				员提供新的服务和机会。我们会通过你的邮件地址来通知你这些新的服务和机会。
			</p>
			<p class="f7">三、银行卡微信支付宝</p>
			<p class="vtitle">我们的一些服务需要付费，那时我们需要合理获取你的银行卡/微信/支付宝信息。</p>
			<p class="f7">四、广告</p>
			<p class="vtitle">我们会对个人身份数据进行综合统计，并为后期综合使用进行留底。</p>
			<p class="f7">五、不可抗力</p>
			<p class="vtitle">当我们被法律强制或依照政府要求提供你的信息时我们将善意地披露你的资料。</p>
			<p class="f7">六、安全</p>
			<p class="vtitle">
				我们服务号有相应的安全措施来确保我们掌握的信息不丢失，不被滥用和变造。这些安全措施包括向其它服务器备份数据和对用户信息加密。尽管我们有这些安全措施，但请注意在因特网上不存在“完善的安全措施”。
			</p>
			<p class="f7">七、修改你的资料</p>
			<p class="vtitle">你可以在我司公众号及时补充修改或者更新你的个人信息和（在成功登录之后）。</p>
			<p class="f7"> 八、联系我们</p>
			<p class="vtitle">
				如果你对本隐私申明及隐私保护措施以及你在使用中的问题有任何意见和建议请和我们联系。80分运营俱乐部客服邮箱： public@80points.com.cn
			</p>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Privacypolicy',
		data() {
			return {

			}
		},
		mounted: function() {

		},
		methods: {

		}
	}
</script>

<style  scoped>
	/* 协议内容 */
	.vanpop {
		margin: 5px auto;
		width: 95%;
		height: 415px;
		text-align: justify;
		overflow-y: auto;
	}
	.vanpop::-webkit-scrollbar-track-piece {
		background-color: rgba(0, 0, 0, 0);
		border-left: 1px solid rgba(0, 0, 0, 0);
	}
	.vanpop::-webkit-scrollbar {
		width: 5px;
		height: 13px;
		-webkit-border-radius: 5px;
		-moz-border-radius: 5px;
		border-radius: 5px;
	}
	.vanpop::-webkit-scrollbar-thumb {
		background-color: rgba(177, 177, 177, 0.5);
		background-clip: padding-box;
		-webkit-border-radius: 5px;
		-moz-border-radius: 5px;
		border-radius: 5px;
		min-height: 28px;
	}
	.vanpop::-webkit-scrollbar-thumb:hover {
		background-color: rgba(177, 177, 177, 0.5);
		-webkit-border-radius: 5px;
		-moz-border-radius: 5px;
		border-radius: 5px;
	}
	.vanpop p {
		font-size: 12px;
		text-align: justify;
	}

	.vanpop .vtitle {
		text-align: justify;
		text-indent: 25px;
	}

	.f7 {
		/* 文字加粗 */
		font-weight: 700;
	}

	.vanpop .ccen {
		padding: 0px 10px;
	}

	.vanpop .txtdent {
		text-indent: 15px;
	}

</style>
