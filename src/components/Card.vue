<script setup>
import { store, storeLearn } from "../store.js";
import { reactive, ref, computed } from "vue";
import { useSwipe } from '@vueuse/core';
import MarkdownW from "./MarkdownW.vue";
const target = ref();
const targetHeight = computed(() => target.value.offsetHeight);
console.log('targetHeight: ', targetHeight);

// const container = ref();

const left = ref('var(--big-padding)');
const transform = ref("rotateZ(0deg)");
const { direction, isSwiping, lengthX, lengthY } = useSwipe(
  target, {
  passive: true,
  onSwipe(e) {
    length = -(lengthX.value);
    left.value = `${length}px`;
    transform.value = `rotateZ(${length / 20}deg)`
  },
  onSwipeEnd(e, direction) {
    left.value = "var(--big-padding)";
    transform.value = "rotateZ(0deg)";
  }
}
)
let currentCardName=storeLearn.line[storeLearn.currentCard];
const state = reactive({
  view: store.cards[currentCardName] ? store.cards[currentCardName].front : ""
})
function rotate(e) {
  console.log(e.target.classList);
  if (!e.target.classList.contains("p-image-preview-indicator") && !e.target.classList.contains("p-image-preview-icon")) {
    state.view = store.isFront ? store.cards[currentCardName].back : store.cards[currentCardName].front;
    storeLearn.isFront = !storeLearn.isFront;
  }
}
function next(isGood) {
  storeLearn[isGood?"good":"bad"].push(currentCardName);
  storeLearn.currentCard++;
  currentCardName = storeLearn.line[storeLearn.currentCard];
  state.view = store.cards[currentCardName].front;
  store.isFront = true;
}
</script>

<template>
  <div class="card-wrapper">
    <div ref="target" class="card" :class="{ animated: !isSwiping }" @click="rotate" :style="{left, transform}">
      <div class="card-content-wrapper">
        <MarkdownW :markdown="state.view" />
      </div>
      <div class="button-group bottom-buttons-container">
        <button @click.stop="next(false)">Ещё изучаю</button>
        <button @click.stop="next(true)">Знаю</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.card-wrapper {
  position: relative;
  max-height: calc(95vh - 3rem + 2 * var(--big-for-card-wrapper));
  width: 100%;
  padding-top: var(--big-for-card-wrapper);
  padding-bottom: var(--big-for-card-wrapper);
  margin-top: calc(-1 * var(--big-for-card-wrapper));
  margin-bottom: calc(var(--spacing) - var(--big-for-card-wrapper));
  overflow: hidden;
}

.card {
  --padding: var(--border-radius);
  height: calc(100% - 2 * var(--big-for-card-wrapper));
  width: calc(100% - 2*var(--big-padding));
  box-sizing: border-box;
  padding: var(--padding);
  border-radius: var(--border-radius);
  box-shadow: var(--card-box-shadow);
  display: grid;
  grid-template-rows: 1fr auto;
  background-color: white;
  position: relative;
  row-gap: var(--padding) ;
}

.content {
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
}

.bottom-buttons-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.bottom-buttons-container button {
  margin: 0
}

.bottom-buttons-container button:first-child {
  border-radius: var(--border-radius) 0 0 var(--border-radius);
}

.bottom-buttons-container button:last-child {
  border-radius: 0 var(--border-radius) var(--border-radius) 0;
}

.animated {
  transition: all 0.2s ease-in-out;
}
</style>