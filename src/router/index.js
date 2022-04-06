import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home'
import flowTalents from '@/views/ flowTalents/flowTalents'
import mainPage from '@/views/fee/mainPage'


Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
    },
    {
      path: '/flowTalents',
      name: 'flowTalents',
      component: flowTalents,
    },
    {
      path: '/mainPage',
      name: 'mainPage',
      component: mainPage,
    }
  ],
})
