<template>
	<view class="simple-mode">
		<Navigation :title='"数字编码"'></Navigation>
		<view class="lab">
			<view :class="activeLab===0?'text active':'text'" @click="selectNumber(0)">
				0-19
			</view>
			<view :class="activeLab===1?'text active':'text'" @click="selectNumber(1)">
				20-39
			</view>
			<view :class="activeLab===2?'text active':'text'" @click="selectNumber(2)">
				40-59
			</view>
			<view :class="activeLab===3?'text active':'text'" @click="selectNumber(3)">
				60-79
			</view>
			<view :class="activeLab===4?'text active':'text'" @click="selectNumber(4)">
				80-99
			</view>
		</view>
		<view class="list">
			<view class="item" v-for="(item,index) in list" :key='index'>
				<text class="text">{{item.number}}</text>
				<image class="image" :src="'../../static/images/'+item.number+'.jpg'" mode="aspectFit"></image>
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
				activeLab: 0,
				list: [],
				initList:[]
			};
		},
		mounted() {
			this.startGame()
		},
		methods: {
			startGame() {
				let initList = []
				for (let i = 0; i < 100; i++) {
					initList.push({
						number: i,
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
				this.initList = initList
				this.selectNumber()
			},
			selectNumber(e = 0) {
				this.activeLab = e
				this.list = []
				for (let i = e * 20; i < (e + 1) * 20; i++) {
					this.list.push(this.initList[i])
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.simple-mode {
		background-color: #F5F5F5;

		.lab {
			display: flex;
			justify-content: space-between;
			width: 100%;
			height: 80upx;
			line-height: 80upx;
			background-color: #FFFFFF;
			border-top: 2upx solid #F5F5F5;
			border-bottom: 2upx solid #E5E5E5;
			margin-bottom: 24upx;

			.text {
				width: 20%;
				text-align: center;

				&.active {
					background-color: #C8C7CC;
				}
			}
		}

		.item {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			margin-bottom: 48upx;

			.text {
				font-weight: 600;
				font-size: 36upx;
				line-height: 56upx;
			}
		}
	}
</style>
