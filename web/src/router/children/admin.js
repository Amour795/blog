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
      redirect: { name: 'articleTable' },
      component: () => import('@views/admin/main/index.vue'),
      children:[
        {
          path: 'articleTable',
          name: 'articleTable',
          component: () => import('@views/admin/main/articleManage/articleTable.vue'),
        },
        {
          path: 'editArticle',
          name: 'editArticle',
          component: () => import('@views/admin/main/articleManage/editArticle.vue'),
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