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
  <h4>{{ text }}</h4>
</template>