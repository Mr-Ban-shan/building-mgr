/* import _ from '../common'; */

export default [
  {
    title: '总览',
    url: '/dashboard',
    onlyAdmin: false,
  },
  {
    title: '建材管理',
    url: '/buildings',
    onlyAdmin: false,
  },
  {
    title: '用户管理',
    url: '/user',
    onlyAdmin: true,
  },
  {
    title: '操作日志',
    url: '/log',
    onlyAdmin: true,
  
  }, 
  {
    title: '建材分类管理',
    url: '/building-classify',
    onlyAdmin: true,
  },
  {
    title: '杂项',
    onlyAdmin: true,
    children: [
       
      {
        title: '重制密码列表',
        url: '/reset/password',
        onlyAdmin: true,
      },
      {
        title: '邀请码管理',
        url: '/invite-code',
        onlyAdmin: true,
      },
    ],
  },
  {
    title: '个人设置',
    url: '/profile',
    onlyAdmin: true,
  },  
];
