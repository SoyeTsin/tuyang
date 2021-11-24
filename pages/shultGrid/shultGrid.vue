<template>
	<view class="">
		<Navigation :title='"舒尔特方格"'></Navigation>
		<view class="content">
			<slider :value="number" @change="sliderChange" show-value :min='3' :max="9" :disabled="started" />
			<view class="">
				<template v-for="item in list">
					<view class="grid">
						<template v-for="childItem in item.child">
							<view :class="'item ' + 'item-' + list.length + ' '+ verification(childItem.value)"
								@click="clickedListFun(childItem.value)">
								{{childItem.value}}
							</view>
						</template>
					</view>
				</template>
			</view>
			<view class="play">
				<view class="button" @click="startGame">
					{{started?'停止':'开始'}}
				</view>
				<view class="time">
					时间：{{time}}
				</view>
				
			</view>
			<view class="lishi">
				<view class="title">
					历史成绩
				</view>
				<view class="list">
					<view class="lishi-item">
						<view >
							等级
						</view>
						<view class="">
							成绩
						</view>
					</view>
					<view class="lishi-item"  v-for="(item,index) in lishi" :key="index">
						<view >
							{{item.lv}}
						</view>
						<view class="">
							{{item.time}}
						</view>
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
				number: 3,
				list: [],
				clickedList: [],
				nowClick: null,
				time: '00\'000\"',
				started: false,
				lishi:[]
			};
		},
		computed: {

		},
		onLoad() {
			this.initGrid()
		},
		methods: {
			sliderChange(e) {
				this.number = e.detail.value
				this.list = []
				this.clickedList = []
				let listLength = this.number * this.number
				setTimeout(() => {
					this.initGrid()
				}, 10);
			},
			initGrid() {
				for (let i = 0; i < this.number; i++) {
					let child = []
					for (let j = 0; j < this.number; j++) {
						child.push({
							value: i * this.number + j + 1
						})
					}
					this.list.push({
						child
					})
				}
			},
			startGame() {
				this.started = true
				this.clickedList = []
				let listLength = this.number * this.number
				let list = []
				this.startTimeFun()
				for (let i = 0; i < listLength; i++) {
					list.push({
						value: i + 1,
						states: false,
						sort: Math.floor(Math.random() * 100000)
					})
				}
				list.sort((a, b) => {
					if (a.sort < b.sort) {
						return 1
					} else if (a.sort > b.sort) {
						return -1
					} else {
						return 0
					}
				})
				this.list = []
				for (let i = 0; i < this.number; i++) {
					let child = []
					for (let j = 0; j < this.number; j++) {
						child.push(list[i * this.number + j])
					}
					this.list.push({
						child
					})
				}
			},
			clickedListFun(e) {
				this.nowClick = e
				let oldValue = this.clickedList[this.clickedList.length - 1]
				oldValue = oldValue ? oldValue + 1 : 1
				if (oldValue === e * 1) {
					this.clickedList.push(e)
					console.log(e)
				}
				if (this.clickedList.length === this.number * this.number) {
					this.started = false
					clearInterval(this.timeInter)
					uni.showToast({
						icon:'none',
						title:'挑战成功，成绩：'+this.time
					})
					this.lishi.push({lv:this.number,time:this.time})
				}
			},
			verification(e) {
				let oldValue = this.clickedList[this.clickedList.length - 1]
				oldValue = oldValue ? oldValue : 0
				if (oldValue === e) {
					return 'active'
				} else {
					return ''
				}
			},
			startTimeFun() {
				let oldTime = (new Date()).getTime()
				this.time = this.getYMDHMS(oldTime, (new Date()).getTime())
				this.timeInter = setInterval(() => {
					this.time = this.getYMDHMS(oldTime, (new Date()).getTime())
				}, 100)
			},
			stopGame() {
				this.started = false
				clearInterval(this.timeInter)
				
			},
			getYMDHMS(startTime, endTime) {
				let diff = endTime - startTime
				let diffDate = new Date(diff)
				let seconds = parseInt(diffDate / 1000)
				let ms = diffDate.getTime() > 1000 ? `${diffDate.getTime()}`.slice(-3) : diffDate.getTime()
				return (seconds + '\'' + ms + '\"')
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		width: 100vw;
		padding: 60upx 0;
		box-sizing: border-box;

		.lishi{
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			padding: 40upx 24upx 0 24upx;
			.title{
				font-weight: 600;
			}
			.list{
				width: 100%;
				display: flex;
				justify-content: flex-start;
				flex-direction: column;
				.lishi-item{
					width: 100%;
					display: flex;
					justify-content: space-between;
					>view{
						width: 50%;
						text-align: center;
					}
				}
			}
		}
		.play {
			display: flex;
			justify-content: center;
			margin-top: 48upx;

			.button {
				border: solid 2upx #007AFF;
				color: #007AFF;
				padding: 0 48upx;
				height: 48upx;
				line-height: 48upx;
			}

			.time {
				line-height: 48upx;
				margin-left: 48upx;
				width: 300upx;
				background-color: #87cbff;
				text-align: center;
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

		.grid {
			display: flex;
			justify-content: space-between;
			width: 100%;
			
		}

		.item {
			width: 100%;
			border: solid 2upx #E5E5E5;
			margin: 6upx;
			text-align: center;
			&:hover{
				animation: myHover 1s linear;
			}
			
			@keyframes myHover {
				0% {
					background-color: #d93030;
				}
			
				100% {
					background-color: #FFFFFF;
				}
			}
			
			&.active {
				animation: myActive 1s linear;
			}

			@keyframes myActive {
				0% {
					background-color: #4CD964;
				}

				100% {
					background-color: #FFFFFF;
				}
			}

			&.item-3 {
				height: 250upx;
				width: 250upx;
				line-height: 250upx;
				font-size: 64upx;
			}

			&.item-4 {
				height: 180upx;
				width: 180upx;
				line-height: 180upx;
				font-size: 64upx;
			}

			&.item-5 {
				height: 150upx;
				width: 150upx;
				line-height: 150upx;
				font-size: 64upx;
			}

			&.item-6 {
				height: 126upx;
				width: 126upx;
				line-height: 126upx;
				font-size: 54upx;
			}

			&.item-7 {
				height: 110upx;
				width: 110upx;
				line-height: 110upx;
				font-size: 54upx;
			}

			&.item-8 {
				height: 90upx;
				width: 90upx;
				line-height: 90upx;
				font-size: 44upx;
			}

			&.item-9 {
				height: 80upx;
				width: 80upx;
				line-height: 80upx;
				font-size: 34upx;
			}
		}
	}
</style>
