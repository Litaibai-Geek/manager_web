import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/users/users.vue'
import Rights from '@/components/rights/right.vue'
import Role from '@/components/rights/role.vue'

import {
  Message
} from 'element-ui'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [{
        name: 'users',
        path: '/users',
        component: Users
      },
      {
        name: 'rights',
        path: '/rights',
        component: Rights
      },
      {
        name: 'roles',
        path: '/role',
        component: Role
      }
      ]
    }
  ]
})

Vue.use(Router)

const router = new Router({

})

// 在路由配置生效之前 统一判断token
// 路由/导航 守卫
// to 要去的路由配置
// 当前的路由配置
router.beforeEach((to, from, next) => {
  // 如果要去登录
  if (to.path === '/login') {
    next()
  } else {
    // 判断token
    const token = localStorage.getItem('token')
    if (!token) {
      // 提示
      Message.warning('请先登录')
      router.push({
        name: 'login'
      })
      return
    }
    next()
  }
})
// export default router
