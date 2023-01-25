<script setup>
import { storeUser } from '../../store';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
let thereWasHold = false;
const checkbox = ref(null);
const props = defineProps({
  cardsetname: null,
  username: null
})
function onLongTap() {
  storeUser.onSelect = !storeUser.onSelect;
  thereWasHold = true;
}
function onTap() {
  if (storeUser.onSelect) {
    checkbox.value.checked = !checkbox.value.checked;
    if (checkbox.value.checked == true) {
      storeUser.selected.push(props.cardsetname)
    } else {
      const indexOfSelected = storeUser.selected.indexOf(props.cardsetname);
      console.log(indexOfSelected);
      storeUser.selected.splice(indexOfSelected, 1)
    }
  } else {
    router.push(`/learn/${props.username}/${props.cardsetname}`)
  }
  console.log(storeUser.selected)
}
</script>
<template>
  <div class="cardset-item" v-touch:hold="onLongTap">
    <div class="check-box-wrapper" :style="!storeUser.onSelect ? '' : 'width: 2rem'">
      <input ref="checkbox" type="checkbox" name="selectCardsets" :id="cardsetname"
        :class="!storeUser.onSelect ? '' : 'check-box-show-anim'" class='check-box-animated' />
    </div>
    <article class="cardset-article" v-touch:tap="onTap">{{ cardsetname }}</article>
  </div>
</template>
<style scoped>
.cardset-item {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
}

.check-box-wrapper {
  display: flex;
  width: 0;
  transition: ease-in-out .3s;
}

.check-box-animated {
  margin: 0 auto;
  height: 0;
  width: 0;
  opacity: 0;
  transition: .3s;
}

.check-box-show-anim {
  width: 1.25em;
  height: 1.25em;
  opacity: 1;
  transition-delay: .2s;
}
</style>