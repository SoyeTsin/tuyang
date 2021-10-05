<template>
	<view class="simple-mode">
		<Navigation :title='"数字编码"'></Navigation>
		<view class="list">
			<view class="item" v-for="(item,index) in list" :key='index'>
				<text class="text">{{item.key}} {{item.name}}</text>
				<image class="image"
					:src="'https://7463-tcb-lqt34pwa7ed1dc-7d6e141a94107-1307263270.tcb.qcloud.la/images/number/'+item.key+'.jpg'"
					mode="aspectFit"></image>
			</view>
		</view>
	</view>
</template>


<script>
	import Navigation from '../../components/navigation.vue'
	import singleJson from '../../common/number.json'
	export default {
		components: {
			Navigation
		},
		data() {
			return {
				initList: {...singleJson},
				list: []
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
				this.list = initList.slice(-10)
			},

		}
	}
</script>

<style scoped lang="scss">
	.simple-mode {
		background-color: #F5F5F5;

		.list {
			padding-top: 24upx;
			box-sizing: border-box;
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

			image {
				background-color: #F5F5F5;
				height: 500upx;
				width: 500upx;
			}
		}
	}
</style>
