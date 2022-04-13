import { createRouter, createWebHashHistory } from 'vue-router';
import store from '@/store';
import { user } from '@/service';
import { message } from 'ant-design-vue';
const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth/index.vue'),
  },
  {
    path: '/',
    name: 'BasicLayout',
    redirect: '/auth',
    component: () => import(/* webpackChunkName: "BasicLayout" */ '../layout/BasicLayout/index.vue'),
    children: [
      {
        path: 'buildings',
        name: 'Buildings',
        component: () => import(/* webpackChunkName: "Buildings" */ '../views/Buildings/index.vue'),
      },
      {
        path: 'buildings/:id',
        name: 'BuildingDetail',
        component: () => import(/* webpackChunkName: "BuildingDetail" */ '../views/BuildingDetail/index.vue'),
      },
      {
        path: 'user',
        name: 'User',
        component: () => import(/* webpackChunkName: "User" */ '../views/Users/index.vue'),
      },
      {
        path: 'log',
        name: 'Log',
        component: () => import(/* webpackChunkName: "Log" */ '../views/Log/index.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {

  /* let res = {};

  try {
    res = await user.info();
  } catch (e) {
    if (e.message.includes('code 401')) {
      res.code = 401;
    }
  }

  const { code } = res;

  if (code === 401) {
    if (to.path === '/auth') {
      next();
      return;
    }

    message.error('认证失败，请重新登入');
    next('/auth');

    return;
  } */

  if (!store.state.characterInfo.length) {
    await store.dispatch('getCharacterInfo');
  }

  /* store.dispatch('getUserInfo'); */

  /* const reqArr = []; */

  if (!store.state.userInfo.account) {
    await store.dispatch('getUserInfo');
  }

  /* 
  if (!store.state.goodClassify.length) {
    reqArr.push(store.dispatch('getGoodClassify'));
  }*/

  

  

  /* await Promise.all(reqArr); */

  /* if (to.path === '/auth') {
    next('/goods');
    return;
  } */
   
  next(); 
});

export default router;

