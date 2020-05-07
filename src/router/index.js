import Vue from 'vue'
import VueRouter from 'vue-router'

import login from '../views/login'//登录页面
import myinfo from '../views/myinfo' //我的页面
import entry from '../views/signup/entry' //报名入口
import uname from '../views/signup/uname' //姓名
import birthday from '../views/signup/birthday' //出生日期
import addr from '../views/signup/addr' //地址
import contact from '../views/signup/contact' //联系方式
import career from '../views/signup/career' //工作经历
import project from '../views/signup/project' //项目经历
import question from '../views/signup/question' //问题
import ability from '../views/signup/ability' //价值
import meetaddr from '../views/signup/meetaddr' //私享会地点
import status from '../views/signup/status'//报名状态
// new
import pay from '../views/pay' //支付

Vue.use(VueRouter)

const routes = [
  {
    // 默认登录页面
    path: '/',
    name: 'login',
    component: login
  },
  {
    // 登录页面
    path: '/login',
    name: 'login',
    component: login
  },
  {
    // 我的页面
    path: '/myinfo',
    name: 'myinfo',
    component: myinfo
  },
  {
    // 报名入口
    path: '/signup/entry',
    name: 'entry',
    component: entry
  }, {
    // 姓名
    path: '/signup/uname',
    name: 'uname',
    component: uname
  },
  {
    // 出生日期
    path: '/signup/birthday',
    name: 'birthday',
    component: birthday
  },
  {
    // 联系方式
    path: '/signup/contact',
    name: 'contact',
    component: contact
  },
  {
    // 居住地址
    path: '/signup/addr',
    name: 'addr',
    component: addr
  },
  {
    // 工作经历
    path: '/signup/career',
    name: 'career',
    component: career
  },
  {
    //项目经历
    path: '/signup/project',
    name: 'project',
    component: project
  },
  {
    // 问题
    path: '/signup/question',
    name: 'question',
    component: question
  },
  {
    // 价值
    path: '/signup/ability',
    name: 'ability',
    component: ability
  },
  {
    // 私享会地址
    path: '/signup/meetaddr',
    name: 'meetaddr',
    component: meetaddr
  },
  {
    // 报名状态
    path: '/signup/status',
    name: 'status',
    component: status
  },
  {
    // 支付页面
    path: '/pay',
    name: 'pay',
    component: pay
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
