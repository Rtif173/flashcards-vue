<script setup>
import { store, storeLearn } from "../store.js";
import Card from "./Card.vue";
import LearnResult from "./LearnResult.vue";
import { useRoute } from 'vue-router'
import { onBeforeMount } from 'vue'
import api from "../api/api";
const route = useRoute()

if (route.params.username && route.params.cardsetname) {
  api.loadCardsFromServer(route.params.username, route.params.cardsetname)
    .then(([resp, err]) => {
      if (err) {
        console.log(resp, err)
      } else {
        store.cards = resp.cards;
        genLine()
      }
    })
}
function genLine() {
  storeLearn.line = storeLearn.line.length == 0 ? Object.keys(store.cards) : store.storeLearn;
}

</script>

<template>
  <div class="wrapper">
    <div v-if="Object.keys(store.cards).length != 0 && storeLearn.currentCard != storeLearn.line.length"
      class="learn-screen">
      <div class="progress-info-wrapper learn-screen-item">
        <div class="progress-info bad">
          <div class="progress-counter">{{ storeLearn.bad.length }}</div>
          <span class="progress-label"></span>
        </div>
        <div class="progress-info good">
          <span class="progress-label">Знаю</span>
          <div class="progress-counter">{{ storeLearn.good.length }}</div>
        </div>
      </div>
      <progress class="learn-screen-item animated" :value="storeLearn.currentCard" :max="storeLearn.line.length"
        :style="'--value: ' + storeLearn.currentCard / storeLearn.line.length * 100 + '%'"></progress>
      <Card />
    </div>
    <div v-if="Object.keys(store.cards).length == 0" class="no-cards">
      <h1>Карточек нет</h1>
      <p>Создайте или импортируйте карточки на странице <a href="#/">Файлы</a></p>
    </div>
    <div v-if="Object.keys(store.cards).length != 0 && storeLearn.currentCard == storeLearn.line.length">
      <LearnResult />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.learn-screen {
  margin: 0 2rem;
  width: 100%;
  max-width: 40rem;
}

.learn-screen-item {
  margin-right: var(--big-padding);
  margin-left: var(--big-padding);
}

progress.learn-screen-item {
  width: calc(100% - 2*var(--big-padding));
}

.progress-info-wrapper {
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.progress-info {
  display: flex;
  align-items: center;
}

.progress-counter {
  border: 2px solid black;
  border-radius: var(--border-radius-small);
  padding: 0.25rem 0.5rem;
}

.progress-label {
  margin: 0 0.5rem;
}

.good {
  color: green;
}

.bad {
  color: indianred;
}

.bad .progress-counter {
  border-color: indianred;
}

.good .progress-counter {
  border-color: green;
}
</style>