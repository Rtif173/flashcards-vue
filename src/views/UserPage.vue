<script setup>
import { ref } from 'vue';
import CardsetItem from '../components/User/CardsetItem.vue';
// import { useRoute } from 'vue-router';
// const route = useRoute();

import api from '../api/api';
import Controller from '../components/User/Controller.vue';
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
  <CardsetItem v-for="cardsetname in cardsetnames" :cardsetname="cardsetname" :username="username" />
  <Controller />
</template>