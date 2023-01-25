<script setup>
import { ref } from 'vue';
// import { useRoute } from 'vue-router';
// const route = useRoute();

import api from '../api/api';
const username = ref("");
const cardsetnames = ref([])
api.userInfo()
  .then(([resp, err]) => {
    if (!err) {
      username.value = resp.username;
      cardsetnames.value = resp.cardsets;
    }
  })
</script>
<template>
  <h1>Страница пользователя {{ username }}</h1>
  <router-link v-for="cardsetname in cardsetnames" :to="`/learn/${username}/${cardsetname}`">
    <article>{{ cardsetname }}</article>
  </router-link>
</template>