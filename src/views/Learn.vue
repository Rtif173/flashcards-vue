<script setup>
import { store, storeLearn } from "../store.js";
import Card from "../components/Learn/Card.vue";
import LearnResult from "../components/Learn/LearnResult.vue";
import { useRoute } from 'vue-router'
import { onBeforeMount } from 'vue'
import api from "../api/api";
const route = useRoute()
console.log("Страница Learn", storeLearn)
if (route.params.username && route.params.cardsetname) {
  api.loadCardsFromServer(route.params.username, route.params.cardsetname)
    .then(([resp, err]) => {
      if (err) {
        console.log(resp, err)
      } else {
        store.cards = resp.cards;
        setDefaultStoreLearn();
      }
    })
}
function genLine() {
  storeLearn.line = storeLearn.line.length == 0 ? Object.keys(store.cards) : storeLearn.line;
}
function setDefaultStoreLearn() {
  genLine();
  storeLearn.currentCard = 0;
  storeLearn.bad = [];
  storeLearn.good = [];
  storeLearn.isFront = true;
}

</script>

<template>
  <div class="wrapper">
    <div v-if="Object.keys(store.cards).length != 0 && storeLearn.currentCard != storeLearn.line.length"
      class="learn-screen">
      <div class="progress-info-wrapper learn-screen-item">
        <div class="progress-info bad">
          <div class="progress-counter">{{ storeLearn.bad.length }}</div>
          <span class="progress-label">Ещё изучаю</span>
        </div>
        <div class="progress-info good">
          <span class="progress-label">Знаю</span>
          <div class="progress-counter">{{ storeLearn.good.length }}</div>
        </div>
      </div>
      <div class="progress">
        <div class="bar" :style="'width: ' + storeLearn.currentCard / storeLearn.line.length * 100 + '%'">
        </div>
      </div>
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

/* progress.learn-screen-item {
  width: calc(100% - 2*var(--big-padding));
} */

.progress {
  width: 100%;
  height: 0.5rem;
  margin-bottom: calc(var(--spacing) * 0.5);
  overflow: hidden;
  border: 0;
  border-radius: var(--border-radius);
  background-color: var(--progress-background-color);
  color: var(--progress-color);
}

.progress .bar {
  height: 100%;
  background-color: var(--progress-color);
  transition: width .5s ease-in;
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