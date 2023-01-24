import { createRouter, createWebHistory } from 'vue-router'
import FilesPage from './components/FilesPage.vue'
import LearnPage from './components/Learn.vue'
import LoginRegisterPage from './components/LoginRegisterPage.vue'

const routes = [
  {
    path: '/cards',
    component: FilesPage
  },
  {
    path: '/learn',
    component: LearnPage
  },
  {
    path: '/login',
    component: LoginRegisterPage
  }
]

const router = createRouter({
  history: createWebHistory('/flashcards-vue/'),
  routes
})

export default router