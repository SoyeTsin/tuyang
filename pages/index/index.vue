<template>
	<view class="content" :style="[{ 'padding-top':docmentNodeValue.customBar + 'px'}]">
		<view class="top">
			<view class="item left" @click="intoPage(1)">
				<image src="https://7463-tcb-lqt34pwa7ed1dc-7d6e141a94107-1307263270.tcb.qcloud.la/images/xiaoyazi.svg"
					mode="aspectFit"></image>
				<view class="text">
					数字记忆
				</view>
			</view>
			<view class="item right">
				<image src="https://7463-tcb-lqt34pwa7ed1dc-7d6e141a94107-1307263270.tcb.qcloud.la/images/xiaotiane.svg"
					mode="aspectFit"></image>
				<view class="text">
					字母编码
				</view>
			</view>
		</view>
		<view class="list">
			<view class="item item-1">
				<image
					src="https://7463-tcb-lqt34pwa7ed1dc-7d6e141a94107-1307263270.tcb.qcloud.la/images/xiaomifeng.svg"
					mode="aspectFit"></image>
				<view class="text">
					记忆宫殿
				</view>
			</view>
			<view class="item item-2">
				<image src="https://7463-tcb-lqt34pwa7ed1dc-7d6e141a94107-1307263270.tcb.qcloud.la/images/xiaociwei.svg"
					mode="aspectFit"></image>
				<view class="text">
					左右脑协调性测试
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		computed: {
			docmentNodeValue() {
				return this.$store.state.docmentNodeValue
			}
		},
		onLoad() {

		},
		methods: {
			intoPage(e) {
				switch (e) {
					case 1:
						uni.navigateTo({
							url: '../digitalMode/digitalMode'
						})
						break;
					case 2:
						break;
					case 3:
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
		}
	}
</style>
