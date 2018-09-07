import Vue from 'vue'
import Router from 'vue-router'
Router.prototype.goBack = function () {
  this.isBack = true
  this.go(-1)
}
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import(/* webpackChunkName: "group-home" */'../components/home/RMain'),
      children:[
        {
          path: '/library_books',
          component: () => import(/* webpackChunkName: "group-home" */'../components/home/News'),
        },
        {
          path: '/equalizer',
          component: () => import(/* webpackChunkName: "group-home" */'../components/home/Quotation'),
        },
        {
          path: '/extension',
          component: () => import(/* webpackChunkName: "group-home" */'../components/home/Strategy'),
        }
      ]
    },
    {
      path: '/search',
        name: 'search',
      component: () => import(/* webpackChunkName: "group-home" */'../components/home/RSearch'),
    }
  ]
})
