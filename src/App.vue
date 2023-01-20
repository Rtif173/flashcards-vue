<script>
import FilesPage from './components/FilesPage.vue'
import Learn from './components/Learn.vue';
import Header from './components/Header.vue';

const routes = {
  '/': FilesPage,
  '/learn': Learn,
}

export default {
    data() {
        return {
            currentPath: window.location.hash
        };
    },
    computed: {
        currentView() {
            return routes[this.currentPath.slice(1) || "/"] || NotFound;
        }
    },
    mounted() {
        window.addEventListener("hashchange", () => {
            this.currentPath = window.location.hash;
        });
    },
    components: { Header }
}
</script>

<template>
  <Header />
  <div class="view">
    <component :is="currentView" />
  </div>
</template>
<style scoped>
.view{
  margin-top: 4rem;
}
</style>
