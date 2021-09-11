<template>
	<view class="content" :style="[{ 'padding-top':docmentNodeValue.customBar + 'px'}]">
		<view class="top">
			<view class="item left" @click="intoPage(1)">
				<view class="iconfont icon-shuzi1" style="color: #55aaff;"></view>
				<view class="text">
					数字记忆
				</view>
			</view>
			<view class="item right"  @click="intoPage(2)">
				<view class="iconfont icon-zimu" style="color: #f8bc5e;"></view>
				<view class="text">
					字母编码
				</view>
			</view>
		</view>
		<view class="list">
			<view class="item item-1"  @click="intoPage(3)">
				<view class="iconfont icon-jiyi" style="color: rgba(52, 216, 198, 0.5);"></view>
				<view class="text" style="color: rgba(52, 216, 198, 0.5);">
					记忆宫殿
				</view>
			</view>
			<view class="item item-2"  @click="intoPage(4)">
				<view class="iconfont icon-nao" style="color: rgba(255, 0, 0, 0.5);"></view>
				<view class="text" style="color: rgba(255, 0, 0, 0.5);">
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
			// promise方式
			uniCloud.callFunction({
					name: 'test',
					data: {
						a: 1
					}
				})
				.then(res => {
					console.log(res)
				});
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
					uni.navigateTo({
						url: '../coordinate/coordinate'
					})
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
