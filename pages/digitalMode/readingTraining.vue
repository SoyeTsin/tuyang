
<template>
	<view class="reading-training">
		<Navigation :title='"读数训练"'></Navigation>
		<view class="explain" v-if="showStatus===0">
			<view class="title">
				读数训练说明:
			</view>
			<view class="content">
				0-99共100个数字编码随机出现,出现的时候大脑要想象出数字编码的对应图像,想象出之后点击下一个,系统会记录每个编码的出图反应时间。
			</view>
			<view class="start-button" @click="changeShowStatus(1)">
				开始
			</view>
		</view>
		<view class="count-down" v-if="showStatus===1" >
			{{countownDNumber}}
		</view>
		<view class="play-content" v-if="showStatus===2" @click="changeShowStatus(3)">
			<view class="title">
				0/100
			</view>
			<view class="number">
				{{playNumber}}
			</view>
			<view class="next-button">
				下一个
			</view>
			<view class="play-suspend">
				暂停
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
				showStatus: 0,
				list: [],
				countownDNumber: 4,
				playNumber: '',
				countownDNumberetInterval: null
			};
		},
		mounted() {},
		methods: {
			changeShowStatus(e) {
				this.showStatus = e
				if (e === 1) {
					this.startCountownDNumber()
				}
			},
			startCountownDNumber() {
				this.countownDNumber = 4
				this.countownDNumberetInterval = setInterval(() => {
					this.countownDNumber--
					if (this.countownDNumber <= 0) {
						this.changeShowStatus(2)
						clearInterval(this.countownDNumberetInterval)
					}
				}, 1000)
			}
		}
	}
</script>

<style scoped lang="scss">
	.reading-training {
		.explain {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			width: 100vw;
			height: 100vh;

			.title {
				color: #000000;
				font-size: 36upx;
				font-weight: 600;
			}

			.content {
				padding: 48upx;
				box-sizing: border-box;
			}

			.start-button {
				border: solid 2upx #007AFF;
				border-radius: 8upx;
				padding: 12upx 48upx;
				color: #007AFF;
			}
		}

		.count-down {
			width: 100vw;
			height: 100vh;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			font-size: 56upx;
			font-size: 600;
		}

		.play-content {
			.title {}

			.number {}

			.next-button {}

			.play-suspend {}
		}
	}
</style>
