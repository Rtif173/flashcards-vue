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
  <h2>{{ text }}</h2>
</template>