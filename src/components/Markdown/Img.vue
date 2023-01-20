<script>
import { media } from '../../store';
import Image from 'primevue/image';

export default {
  props: {
    href: {
      required: true,
    },
    text: {
      required: true,
    },
    title: {
      required: true,
    }
  },
  data(){
    return {
      url: media.media[decodeURI(this.href)]
    }
  },
  components:{Image}
}
</script>
<template>
  <Image :src="url" preview/>
</template>
<style>
.p-image-preview-indicator{
  border: none;
  border-radius: 0px;
  background-color: #0000004a;
}
.p-image-mask{
  background-color: #0000004a;
  backdrop-filter: blur(10px);
}
.p-image-toolbar{
  margin-right: 1rem;
}
.p-image-action{
  width: 2rem;
  height: 2rem;
}
.p-image-action:hover{
  color: var(--primary);
}
</style>