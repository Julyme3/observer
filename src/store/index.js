import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import reports from './reports'
import info from './info'
import stories from './stories'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, e) {
      state.error = e
    },
    clearError (state) {
      state.error = null
    }
  },
  getters: {
    error (state) {
      return state.error
    }
  },
  actions: {
  },
  modules: {
    auth, reports, info, stories
  }
})
