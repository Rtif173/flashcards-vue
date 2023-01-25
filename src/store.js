import { reactive } from 'vue'
import { readFileUrl } from './methods';
export const files = reactive([]);
export const media = reactive({
  media: {},
  async loadMedia(files) {
    const newMedia = {};
    for (const file of files) {
      if (file.type.startsWith("image")) {
        newMedia[file.name] = await readFileUrl(file);
      }
    }
    this.media = { ...this.media, ...newMedia };
  }
})

export const storeExplorer = reactive({
  typeOfFileOnPreview: "",
  preview: ""
})

export const storeLearn = reactive({
  isFront: true,
  currentCard: 0,
  good: [],
  bad: [],
  line: [],
})

export const storeUser = reactive({
  onSelect: false,
  selected: []
})
export const store = reactive({
  cards: {},
  media: {},
});

export const onEdit = reactive({});