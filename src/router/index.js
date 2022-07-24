import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/books',
      name: 'books',
      component: () => import('../views/ListView.vue')
    },
    {
      path: '/books/:bookId',
      name: 'bookDetail',
      component: () => import('../views/DetailView.vue')
    },
  ]
})

export default router
