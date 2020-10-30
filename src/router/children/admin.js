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
    }
  ]
}