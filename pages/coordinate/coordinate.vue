<template>
	<view class="coordinate">
		<Navigation :title='"左右脑协调性测试"'></Navigation>
		<view class="play-ready" v-if="showStatus===0">
			<view class="content">
				<view class="tips-title">
					选择与颜色相符的圆形
				</view>
				<view class="tips-content">
					左脑擅长文字识别，右脑疤长更直接的颜色分辨。当两种信意司时出现,左右脑开始运作。
				</view>
				<view class="tips-content" style="color: #CCCCCC;">
					玩法：选择颜色和文字描述相同的选项
				</view>
				<view class="explain">
					<view class="explain-item">
						<view class="circular blue">
							红
						</view>
					</view>
					<view class="explain-item">
						<view class="circular red">
							绿
						</view>
					</view>
					<view class='explain-item'>
						<view class="circular yellow">
							黄
						</view>
					</view>
					<view class="explain-item">
						<view class="circular green">
							蓝
						</view>
					</view>
					<view class="click">
						<view class="iconfont icon-dianji"></view>
					</view>
				</view>
			</view>
			<view class="button">
				<view class="play">
					开始游戏
				</view>
				<view class="share">
					分享
				</view>
			</view>
			<view class="ranking-list-button">
				<view class="iconfont icon-huangguan"></view>
				<view class="text">
					排行榜
				</view>
			</view>
		</view>
		<view class="count-down" v-if="showStatus===1">
			{{countownDNumber}}
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
				showStatus: 0,
				countownDNumber: 3
			};
		}
	}
</script>

<style scoped lang="scss">
	.play-ready {
		width: 100vw;
		height: 100vh;
		background-image: linear-gradient(to top, #4ccbf1, #6bb5ff);
		padding: 48upx;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		.circular {
			background-color: green;
			width: 120upx;
			height: 120upx;
			border-radius: 120upx;
			text-align: center;
			line-height: 120upx;
			color: #FFFFFF;
			font-weight: 600;
			text-shadow: 0upx 4upx 6upx #333333;

			&.blue {
				background-color: #00aaff;
			}

			&.red {
				background-color: #ff5555;
			}

			&.yellow {
				background-color: #e3e300;
			}

			&.green {
				background-color: #55ff7f;
			}
		}

		.content {
			background-color: #FFFFFF;
			width: 100%;
			min-height: 300upx;
			border-radius: 12upx;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			padding: 24upx;
			box-sizing: border-box;

			.tips-title {
				font-weight: 600;
				font-size: 32upx;
				margin-bottom: 24upx;
			}

			.tips-content {
				font-size: 28upx;
				margin-bottom: 24upx;
				color: #333333;
			}

			.explain {
				width: 300upx;
				height: 300upx;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				flex-direction: column;
				flex-wrap: wrap;
				margin: 120upx 0;
				position: relative;

				.explain-item {
					width: 50%;
					height: 50%;
					display: flex;
					justify-content: center;
					align-items: center;

				}

				.click {
					position: absolute;
					right: 20upx;
					top: 80upx;

					.iconfont {
						font-size: 100upx;
						color: #000000;

					}
				}
			}

		}

		.button {
			width: 100vw;
			display: flex;
			justify-content: center;
			padding: 48upx 0;

			.play {
				width: 240upx;
				height: 80upx;
				line-height: 80upx;
				background-color: rgb(255, 194, 48);
				color: #FFFFFF;
				text-align: center;
				border-radius: 12upx;
				margin-right: 48upx;
			}

			.share {
				width: 180upx;
				height: 80upx;
				line-height: 80upx;
				background-color: rgb(0, 170, 0);
				color: #FFFFFF;
				text-align: center;
				border-radius: 12upx;
			}
		}

		.ranking-list-button {
			height: 60upx;
			line-height: 60upx;
			display: flex;
			justify-content: center;

			.iconfont {
				color: #FFFFFF;
				margin: 0 12upx;
			}

			.text {
				color: #FFFFFF;
			}
		}
	}
</style>
