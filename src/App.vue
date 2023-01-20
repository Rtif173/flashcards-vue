<script>
import FilesPage from './components/FilesPage.vue'
import Learn from './components/Learn.vue';
const routes = {
  '/': FilesPage,
  '/learn': Learn,
}

export default {
  data() {
    return {
      currentPath: window.location.hash
    }
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || NotFound
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
      this.currentPath = window.location.hash
    })
  }
}
</script>

<template>
  <a href="#/">Файлы</a> |
  <a href="#/learn">Карточки</a> |
  <component :is="currentView" />
</template>
