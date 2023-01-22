<script>
import { def } from "@vue/shared";
import { store } from "../store.js";
import Card from "./Card.vue";

export default {
  data() {
    return {
      store,
    }
  },
  beforeMount() {
    if (Object.keys(this.store.cards).length != 0) {
      this.store.line = this.store.line.length == 0 ? Object.keys(this.store.cards) : this.store.line;
      console.log('this.store.line: ', this.store.line);
      // this.store.currentCard = this.store.currentCard ? this.store.currentCard : 0;
      console.log('this.store.currentCard: ', this.store.currentCard);
    }
  },
  components: { Card }
}

</script>

<template>
  <div class="wrapper">
    <div v-if="Object.keys(this.store.cards).length != 0" class="learn-screen">
      <div class="progress-info-wrapper learn-screen-item">
        <div class="progress-info bad">
          <div class="progress-counter">{{ store.bad }}</div>
          <span class="progress-label">Ещё изучаю</span>
        </div>
        <div class="progress-info good">
          <span class="progress-label">Знаю</span>
          <div class="progress-counter">{{ store.good }}</div>
        </div>
      </div>
      <progress class="learn-screen-item animated" :value="store.currentCard" :max="Object.keys(store.cards).length" :style="'--value: '+ store.currentCard/Object.keys(store.cards).length*100 +'%' "></progress>
      <Card />
    </div>
    <div v-if="Object.keys(this.store.cards).length == 0" class="no-cards">
      <h1>Карточек нет</h1>
      <p>Создайте или импортируйте карточки на странице <a href="#/">Файлы</a></p>
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

.learn-screen-item{
  margin-right: var(--big-padding);
  margin-left: var(--big-padding);
}
progress.learn-screen-item{
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