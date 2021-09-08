import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		docmentNodeValue: {}
	},
	mutations: {
		setDocmentNodeValue(state, value) {
			state.docmentNodeValue = value
		}
	},
	actions: {
		//
	},
	modules: {

	},
	plugins: [
		createPersistedState({
			storage: {
				getItem: key => uni.getStorageSync(key),
				setItem: (key, value) => uni.setStorageSync(key, value),
				removeItem: key => uni.removeStorageSync(key)
			}
		})
	],
})
