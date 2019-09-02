import Vue from 'vue'
import Router from 'vue-router'
import Guide from '@/views/Guide.vue'
import VueRouter from 'vue-router';
Vue.use(Router) // 全局声明


const routes = [{
    path: "/",
    redirect: {
      name: "guide"
    }
  }, {
    path: "/guide",
    name: "guide",
    component: Guide
  }, {
    path: "/classify/:category",
    name: "classify",
    component: () => import("@/views/Classify.vue")
  }, {
    path: "/fit",
    name: 'fit',
    component: () => import('@/views/Fit.vue')
  }, {
    path: "/admin",
    name: 'admin',
    component: () => import('@/views/Admin.vue')
  }, {
    path: '/common',
    name: 'common',
    component: () => import("@/views/Common.vue")
  }, {
    path: "/detail/:bookId",
    name: "detail",
    component: () => import("@/views/Details.vue")
  }, {
    path: '/register',
    name: 'register',
    component: () => import("@/views/Register.vue")
  }, {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue")
  }, {
    path: '/search',
    name: "search",
    component: () => import("@/views/Search.vue")
  }, {
    path: '/index',
    name: 'index',
    component: () => import('./views/Index.vue'), // 路由懒加载
    children: [{
      path: "",
      redirect: {
        name: "home" // 书架
      }
    }, {
      path: "book",
      name: "book",
      component: () => import("@/views/Book.vue"), // 书架 类似于购物车
    }, {
      path: "home",
      name: "home",
      component: () => import("@/views/Home.vue"), // 书城
    }, {
      path: "fenlei",
      name: "fenlei",
      component: () => import("@/views/Fenlei.vue"), // 免费书籍
    }, {
      path: "member",
      name: "member",
      component: () => import("@/views/Member.vue"), // 会员中心
    }, {
      path: "**",
      redirect: {
        name: "home"
      }
    }]
  }, {
    path: "**",
    redirect: {
      name: "home"
    }
  }

]


const router = new VueRouter({
  routes,
  mode: "hash",
  base: "/"
})

export default router;