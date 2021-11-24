<template>
	<view class="">
		<Navigation :title='"数字编码"'></Navigation>
		<view class="content" :style="[{ 'padding-top':docmentNodeValue.customBar + 'px'}]">
			<view class="list">
				<button class="login-wxpng" open-type="getUserInfo" @getuserinfo="xcxWxLogin">
					<view class="item item-1" @click="intoPage(0)">
						<view class="iconfont icon-zimu" style="color: #f8bc5e;"></view>
						<view class="text" style="color: #f8bc5e;">
							单字母编码
						</view>
					</view>
				</button>
				<button class="login-wxpng" open-type="getUserInfo" @getuserinfo="xcxWxLogin">
					<view class="item item-2" @click="intoPage(1)">
						<view class="iconfont icon-zimu" style="color: rgba(255, 0, 0, 0.5);"></view>
						<view class="text" style="color: rgba(255, 0, 0, 0.5);">
							多字母编码
						</view>
					</view>
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	import Navigation from '../../components/navigation.vue'
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		components: {
			Navigation
		},
		computed: {
			docmentNodeValue() {
				return this.$store.state.docmentNodeValue
			}
		},
		onLoad() {
			// promise方式
		},
		methods: {
			xcxWxLogin(e) {
				const userInfo = e.detail.userInfo
				const self = this;
				// #ifdef MP-WEIXIN
				uni.login({
					provider: 'weixin',
					success: function(res) {
						if (res.code) {
							console.log(res)
							uniCloud.callFunction({
									name: 'code2Session',
									data: {
										code: res.code,
										userInfo
									}
								})
								.then(res => {
									console.log(res)
								});
						}
					},
					fail(e) {
						console.log(e);
					},
					complete(e) {
						console.log(e);
					}
				});
				// #endif
			},
			intoPage(e) {
				switch (e) {
					case 0:
						uni.navigateTo({
							url: '/pages/letterMode/letterMode'
						})
						break;
					case 1:
						uni.navigateTo({
							url: '/pages/letterMode/moreLetterMode'
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

		.login-wxpng {
			border: none;
			padding: 0;
			margin: 0;
			border-radius: 0;
			background-color: #FFFFFF;
			box-shadow: 0 0 10upx 10upx #F5F5F5;

			&::after {
				display: none;
			}

			&.button-hover {
				box-shadow: 0 0 10upx 10upx #F5F5F5 inset;
			}
		}

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
			padding-top: 48upx;

			.login-wxpng {
				width: calc(50% - 25upx);
			}

			.item {
				width: 100%;
				height: 320upx;
				border-radius: 8upx;
				display: flex;
				justify-content: center;
				flex-direction: column;
				align-items: center;
				box-sizing: border-box;

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

			.login-wxpng {
				height: 320upx;
				margin-bottom: 60upx;
				border-radius: 8upx;
			}

			.item {
				height: 100%;
				box-sizing: border-box;
				display: flex;
				justify-content: center;
				flex-direction: column;
				align-items: center;
				border-radius: 8upx;

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
				border: solid 2upx #f8bc5e;
			}

			.item-2 {
				border: solid 2upx rgba(255, 0, 0, 0.5);
			}
		}
	}
</style>
