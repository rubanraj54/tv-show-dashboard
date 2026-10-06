import { createRouter, createWebHistory } from 'vue-router'
import DashboardPage from '@/pages/DashboardPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardPage,
    },
    {
      path: '/shows/:id',
      name: 'show-detail',
      component: () => import('@/pages/ShowDetailPage.vue'),
    },
  ],
})

export default router
