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
      name: '',
      component: () => import(/* webpackChunkName: "group-home" */'../components/home/RMain'),
      children:[
        {
          path: '',
          component: () => import(/* webpackChunkName: "group-home" */'../components/home/News'),
        },
        {
          path: '/library_books',
          component: () => import(/* webpackChunkName: "group-home" */'../components/home/News'),
        },
        {
          path: '/library_books/:tabName',
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
    },
    {
      path: '/back',
      name: 'back',
      component: () => import(/* webpackChunkName: "group-home" */'../components/home/RBackPage'),
      children:[
        {
          path: 'article',
          component: () => import(/* webpackChunkName: "group-home" */'../components/home/RArticle'),
          meta:{
            title:'查看正文',
          }
        },
        {
          path: 'stock',
          component: () => import(/* webpackChunkName: "group-home" */'../components/home/StockPage'),
          meta:{title:'股票'}
        },

      ]
    },
  ]
})
