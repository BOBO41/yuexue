import Vue from 'vue'
import Router from 'vue-router'
import Homepage from 'views/homepage'
import UserInfo from 'views/user-info'
import OrderList from 'views/order-list'
import Login from 'views/login'
import NewOrder from 'views/new-order'
import OrderDetail from 'views/order-detail'
import UserOrder from 'views/user-order'
import ModifyInfo from 'views/modify-info'
import Page404 from 'views/404'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: Login,
      meta: {
        index: 0
      }
    },
    { // 默认跳转到首页
      path: '/',
      redirect: '/homepage',
      meta: {
        index: 0
      }
    },
    { // 邀约列表页
      path: '/order-list',
      component: OrderList,
      meta: {
        index: 1
      }
    },
    { // 个人中心页
      path: '/user-info',
      component: UserInfo,
      meta: {
        index: 1
      }
    },
    { // 查看个人订单页
      path: '/user-order',
      component: UserOrder,
      meta: {
        index: 2
      }
    },
    { // 个人订单详情页
      path: '/user-order-detail/:orderId',
      component: OrderDetail,
      meta: {
        index: 3
      }
    },
    { // 修改个人信息页
      path: '/modify-info/:id',
      component: ModifyInfo,
      meta: {
        index: 2
      }
    },
    { // 邀约列表-详情页
      path: '/list-order-detail/:orderId',
      component: OrderDetail,
      meta: {
        index: 2
      }
    },
    { // 首页
      path: '/homepage',
      component: Homepage,
      meta: {
        index: 1
      }
    },
    { // 新增订单页
      path: '/new-order',
      component: NewOrder,
      meta: {
        index: 2
      }
    },
    {
      path: '*',
      component: Page404,
      meta: {
        index: 0
      }
    }
  ]
})
