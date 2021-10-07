<template>
	<view class="">
		<Navigation :title='"链接训练"'></Navigation>
		<view class="content">
			<view class="list">
				<view class="item item-1" @click="intoPage(1)">
					<view class="iconfont icon-miaobiao" style="color: rgba(52, 216, 198, 0.5);"></view>
					<view class="text" style="color: rgba(52, 216, 198, 0.5);">
						随机模式
					</view>
				</view>
				<view class="item item-2" @click="intoPage(2)">
					<view class="iconfont icon-lianjie" style="color: rgba(255, 0, 0, 0.5);"></view>
					<view class="text" style="color: rgba(255, 0, 0, 0.5);">
						强化模式
					</view>
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

			};
		},
		methods: {
			intoPage(e) {
				switch (e) {
					case 1:
						uni.navigateTo({
							url: '/pages/digitalMode/randomMode'
						})
						break;
					case 2:
						uni.navigateTo({
							url: '/pages/digitalMode/strengtheningMode'
						})
						break;
					case 4:
						break;
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		padding: 60upx;
		box-sizing: border-box;

		.iconfont {
			display: block;
			width: 250upx;
			height: 200upx;
			line-height: 200upx;
			font-size: 150upx;
			text-align: center;
		}

		.top {
			width: 100%;
			display: flex;
			justify-content: space-between;

			.item {
				width: calc(50% - 30upx);
				height: 320upx;
				border-radius: 8upx;
				display: flex;
				justify-content: center;
				flex-direction: column;
				align-items: center;

				.icon {
					width: 250upx;
					height: 200upx;
					margin-bottom: 24upx;
					display: flex;
					align-items: center;

					.iconfont {
						display: block;
						height: 100upx;
						line-height: 100upx;
						font-size: 80upx;
						text-align: center;
					}

					text {
						display: block;
						height: 100upx;
						line-height: 100upx;
						font-size: 80upx;
						text-align: center;
						width: 100%;
					}
				}

				.text {
					font-size: 36upx;
					font-weight: 600;
				}
			}

			.left {
				border: solid 2upx rgba(85, 170, 255, 0.5);

				.text {
					color: rgb(85, 170, 255);
				}
			}

			.right {
				border: solid 2upx rgba(248, 188, 94, 0.5);

				.text {
					color: rgb(248, 188, 94);
				}
			}
		}

		.list {
			width: 100%;
			margin-top: 60upx;

			.item {
				height: 320upx;
				margin-bottom: 60upx;
				border-radius: 8upx;
				display: flex;
				justify-content: center;
				flex-direction: column;
				align-items: center;

				image {
					width: 250upx;
					height: 200upx;
					margin-bottom: 24upx;
				}

				.text {
					font-size: 36upx;
					font-weight: 600;
				}
			}

			.item-1 {
				border: solid 2upx rgba(52, 216, 198, 0.5);
			}

			.item-2 {
				border: solid 2upx rgba(255, 0, 0, 0.5);
			}

			.item-3 {
				border: solid 2upx rgba(0, 170, 0, 0.5);
			}
		}
	}
</style>
