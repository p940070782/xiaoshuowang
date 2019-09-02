import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:sessionStorage.userInfo,
    touxiang:require('@/assets/shuqiLogo.jpg'),
    keywords:[],
  },
  mutations: {
    changeTouxiang(state,url){
      state.touxiang = url
    },
    addKeyword(state,keyword){
      state.keywords.unshift(keyword)
    }
  },
  actions: {

  }
});