<template>
	<view class="">
		<Navigation :title='"团队介绍"'></Navigation>
		<view class="team-introduction">
			<view class="title">
				武汉大学深圳研究院启明星认知力研究中心，致力于把前沿认知心理学、脑科学的研究成果，和武汉大学记忆协会培训世界记忆大师的训练方法相结合，开发出适用于普通人提升学习效能和幸福感的动态地图学习方法，从低效勤奋到高效快乐，从直觉思维到科学理性思维，帮助一代人提升认知能力，在学习成长中获得幸福感。
			</view>
			<view class="content">
				<view class="image">
					<image show-menu-by-longpress src="../../static/20211125051410.png" mode="aspectFit"></image>
				</view>
				<view class="name">
					长按二维码联系【李鑫】老师
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Navigation from '../../components/navigation.vue'
	export default {
		components: {
			Navigation
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.team-introduction{
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	padding: 60upx;
	.title{
		width: 100%;
		font-size: 36upx;
		padding: 24upx;
		margin-bottom: 24upx;
		box-shadow: 0 0 8upx 8upx #E5E5E5;
	}
	.content{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		padding: 24upx;
		box-shadow: 0 0 8upx 8upx #E5E5E5;
		.image{
			margin: 24upx;
		}
	}
	.name{
		font-size: 36upx;
	}
}
</style>
