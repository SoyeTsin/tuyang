<template>
	<view class="reading-training">
		<Navigation :title='"随机训练"'></Navigation>
		<view class="explain" v-if="showStatus===0">
			<view class="title">
				随机训练说明:
			</view>
			<view class="content">
				两个编码随机出现,训练其链接的速度。
			</view>
			<view class="start-button" @click="changeShowStatus(1)">
				开始
			</view>
		</view>
		<view class="count-down" v-if="showStatus===1">
			{{countownDNumber}}
		</view>
		<view class="play-content" v-if="showStatus===2">
			<view class="title">
				{{process}}/100
			</view>
			<view class="number">
				<view class="left">
					{{playNumber}}
				</view>
				<view class="right">
					{{linkNumber}}
				</view>
			</view>
			<view class="next-button" @click="nextNumber()">
				下一个
			</view>
			<view :class="playSuspend?'play-suspend':'play-suspend active'" @click="playSuspendFunc()">
				{{playSuspend?'暂停':'开始'}}
			</view>
		</view>
		<view class="end-game" v-if="showStatus===3">
			<view class="text">
				随机训练的编码时长由长到短依次为:
				<text style="display: block;" v-for="(item,index) in endList" :key='index'>{{item.number}},</text>
			</view>
			<view class="title">
				3秒以上
			</view>
			<view class="images-list">
				<view class="item" v-for="(item,index) in endList" :key='index'
					v-if="formatTime(item.endTime,item.startTime)>=3">
					<view class="number">
						{{item.number}}-{{item.linkNumber}}
					</view>
					<view class="time-text">
						{{formatTime(item.endTime,item.startTime)}}s
					</view>
					<image class="image" :src="'../../static/images/'+item.number+'.jpg'" mode="aspectFit"></image>
				</view>
			</view>
			<view class="title green">
				1秒以下
			</view>
			<view class="images-list">
				<view class="item" v-for="(item,index) in endList" :key='index'
					v-if="formatTime(item.endTime,item.startTime)<=1">
					<view class="number">
						{{item.number}}-{{item.linkNumber}}
					</view>
					<view class="time-text">
						{{formatTime(item.endTime,item.startTime)}}s
					</view>
					<image class="image" :src="'../../static/images/'+item.number+'.jpg'" mode="aspectFit"></image>
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
				showStatus: 0,
				list: [],
				countownDNumber: 3,
				playNumber: '',
				linkNumber: '',
				countownDNumberetInterval: null,
				process: 0,
				initList: [],
				endList: [],
				playSuspend: true, //暂停、开始
				playSuspendTime: 0,
			};
		},
		mounted() {},
		methods: {
			playSuspendFunc() {
				let nowTime = (new Date()).getTime()
				this.playSuspend = !this.playSuspend
				if (!this.playSuspend) {
					//点击开始 开始时间加上暂停的时间差
					this.initList[this.process].startTime = this.initList[this.process].startTime + (nowTime - this
						.playSuspendTime)
					this.playSuspendTime = 0
				} else {
					this.playSuspendTime = nowTime
				}
			},
			formatTime(end, start) {
				let diff = end - start
				return (diff / 1000).toFixed(3)
			},
			changeShowStatus(e) {
				this.showStatus = e
				if (e === 1) {
					this.startCountownDNumber()
				}
			},
			startCountownDNumber() {
				this.countownDNumber = 3
				this.startGame()
				this.countownDNumberetInterval = setInterval(() => {
					this.countownDNumber--
					if (this.countownDNumber <= 0) {
						this.changeShowStatus(2)
						clearInterval(this.countownDNumberetInterval)
						let nowTime = (new Date()).getTime()
						this.initList[this.process].startTime = nowTime
					}
				}, 1000)
			},
			startGame() {
				let initList = []
				for (let i = 0; i < 100; i++) {
					initList.push({
						number: i,
						linkNumber: Math.floor(Math.random() * 100),
						sort: Math.floor(Math.random() * 100000),
						endTime: 0,
						startTime: 0
					})
				}

				initList.sort((a, b) => {
					if (a.sort < b.sort) {
						return 1
					} else if (a.sort > b.sort) {
						return -1
					} else {
						return 0
					}
				})

				console.log(initList)
				this.playNumber = initList[0].number
				this.linkNumber = initList[0].linkNumber
				this.initList = initList
			},
			nextNumber() {
				if (this.process < 100) {
					let nowTime = (new Date()).getTime()
					this.initList[this.process].endTime = nowTime
					this.process++
					this.initList[this.process].startTime = nowTime
					this.playNumber = this.initList[this.process].number
					this.linkNumber = this.initList[this.process].linkNumber
				} else {
					this.endShow()
				}
			},
			endShow() {
				this.changeShowStatus(3)
				this.endList = [...this.initList]
				this.endList.sort((a, b) => {
					if (a.endTime - a.startTime < b.endTime - b.startTime) {
						return 1
					} else if (a.endTime - a.startTime > b.endTime - b.startTime) {
						return -1
					} else {
						return 0
					}
				})
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
			width: 100vw;
			height: 100vh;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			position: relative;

			.title {
				position: absolute;
				top: 24upx;
				font-size: 24upx;
				color: #555555;
			}

			.number {
				color: #000000;
				font-size: 56upx;
				font-weight: 600;
				display: flex;
				justify-content: space-between;
				margin-bottom: 36upx;

				.left {
					margin-right: 38upx;
				}
			}

			.next-button {
				border: solid 2upx #007AFF;
				border-radius: 8upx;
				padding: 12upx 48upx;
				color: #007AFF;
				margin-top: 48upx;
			}

			.play-suspend {
				border: solid 2upx #ff5500;
				border-radius: 8upx;
				padding: 12upx 48upx;
				color: #ff5500;
				margin-top: 48upx;

				&.active {
					border: solid 2upx #55ff7f;
					color: #55ff7f;
				}
			}
		}

		.end-game {
			padding: 24upx;
			box-sizing: border-box;

			.text {
				display: flex;
				justify-content: flex-start;
				flex-wrap: wrap;
			}

			.title {
				color: #F0AD4E;
				margin: 24upx 0;

				&.green {
					color: #4CD964;
				}
			}

			.images-list {
				display: flex;
				justify-content: flex-start;
				flex-wrap: wrap;

				.item {
					width: 20%;
					height: 200upx;
					padding: 12px;
					box-sizing: border-box;
					overflow: hidden;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;

					.number {
						font-size: 36upx;
					}

					.time-text {
						color: #555555;
						font-size: 24upx;
					}

					.image {
						width: 150upx;
						height: 150upx;
					}
				}
			}
		}
	}
</style>
