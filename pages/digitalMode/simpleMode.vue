<template>
	<view class="simple-mode">
		<Navigation :title='"数字编码"'></Navigation>
		<view class="list">
			<view class="item" v-for="(item,index) in list" :key='index'>
				<text class="text">{{index+1}} {{item.name}}</text>
				<image src="https://7463-tcb-lqt34pwa7ed1dc-7d6e141a94107-1307263270.tcb.qcloud.la/images/xiaoyazi.svg"
					mode=""></image>
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
				list: []
			};
		},
		mounted() {
			this.selectNumber()
		},
		methods: {
			selectNumber() {
				this.list = []
				for (let i = 0; i < 19; i++) {
					this.list.push({
						value: i,
						name: '小鸭子'
					})
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
