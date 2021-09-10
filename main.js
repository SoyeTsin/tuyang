import App from './App'
import store from './store/index.js'

import Vue from 'vue'
Vue.config.productionTip = false
//把vuex定义成全局组件
Vue.prototype.$store = store

App.mpType = 'app'
const app = new Vue({
	...App,
	store
})
app.$mount()


