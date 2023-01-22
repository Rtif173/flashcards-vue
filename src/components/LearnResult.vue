<script>
import Knob from 'primevue/knob';
import { storeLearn, store } from '../store';
export default {
  data(){
    return{
      storeLearn,
      store
    }
  },
  methods:{
    repeatUnlearned(){
      this.storeLearn.line = this.storeLearn.bad;
      this.storeLearn.currentCard = 0;
      this.storeLearn.bad = [];
    },
    runAgain(){
      this.storeLearn.line = Object.keys(this.store.cards);
      this.storeLearn.currentCard = 0;
      this.storeLearn.bad = [];
      this.storeLearn.good = [];
    }
  },
  components: {Knob}
}
</script>
<template>
  <div class="learn-info-wrapper">
    <div class="results">
      <h5 class="header">Результаты</h5>
      <Knob v-model="storeLearn.good.length" :max="Object.keys(store.cards).length" readonly=""/>
    </div>
    <div class="next-actions">
      <h5 class="header">Продолжить изучение</h5>
      <div class="actions-wrapper">
        <article v-if="storeLearn.good.length != storeLearn.line.length" class="action" @click="repeatUnlearned">Повторить не изученные карточки</article>
        <article class="action" @click="runAgain">Начать сначала</article>
      </div>
    </div>
  </div>
</template>
<style>
.learn-info-wrapper{
  display: grid;
  grid-template-columns: 1fr 1fr;
}
article.action {
  cursor: pointer;
}
.p-knob-value{
  stroke: var(--ins-color)
}
.p-knob-range{
  stroke: var(--del-color)
}
</style>