<script>
import { store, onEdit, files, media } from '../../store';
import { isFileInFileArray } from '../../methods'
import FileUpload from 'primevue/fileupload';

function pasteHtmlAtCaret(html) {
  var sel, range;
  if (window.getSelection) {
    // IE9 and non-IE
    sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      range = sel.getRangeAt(0);
      range.deleteContents();

      // Range.createContextualFragment() would be useful here but is
      // non-standard and not supported in all browsers (IE9, for one)
      var el = document.createElement("div");
      el.innerHTML = html;
      var frag = document.createDocumentFragment(), node, lastNode;
      while ((node = el.firstChild)) {
        lastNode = frag.appendChild(node);
      }
      range.insertNode(frag);

      // Preserve the selection
      if (lastNode) {
        range = range.cloneRange();
        range.setStartAfter(lastNode);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  } else if (document.selection && document.selection.type != "Control") {
    // IE < 9
    document.selection.createRange().pasteHTML(html);
  }
}

export default {
  props: {
    card: {
      required: true,
    },
    side: {
      required: true
    }
  },
  data() {
    return {
      files,
      store,
      onEdit,
      media
    }
  },
  methods: {
    cancelCanges() {
      this.onEdit[this.card][this.side] = false;
    },
    saveCanges() {
      this.store.cards[this.card][this.side] = (this.$refs.editor.innerText);
      this.onEdit[this.card][this.side] = false;
    },
    async imageSelect(e) {
      const selectedFile = e.files[0];
      if (isFileInFileArray(selectedFile, this.files)) {
        console.log("fileAlreadyExist")
      } else {
        await media.loadMedia([selectedFile]);
        this.files.push(selectedFile);
      }
      this.$refs.editor.focus()
      pasteHtmlAtCaret(`![](${selectedFile.name})`)
    },
    myChose(chCb, clCb) {
      chCb();
      clCb();
    }
  },
  mounted() {
    this.$refs.editor.focus()
  },
  components: { FileUpload }
}
</script>
<template>
  <div class="editor-wrapper">
    <div class="editor-line">
      <!-- <textarea></textarea> -->
      <div ref="editor" class="editor" contentEditable="true">{{ store.cards[card][side] }}</div>
      <FileUpload name="demo[]" accept="image/*" @select="imageSelect" :multiple="false">
        <template #header="{ chooseCallback, clearCallback }">
          <button @click="myChose(chooseCallback, clearCallback)" class="pi pi-image"></button>
        </template>
        <template #content>
          <div></div>
        </template>
        <template #empty>
          <div></div>
        </template>
      </FileUpload>
    </div>
    <div class="button-group">
      <button @click.stop="cancelCanges">
        <i class="pi pi-times"></i>
      </button>
      <button @click.stop="saveCanges">
        <i class="pi pi-check"></i>
      </button>
    </div>
  </div>
</template>
<style scoped>
.editor-line {
  display: flex;
  align-items: center;
}

.editor-line button {
  width: fit-content;
}

.button-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.button-group button {
  margin: 0;
}

.button-group button:first-child {
  border-radius: var(--border-radius) 0 0 var(--border-radius);
}

.button-group button:last-child {
  border-radius: 0 var(--border-radius) var(--border-radius) 0;
}

.editor-wrapper {
  width: 100%;
}

.editor {
  margin: 0 var(--ssmal-padding) 1rem 2px;
  width: 100%;
  width: -moz-available;
  /* WebKit-based browsers will ignore this. */
  width: -webkit-fill-available;
  /* Mozilla-based browsers will ignore this. */
  width: fill-available;
}

.editor:focus {
  box-shadow: var(--button-hover-box-shadow, 0 0 0 rgba(0, 0, 0, 0)), 0 0 0 var(--outline-width) var(--primary-focus);
}
</style>