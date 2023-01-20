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
  <strong>{{ text }}</strong>
</template>