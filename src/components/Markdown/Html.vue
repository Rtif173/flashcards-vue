<script>
export default {
  props: {
    text: {
      required: true,
    },
  },
}
</script>
<template>
  <br v-if="text == '<br>'">
</template>