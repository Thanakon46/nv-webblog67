import Vue from 'vue'
import Router from 'vue-router'

import UserIndex from '@/components/User/index'
import UserEdit from '@/components/User/EditUser'
import UserCreate from '@/components/User/CreateUser'
import UserShow from '@/components/User/ShowUser'
import Login from '@/components/Login'

import CommentIndex from '@/components/Comments/index' 

import CapList from '@/components/Cap/CapList.vue';
import CapCreate from '@/components/Cap/CapCreate.vue';
import CapEdit from '@/components/Cap/CapEdit.vue';
import CapDetail from '@/components/Cap/CapDetail.vue';

import Upload from '@/components/Util/Upload'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // User routes
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
    
    // Comments routes
    {
      path: '/comments',
      name: 'comments',
      component: CommentIndex
    },

    // Cap routes
    {
      path: '/caps',
      name: 'caps',
      component: CapList
    },
    {
      path: '/cap/create',
      name: 'cap-create',
      component: CapCreate
    },
    {
      path: '/cap/edit/:id',
      name: 'cap-edit',
      component: CapEdit
    },
    {
      path: '/cap/:id',
      name: 'cap-detail',
      component: CapDetail
    },

    // Upload route
    {
      path: '/upload',
      name: 'upload',
      component: Upload
    }
  ]
})
