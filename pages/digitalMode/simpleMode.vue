<template>
	<view class="simple-mode">
		<Navigation :title='"数字编码"'></Navigation>
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
				initList:[],
				list: []
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
			selectNumber() {
				this.list = []
				for (let i = 0; i < 19; i++) {
					this.list.push(this.initList[i])
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.simple-mode {
		background-color: #F5F5F5;

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
