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
const BASE_URL = import.meta.env.DEV ? "/" : import.meta.env.BASE_URL;
console.log('BASE_URL: ', BASE_URL);

</script>
<template>
  <div class="header-wrapper">
    <nav>
      <ul>
        <li>
          <picture>
            <source media="(min-width:380px)" :srcset="BASE_URL+ (lightTheme ? 'big%20logo%20outline.svg' : 'big%20logo%20outline%20dark.svg')">
            <source media="(min-width:260px)" :srcset="BASE_URL+'outline%20logo.svg'">
            <img class="logo-image" :src="BASE_URL+'logo-extra-small.svg'" />
          </picture>
        </li>
      </ul>
      <ul>
        <li>
          <router-link to="/cards">Карточки</router-link>
        </li>
        <li>
          <router-link to="/learn">Обучение</router-link>
        </li>
        <li>
          <router-link to="/login" role="button">
            <i class="pi pi-user"></i>
          </router-link>
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