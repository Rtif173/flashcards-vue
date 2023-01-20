<script>
import { h } from 'vue';
import Strong from './Strong.vue';
import Text from './Text.vue';

export default {
  props: {
    tokens: {
      required: true,
    },
  },
  render(){
    const elems = [];
    for(const token of this.tokens){
      let elem;
      switch(token.type){
        case "text":
          elem = h(Text, {text: token.text})
          break;
        case "strong":
          elem = h(Strong, {text: token.text})
          break;
      }
      elems.push(elem);
    }
    return h("em", elems)
  }
}
</script>