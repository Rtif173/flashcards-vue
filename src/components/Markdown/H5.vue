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
  <h5>{{ text }}</h5>
</template>