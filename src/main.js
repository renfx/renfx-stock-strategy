// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
import { Lazyload } from 'vant';
import MIcon from './components/icon/MaterialIcon'
import api from './http/api.js'
import dateUtils from './utils/dateUtils.js'
import 'vant/lib/vant-css/index.css';
// 引入echarts
import echarts from 'echarts'

Vue.prototype.$echarts = echarts 
Vue.prototype.$api=api;
Vue.prototype.$dateUtils=dateUtils;
Vue.config.productionTip = false
Vue.use(Vant);
Vue.use(Lazyload);
Vue.component('MIcon',MIcon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
