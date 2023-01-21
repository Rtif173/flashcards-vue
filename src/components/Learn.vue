<script>
import { def } from "@vue/shared";
import { store } from "../store.js";
import Card from "./Card.vue";

export default {
  data() {
    return {
      store
    }
  },
  beforeMount() {
    if (Object.keys(this.store.cards).length != 0) {
      this.store.line = this.store.line.length == 0 ? Object.keys(this.store.cards) : this.store.line;
      console.log('this.store.line: ', this.store.line);
      this.store.currentCard = this.store.currentCard.length == 0 ? this.store.line.pop() : this.store.currentCard;
      console.log('this.store.currentCard: ', this.store.currentCard);
    }
  },
  components: { Card }
}

</script>

<template>
  <div class="wrapper">
    <div v-if="Object.keys(this.store.cards).length != 0" class="learn-screen">
      <div class="progress-info-wrapper">
        <div class="progress-info bad">
          <div class="progress-counter">{{ store.bad }}</div>
          <span class="progress-label">Ещё изучаю</span>
        </div>
        <div class="progress-info good">
          <span class="progress-label">Знаю</span>
          <div class="progress-counter">{{ store.good }}</div>
        </div>
      </div>
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

.progress-info-wrapper {
  margin: 1rem var(--big-padding);
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