<template>
  <div class="wrapper">
    <input type="file" @change="addFiles" multiple />
    <div class="explorer">
      <div class="flie-system">
        <FileSystemItem v-for="file in files" :file="file"/>
      </div>
      <div class="preview">
        <FileSystemPreview />
      </div>
    </div>
    <input type="button" @click="importCards" value="Импортировать">
    <CardInline v-for="(cardcontent, card) in store.cards" :card="card" />
    <input type="button" @click="createCard" value="Создать">
  </div>
</template>
<script>
import { store, files, media } from "../store.js";
import { readFileText, readFileUrl, generateRandomString, splitStingByLast } from "../methods";
import CardInline from './CardInline.vue';
import FileSystemItem from "./FileSystemItem.vue";
import FileSystemPreview from "./FileSystemPreview.vue";

// import * as zip from "@zip.js/zip.js";


// async function loadMedia(files) {
//   const media = store.media;
//   for (const file of files) {
//     if (file.type.startsWith("image")) {
//       media[file.name] = await readFileUrl(file);
//     }
//   }
//   store.media = media;
//   return media
// }

async function genCards(files) {
  const cards = {};
  for (const file of files) {
    const allFileName = file.name;
    const [fileNameWithoutExtension, extension ] = splitStingByLast(allFileName, ".");
    switch (extension) {
      case "md":
        const [cardName, side] = splitStingByLast(fileNameWithoutExtension, "-");
        if (!cards[cardName]) {
          cards[cardName] = {};
        }
        const text = await readFileText(file)
        cards[cardName][side] = text;
        break;
      default:
        break;
    }
  }
  return cards
}

export default {
  data() {
    return {
      files,
      preview: "Нет контента",
      fileOnPreview: "",
      store,
      media
    };
  },

  methods: {
    async addFiles(e) {
      const selectedFiles = e.target.files;
      await this.media.loadMedia(selectedFiles);
      this.files.push(...selectedFiles)
    },

    async importCards() {
      this.store.cards = await genCards(this.files);
      // console.log(JSON.stringify(this.store.cards));
    },
    createCard() {
      let token = generateRandomString(5);
      while(this.store.cards[token]){
        token = generateRandomString(5);
      }
      this.store.cards[token] = { front: "", back: "" }
    }
  },
  components: { CardInline, FileSystemItem, FileSystemPreview}
};
</script>
<style scoped>
[type="file"] {
  margin-bottom: calc(var(--spacing) - var(--form-element-spacing-vertical) * 0.5);
}

.wrapper {
  width: 100%;
  max-width: 40rem;
  margin: 0 auto;
}

.explorer {
  display: grid;
  grid-template-columns: 30% 70%;
  width: 100%;
  height: 50vh;
  border-radius: var(--border-radius);
  box-shadow: var(--card-box-shadow);
  margin-bottom: var(--spacing);
}

.explorer .flie-system {
  border-radius: var(--border-radius) 0 0 var(--border-radius);
}

.explorer .preview {
  border-radius: 0 var(--border-radius) var(--border-radius) 0;
}

.flie-system {
  color: var(--secondary-inverse);
  overflow-y: scroll;
  border-right: var(--border-width) solid var(--muted-border-color);
  background-color: var(--secondary);
}

.preview {
  overflow-y: scroll;
  padding: 0 var(--border-radius) 0 var(--ssmal-padding);
}

.preview image {
  margin: auto 0;
}
</style>