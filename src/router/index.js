import Vue from 'vue'
import Router from 'vue-router'
import RMain from '@/components/main/RMain'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: RMain
    }
  ]
})
