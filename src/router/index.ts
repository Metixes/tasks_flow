import { createRouter, createWebHistory } from 'vue-router'
import ProjectView from '@/views/ProjectsView.vue'
import TasksView from '@/views/TasksView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ProjectView,
    },
    {
      path: '/tasks/:id',
      name: 'tasks',
      component: TasksView,
      props: true,
    },
  ],
})

export default router
