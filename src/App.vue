<script setup>
// import FilesPage from './components/FilesPage.vue'
// import Learn from './components/Learn.vue';
import Header from './components/Header.vue';
// import LoginRegisterPage from './components/LoginRegisterPage.vue';
// const routes = {
//   '/': FilesPage,
//   '/learn': Learn,
//   '/login': LoginRegisterPage,
// }

// export default {
//     data() {
//         return {
//             currentPath: window.location.hash
//         };
//     },
//     computed: {
//         currentView() {
//             return routes[this.currentPath.slice(1) || "/"] || NotFound;
//         }
//     },
//     mounted() {
//         window.addEventListener("hashchange", () => {
//             this.currentPath = window.location.hash;
//         });
//     },
//     components: { Header }
// }
</script>

<template>
  <Header />
  <div class="view">
    <router-view />
  </div>
</template>
<style scoped>
.view {
  margin: 4rem var(--block-spacing-vertical) 0 var(--block-spacing-vertical);
}
</style>
