export default {
  path: '/admin',
  name:'admin',
  redirect: { name: 'login' },
  component: () => import('@views/admin/index.vue'),
  children: [
    {
      path: 'login',
      name: 'login',
      component: () => import('@views/admin/login.vue'),
    },
    {
      path: 'main',
      name: 'main',
      redirect: { name: 'articleManage' },
      component: () => import('@views/admin/main/index.vue'),
      children:[
        {
          path: 'articleManage',
          name: 'articleManage',
          component: () => import('@views/admin/main/articleManage/index.vue'),
        },
        {
          path: 'homeManage',
          name: 'homeManage',
          component: () => import('@views/admin/main/homeManage/index.vue'),
        }
      ]
    },
  ]
}