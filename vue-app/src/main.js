import Vue from 'vue' // vue 模块
import App from './App.vue' // 根组件
import router from './router' // 路由模块
import store from './store' // vuex 模块




// 引入公共的模块(公共的组件、指令、样式)
import "./utils/filters";
import "./styles/index.scss";

// 数据请求
import axios from "@/utils/axios.js";
Vue.prototype.$axios = axios; // this==> Vue.prototype  this.$axios ==> axios ;
// 导入vant-ui库，全局配置;
import Vant from "vant";
Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')