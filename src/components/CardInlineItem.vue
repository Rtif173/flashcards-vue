<script>
import MarkdownW from './MarkdownW.vue';
import InlineEditor from './InlineEditor.vue';
import { store, onEdit } from "../store.js";

export default {
  props: {
    card: {
      required: true,
    },
    side: {
      required: true
    }
  },
  data(){
    return {
      onEdit,
      store
    }
  },
  methods: {
    openEditor(e){
      console.log(this.onEdit);
      if(!e.target.classList.contains("p-image-preview-indicator")){
        if(!this.onEdit[this.card]){
          this.onEdit[this.card] = {}
        }
        this.onEdit[this.card][this.side] = true;
      }
    }
  },
  components: { MarkdownW, InlineEditor }
};
</script>
<template>
  <div class="card-inline-item-wrapper" @click="openEditor">
    <div v-if="!(onEdit[card] && onEdit[card][side])" class="md-wrapper">
      <MarkdownW :markdown="store.cards[card][side]" />
    </div>
    <InlineEditor v-if="onEdit[card] && onEdit[card][side]" :card="card" :side="side"/>
  </div>
</template>
<style scoped>
.card-inline-item-wrapper{
  width: 100%;
  height: 100%;
}
</style>