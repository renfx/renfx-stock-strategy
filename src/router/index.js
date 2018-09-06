import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import(/* webpackChunkName: "group-home" */'../components/home/RMain')
    }
  ]
})
