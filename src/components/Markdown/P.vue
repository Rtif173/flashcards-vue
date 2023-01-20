<script>
import { h } from 'vue';
import Text from './Text.vue';
import Img from './Img.vue';
import Em from './Em.vue';
import Strong from './Strong.vue';
import Html from './Html.vue';

function renderP(tokens) {
  const elems = [];
  console.log('tokens: ', tokens);
  for (const token of tokens) {
    let elem;
    console.log(token.type);
    switch (token.type) {
      case "text":
        elem = h(Text, { text: token.text })
        break;
      case "image":
        elem = h(Img, { href: token.href, text: token.text, title: token.title });
        break;
      case "em":
        elem = h(Em, { tokens: token.tokens })
        break;
      case "strong":
        elem = h(Strong, { text: token.text })
        break;
      case "html":
        elem = h(Html, { text: token.text })
        break;
      case "paragraph":
        console.log("paragraph", token.tokens)
        elem = renderP(token.tokens);
        break;
      default:
        break;
    }
    elems.push(elem);
  }
  return h("p", elems)
}
export default {
  props: {
    tokens: {
      required: true,
    },
  },
  render() {
    console.log("P:", this.tokens)
    const vnodes = renderP(this.tokens);
    return vnodes
  }
}
</script>