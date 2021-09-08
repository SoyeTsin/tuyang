<template>
	<view class="top-nav active"
		:style="[{'height': customBarH + 'px', 'padding-top': statusBarH + 'px'}]">
		<view class="content">
			<view class="back" @click="back"></view>
			<view class="title">{{title}}</view>
			<view class="menu">
				<view @click='intoSetting'>
					<view></view>
					<view></view>
					<view></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'navigation',
		props: {
			title: String
		},
		computed:{
			docmentNodeValue(){
				debugger
				return this.$store.state.docmentNodeValue
			}
		},
		data() {
			return {
				statusBarH: this.statusBar,
				customBarH: this.customBar
			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			intoSetting() {},
		}
	}
</script>

<style scoped lang="scss">
	.top-nav {
		width: 100vw;
		height: 88upx;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
		background-color:#007AFF;
		
		.content {
			width: 100vw;
			height: 88upx;
			display: flex;
			justify-content: space-between;

			.back {
				width: 88upx;
				height: 88upx;
				display: flex;
				align-items: center;
				justify-content: center;

				&::after {
					display: block;
					content: ' ';
					width: 20upx;
					height: 20upx;
					border-top: solid 4upx #ffffff;
					border-left: solid 4upx #ffffff;
					transform: rotate(-45deg);
				}
			}

			.title {
				flex: 1;
				font-size: 17upx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 88upx;
				text-align: center;
			}

			.menu {
				width: 88upx;
				height: 88upx;
				display: flex;
				align-items: center;
				justify-content: center;

				>view {
					display: block;
					content: '';
					width: 44upx;
					height: 44upx;
					color: #ffffff;
					border-radius: 44upx;
					border: solid 2upx #ffffff;
					text-align: center;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 4upx;
					box-sizing: border-box;

					>view {
						width: 8upx;
						height: 8upx;
						background-color: #ffffff;
						display: block;
						centent: ' ';
						border-radius: 8upx;
					}
				}
			}
		}

		.menu-list {}
	}

	.top-nav.active {
		background-color: #FFFFFF;
		position: relative;

		.back {
			width: 88upx;
			height: 88upx;
			display: flex;
			align-items: center;
			justify-content: center;

			&::after {
				border-top: solid 4upx #000000;
				border-left: solid 4upx #000000;
			}
		}

		.title {
			color: #000000;
		}

		.menu {
			>view {
				display: none;
			}
		}
	}
</style>
