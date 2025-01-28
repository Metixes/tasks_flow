import { createRouter, createWebHistory } from 'vue-router'
import ProjectView from '@/views/ProjectsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ProjectView,
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: '/tasks/:id',
      name: 'tasks',
      component: () => import('../views/TasksView.vue'), 
      props: true,
    },
  ],
})

export default router
