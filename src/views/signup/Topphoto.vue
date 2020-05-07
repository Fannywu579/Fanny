<template>
	<div class="topview">
		<!-- 新增开始 -->
		<div class="colorop">
			<div class="bg">
				<img :src="headImgUrl">
			</div>
			<div class="li">
				<img :src="headImgUrl" alt="">
			</div>
		</div>
		<!-- 新增结束 -->
	</div>

</template>

<script>
	export default {
		name: 'Topphoto',
		data() {
			return {
				headImgUrl: ''
			}
		},
		mounted: function() {
			this.getheadImage();
		},
		methods: {
			getheadImage() {
				this.headImgUrl = localStorage.getItem('headImgUrl')
			}
		}
	}
</script>

<style>
</style>
