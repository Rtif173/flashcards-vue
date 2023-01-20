<template>
  <div class="card-inline">
    <div class="left-side group-elem">
      <CardInlineItem :card="card" side="front" />
    </div>
    <div class="right-side group-elem">
      <CardInlineItem :card="card" side="back" />
    </div>
  </div>
</template>

<script>
import CardInlineItem from './CardInlineItem.vue';
import MarkdownW from './MarkdownW.vue';
export default {
  props: {
    card: {
      required: true,
    },
  },
  mounted(){
    console.log(this.card);
  },
  components: { MarkdownW, CardInlineItem }
};
</script>

<style scoped>
.card-inline {
  display: grid;
  grid-template-columns: 1fr 1fr;
  box-shadow: var(--card-box-shadow);
  border-radius: var(--border-radius);
  margin-bottom: var(--spacing);
  min-height: calc(2 * var(--border-radius));
}
.card-inline div{
  padding: 1rem 0;
}

.card-inline .group-elem:first-child {
  padding-left: var(--border-radius);
  border-radius: var(--border-radius) 0 0 var(--border-radius);
}

.card-inline .group-elem:last-child {
  border-radius: 0 var(--border-radius) var(--border-radius) 0;
}

.card-inline div {
  display: flex;
  overflow-y: scroll;
  align-items: center;
}

.md-wrapper {
  padding: 0;
}
</style>
