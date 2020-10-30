export default {
  path: '/',
  redirect: { name: 'home' },
  component: () => import('@views/blog/index.vue'),
  children: [
    {
      path: '/',
      name: 'home',
      component: () => import('@views/blog/home/index.vue'),
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('@views/blog/blog/index.vue'),
    },
    {
      path: '/demo',
      name: 'demo',
      component: () => import('@views/blog/demo/index.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@views/blog/about/index.vue'),
    },
  ]
}