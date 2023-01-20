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
  <h6>{{ text }}</h6>
</template>