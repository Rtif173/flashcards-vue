<script>
import {files, storeExplorer} from "../store.js"
import { defineFileType, readFileText, readFileUrl } from "../methods";

async function generatePreviewContent(file){
  if(!file){
    return ""
  }
  let preview = "";
  switch (defineFileType(file)){
    case "markdown":
      preview = await readFileText(file);
      break;
    case "image":
      preview = await readFileUrl(file);
      break;
    default:
      console.log("unknown type")
  }
  return preview
}

export default {
  props:{ 
    file:{
      required: true
    }
  },
  data(){
    return {
      files,
      storeExplorer
    }
  },
  methods:{
    async previewFile(){
      this.storeExplorer.preview = "";
      this.storeExplorer.preview = await generatePreviewContent(this.file);
      this.storeExplorer.typeOfFileOnPreview = defineFileType(this.file);
    }
  }
}
</script>
<template>
  <div class="file-item" @click="previewFile">{{ file.name }}</div>
</template>
<style scoped>
.file-item:hover {
  background-color: var(--secondary-hover);
}

.file-item {
  padding: var(--ssmal-padding) 0 var(--ssmal-padding) var(--border-radius);
  text-align: left;
}
</style>