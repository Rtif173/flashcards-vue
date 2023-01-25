import { createRouter, createWebHistory } from 'vue-router'
import FilesPage from './components/FilesPage.vue'
import LearnPage from './components/Learn.vue'
import LoginRegisterPage from './components/LoginRegisterPage.vue'
import UserPage from './components/UserPage.vue'

const routes = [
  {
    path: '/cards',
    component: FilesPage
  },
  {
    path: '/learn/:username/:cardsetname',
    component: LearnPage
  },
  {
    path: '/learn',
    component: LearnPage
  },
  {
    path: '/login',
    component: LoginRegisterPage,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("session")) {
        next("/user")
      } else {
        next()
      }
    }
  },
  {
    path: '/user',
    component: UserPage
  }
]

const router = createRouter({
  history: createWebHistory('/flashcards-vue/'),
  routes
})

export default router