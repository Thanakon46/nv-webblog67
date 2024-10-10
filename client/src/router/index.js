import Vue from 'vue'
import Router from 'vue-router'

import UserIndex from '@/components/User/index'
import UserEdit from '@/components/User/EditUser'
import UserCreate from '@/components/User/CreateUser'
import UserShow from '@/components/User/ShowUser'
import Login from '@/components/Login'

import CommentIndex from '@/components/Comments/index' 

import CapIndex from '@/components/Caps/index'
import CapCreate from '@/components/Caps/CreateCap'
import CapShow from '@/components/Caps/ShowCap'
import CapEdit from '@/components/Caps/EditCap'

import Upload from '@/components/Util/Upload'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/users',
      name: 'users',
      component: UserIndex
    },
    {
      path: '/user/edit/:userId',
      name: 'user-edit',
      component: UserEdit
    },
    {
      path: '/user/create',
      name: 'user-create',
      component: UserCreate
    },
    {
      path: '/user/:userId',
      name: 'user',
      component: UserShow
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/caps',
      name: 'caps',
      component: CapIndex
    },
    {
      path: '/cap/create',
      name: 'cap-create',
      component: CapCreate
    },
    {
      path: '/cap/edit/:capId',
      name: 'cap-edit',
      component: CapEdit
    },
    {
      path: '/cap/:capId',
      name: 'cap',
      component: CapShow
    },
    {
      path: '/comments',
      name: 'comments',
      component: CommentIndex
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload
    },
  ]
})
