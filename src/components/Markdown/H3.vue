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
  <h3>{{ text }}</h3>
</template>