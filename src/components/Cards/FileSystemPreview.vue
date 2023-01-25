<script>
import MarkdownW from "../MarkdownW.vue";
import Image from "primevue/image";
import { files, storeExplorer } from "../../store.js"

export default {
  data() {
    return {
      storeExplorer,
    }
  },
  components: { MarkdownW, Image }
}
</script>
<template>
  <div v-if="storeExplorer.typeOfFileOnPreview == 'markdown'">
    <MarkdownW :markdown="storeExplorer.preview" />
  </div>
  <div v-if="storeExplorer.typeOfFileOnPreview == 'image'">
    <Image :src="storeExplorer.preview" preview />
  </div>
</template>
<style scoped>

</style>