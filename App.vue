<script>
	export default {
		onLaunch() {
			const that=this
			console.log('App Launch')
			uni.getSystemInfo({
				success: function(e) {
					let statusBar = 0;
					let customBar = 0;
					statusBar = e.statusBarHeight
					// #ifndef MP  
					if (e.platform == 'android') {
						customBar = e.statusBarHeight + 50
					} else {
						customBar = e.statusBarHeight + 45
					}
					// #endif  

					// #ifdef MP-WEIXIN  
					let custom = wx.getMenuButtonBoundingClientRect()
					customBar = custom.bottom + custom.top - e.statusBarHeight
					// customBar = custom.bottom - custom.top 
					// #endif  

					// #ifdef MP-ALIPAY  
					customBar = e.statusBarHeight + e.titleBarHeight
					// #endif  
					that.$store.commit('setDocmentNodeValue',{
						statusBar,customBar
					})
				}
			})
		},
		onShow() {
			console.log('App Show')
		},
		onHide() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
