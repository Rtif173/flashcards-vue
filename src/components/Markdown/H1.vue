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
  <h1>{{ text }}</h1>
</template>