<template>
	<view class="center">
		<view class="logo" @click="goLogin" :hover-class=" !login ? 'logo-hover' : '' ">
			<image class="logo-img" :src="login ? uInfo.avatarUrl : avatarUrl"></image>
			<view class="logo-title">
				<text class="uer-name">Hi，{{login ? uInfo.nickName : '您未登录'}}</text>
				<text class="go-login navigat-arrow" v-if="!login">&#xe65e;</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				login: false,
				avatarUrl: "../../static/logo.png", //未登录图标
				uInfo: {}
			}
		},

		onLoad() {
			let avatarUrl = uni.getStorageSync('avatarUrl')
			let nickName = uni.getStorageSync('nickName')
			let openid = uni.getStorageSync('openid')
			if (openid != null && openid != "" && openid != undefined) {
				this.login = true
				this.uInfo = {
					'avatarUrl': avatarUrl,
					'nickName': nickName
				}
			}
		},

		methods: {
			//用户登录
			goLogin() {
				if (!this.login) {
					// 获取用户头像、昵称等信息
					uni.getUserProfile({
						desc: '微信登录',
						success: (infoRes) => {
							console.log(infoRes)
							uni.setStorageSync('nickName', infoRes.userInfo.nickName)
							uni.setStorageSync('avatarUrl', infoRes.userInfo.avatarUrl)
							this.uInfo = {
								'avatarUrl': infoRes.userInfo.avatarUrl,
								'nickName': infoRes.userInfo.nickName
							}
							this.login = true
						},
						fail: (err) => {
							console.log('获取用户信息失败', err)
							this.login = false
						}
					});

					// 获取openid
					uni.login({
						provider: 'weixin',
						success: (res) => {
							let code = res.code //微信临时登录凭证							
							//调用云函数获取openid
							uniCloud.callFunction({
								name: 'code2Session', //云函数名称
								data: {
									code
								},
								success: (res) => {
									//从云端返回的信息，包括openid
									console.log('openid:', res.result.openid)
									uni.setStorageSync('openid', res.result.openid)
								},
								fail: (err) => {
									console.log('调用云函数失败：', err)
								}
							})
						},
						fail: (err) => {
							console.log('login失败：', err)
						}
					})
				}

			},

			//退出登录
			exitLogin() {
				this.login = false
				uni.removeStorageSync('avatarUrl') //删除缓存
				uni.removeStorageSync('nickName')
				uni.removeStorageSync('openid')
				uni.showToast({
					title: "账号已退出!",
					icon: "success"
				})
			},

			goUpImages() {
				if (this.login) {
					uni.navigateTo({ //跳转到指定页面
						url: "../upImages/upImages",
					})
				} else {
					uni.showToast({
						title: "请先登录",
						icon: "loading"
					})
				}
			},

			goMyWork() {
				if (this.login) {
					uni.navigateTo({ //跳转到指定页面
						url: "../myWork/myWork",
					})
				} else {
					uni.showToast({
						title: "请先登录",
						icon: "loading"
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.logo {
		width: 750upx;
		height: 240upx;
		padding: 20upx;
		box-sizing: border-box;
		background-color: #55aaff;
		flex-direction: row;
		align-items: center;
	}

	.logo-hover {
		opacity: 0.8;
	}

	.logo-img {
		width: 150upx;
		height: 150upx;
		border-radius: 150upx;
	}

	.logo-title {
		height: 150upx;
		flex: 1;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
		margin-left: 20upx;
	}
</style>
