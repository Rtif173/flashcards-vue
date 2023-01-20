<script>
import { marked } from 'marked';
import { h } from 'vue';
import H1 from './Markdown/H1.vue';
import H2 from './Markdown/H2.vue';
import H3 from './Markdown/H3.vue';
import H4 from './Markdown/H4.vue';
import H5 from './Markdown/H5.vue';
import H6 from './Markdown/H6.vue';
import P from './Markdown/P.vue';

export default {
  props: {
    markdown: {
      required: true,
    },
  },
  render() {
    const tokens = marked.lexer(this.markdown);
    console.log(this.markdown, tokens, marked.parse(this.markdown));
    const elems = [];
    for (const token of tokens) {
      let elem;
      switch (token.type) {
        case "heading":
          switch (token.depth) {
            case 1:
            elem = h(H1, { text: token.text });
              break;
            case 2:
            elem = h(H2, { text: token.text });
              break;
            case 3:
            elem = h(H3, { text: token.text });
              break;
            case 4:
            elem = h(H4, { text: token.text });
              break;
            case 5:
            elem = h(H5, { text: token.text });
              break;
            case 6:
            elem = h(H6, { text: token.text });
              break;
            default:
              break;
          }
          elems.push(elem);
          break;
        case "paragraph":
          elem = h(P, {tokens: token.tokens})
          elems.push(elem);
          break;
        default:
          console.log("not Defined", token);
          break;
      }
    }
    return h("div", {class: 'md'}, elems)
  }
};
</script>
<style scoped>
.md *:last-child{
  margin-bottom: 0px;
}
</style>