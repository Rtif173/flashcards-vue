<script setup>
import { ref } from 'vue';

const initialTheme = localStorage.getItem("theme") == "light";
const lightTheme = ref(initialTheme);
document.querySelector("html").setAttribute("data-theme", lightTheme.value ? "light" : "dark");
function changeTheme(){
  lightTheme.value = !lightTheme.value;
  document.querySelector("html").setAttribute("data-theme", lightTheme.value ? "light" : "dark");
  localStorage.setItem("theme", lightTheme.value ? "light" : "dark")
}
</script>
<template>
  <div class="header-wrapper">
    <nav>
      <ul>
        <li>
          <picture>
            <source media="(min-width:340px)" :srcset="lightTheme ? '../../assets/img/big%20logo%20outline.svg' : '../../assets/img/big%20logo%20outline%20dark.svg'">
            <source media="(min-width:260px)" srcset="/logo-small.svg">
            <img class="logo-image" src="/logo-extra-small.svg" />
          </picture>
        </li>
      </ul>
      <ul>
        <li>
          <a href="#/">Файлы</a>
        </li>
        <li>
          <a href="#/learn">Карточки</a>
        </li>
        <li>
          <a href="javascript:void(0)" @click="changeTheme">
            <i class="pi" :class="lightTheme ? 'pi-sun' : 'pi-moon' "></i>
          </a>
        </li>
      </ul>
    </nav>
    <div class="under-header"></div>
  </div>
</template>
<style scoped>
.header-wrapper {
  --header-height: 2rem;
  position: fixed;
  height: fit-content;
  width: 100%;
  top: 0;
  backdrop-filter: blur(5px);
  border-bottom: var(--border-width) solid var(--muted-border-color);
  padding: 0 var(--big-padding);
  z-index: 3;
}

.under-header {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--background-color);
  opacity: 0.5;
  z-index: -1;
}

/* header {
  position: fixed;
  top: 0;
  display: flex;
  box-sizing: content-box;
  height: 2rem;
  padding: 1rem;
  backdrop-filter: blur(5px);
  width: 100%;
  z-index: 3;
} */

/* .links-wrapper ul {
  display: flex;
  margin: 0;
  padding: 0;
}

.links-wrapper li {
  list-style-type: none;
  margin: 0 0.25rem 0 0.25rem;
}

.links-wrapper a {
  padding: .25rem;
} */

.logo-image {
  margin-top: -0.3%;
  max-height: var(--header-height);
}
</style>