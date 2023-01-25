<script setup>
import api from '../../api/api';
import { storeUser } from '../../store';
function deleteCardsetsFromServer() {
  api.deleteCardsets(storeUser.selected)
    .then(([resp, err]) => console.log(resp))
}

</script>
<template>
  <div class="controller-wrapper">
    <div class="controller">
      <button @click="deleteCardsetsFromServer">
        <i class="pi pi-trash"></i>
      </button>
      <button>
        <i class="pi pi-share-alt"></i>
      </button>
    </div>
  </div>
</template>
<style scoped>
.controller {
  display: flex;
}
</style>