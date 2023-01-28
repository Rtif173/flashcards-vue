<script setup>
import api from '../../api/api';
import { storeUser } from '../../store';
function deleteCardsetsFromServer() {
  api.deleteCardsets(storeUser.selected)
    .then(([resp, err]) => console.log(resp))
}
function quitSelection() {
  storeUser.selected = [];
  storeUser.onSelect = false;
}

</script>
<template>
  <div class="controller-wrapper">
    <div class="controller buttons-container" :class="storeUser.onSelect ? 'show' : ''">
      <button @click="deleteCardsetsFromServer" :class="storeUser.selected.length > 0 ? 'visible' : 'invisible'">
        <i class="pi pi-trash"></i>
      </button>
      <button :class="storeUser.selected.length == 1 ? 'visible' : 'invisible'">
        <i class="pi pi-clone"></i>
      </button>
      <button @click="deleteCardsetsFromServer" :class="storeUser.selected.length == 1 ? 'visible' : 'invisible'">
        <i class="pi pi-pencil"></i>
      </button>
      <button :class="storeUser.selected.length > 0 ? 'visible' : 'invisible'">
        <i class="pi pi-share-alt"></i>
      </button>
      <button @click="quitSelection">
        <i class="pi pi-filter-slash"></i>
      </button>
    </div>
  </div>
</template>
<style scoped>
.controller {
  position: fixed;
  bottom: 0;
  width: calc(100% - 2*var(--block-spacing-vertical));
  transform: translateY(100%);
  opacity: 0;
  transition: .5s ease-in-out;
}

.controller.show {
  transform: translateY(0px);
  opacity: 1;
}

.invisible {
  display: none;
}
</style>