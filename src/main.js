import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import Vant from 'vant';
import { Lazyload } from 'vant';
import MIcon from './components/icon/MaterialIcon'
import api from './http/api.js'
import dateUtils from './utils/dateUtils.js'
import chinessToPy from './utils/chinessToPy.js'
import 'vant/lib/vant-css/index.css';
// 引入echarts
import echarts from 'echarts'

Vue.prototype.$echarts = echarts
Vue.prototype.$api=api;
Vue.prototype.$dateUtils=dateUtils;
Vue.prototype.$pyUtils=chinessToPy;
Vue.config.productionTip = false
Vue.use(Vant);
Vue.use(Lazyload);
Vue.component('MIcon',MIcon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
})
