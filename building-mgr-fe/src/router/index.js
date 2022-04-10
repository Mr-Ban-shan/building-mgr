import { createRouter, createWebHashHistory } from 'vue-router';


const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth/index.vue'),
  },
  {
    path: '/',
    name: 'BasicLayout',
    component: () => import(/* webpackChunkName: "BasicLayout" */ '../layout/BasicLayout/index.vue'),
    children: [
      {
        path: '/buildings',
        name: 'Buildings',
        component: () => import(/* webpackChunkName: "Buildings" */ '../views/Buildings/index.vue'),
      },
      {
        path: '/buildings/:id',
        name: 'BuildingDetail',
        component: () => import(/* webpackChunkName: "BuildingDetail" */ '../views/BuildingDetail/index.vue'),
      },
      {
        path: 'user',
        name: 'User',
        component: () => import(/* webpackChunkName: "User" */ '../views/Users/index.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

