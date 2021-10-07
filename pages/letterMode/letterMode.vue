<template>
	<view class="simple-mode">
		<Navigation :title='"数字编码"'></Navigation>
		<view class="lab">
			<view :class="activeLab===0?'text active':'text'" @click="selectNumber(0)">
				A-J
			</view>
			<view :class="activeLab===1?'text active':'text'" @click="selectNumber(1)">
				K-T
			</view>
			<view :class="activeLab===2?'text active':'text'" @click="selectNumber(2)">
				U-Z
			</view>
		</view>
		<view class="list">
			<view class="item" v-for="(item,index) in list" :key='index'>
				<text class="text">{{item.key.toUpperCase()}} {{item.name}}</text>
				<image class="image"
					:src="'https://7463-tcb-lqt34pwa7ed1dc-7d6e141a94107-1307263270.tcb.qcloud.la/images/single/'+item.key+'.jpg'"
					mode="aspectFit"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import Navigation from '../../components/navigation.vue'
	import singleJson from '../../common/single.json'
	export default {
		components: {
			Navigation
		},
		data() {
			return {
				activeLab: 0,
				list: [],
				initList: {
					...singleJson
				}
			};
		},
		mounted() {
			this.startGame()
		},
		methods: {
			startGame() {
				let initList = []
				for (let i in this.initList) {
					initList.push({
						name: this.initList[i],
						key: i,
					})
				}
				this.initList = initList.sort(function(a, b) {
					return a.key - b.key
				})
				this.selectNumber()
			},
			selectNumber(e = 0) {
				this.activeLab = e
				this.list = []
				if (e === 0) {
					this.list = this.initList.slice(0, 10)
				} else if (e === 1) {
					this.list = this.initList.slice(10, 20)
				} else {
					this.list = this.initList.slice(20, 26)
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.simple-mode {
		background-color: #F5F5F5;

		.list {
			padding-bottom: 48upx;
			box-sizing: border-box;
		}

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
				width: 33.33%;
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
