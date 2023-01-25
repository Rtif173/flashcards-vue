import { createRouter, createWebHistory } from 'vue-router'
import FilesPage from './views/Cards.vue'
import LearnPage from './views/Learn.vue'
import LoginRegisterPage from './views/LoginRegisterPage.vue'
import UserPage from './views/UserPage.vue'

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