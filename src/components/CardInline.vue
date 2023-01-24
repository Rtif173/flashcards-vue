<template>
  <article class="card-inline">
    <div class="left-side group-elem">
      <CardInlineItem :card="card" side="front" />
    </div>
    <div class="vr"></div>
    <div class="right-side group-elem">
      <CardInlineItem :card="card" side="back" />
    </div>
  </article>
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
  grid-template-columns: 1fr auto 1fr;
  padding: 0;
  min-height: calc(2 * var(--block-spacing-vertical));
}
.vr{
  margin: 0 0.25rem;
  width: var(--border-width);
  background-color: var(--muted-color);
}

.card-inline > div > :first-child{
  padding: var(--block-spacing-vertical) 0 var(--block-spacing-vertical) var(--block-spacing-vertical);
}
.card-inline > div > :last-child{
  padding: var(--block-spacing-vertical) var(--block-spacing-vertical) var(--block-spacing-vertical) 0;
}

.card-inline div {
  display: flex;
  overflow-y: auto;
  align-items: center;
}

.md-wrapper {
  padding: 0;
}
</style>
