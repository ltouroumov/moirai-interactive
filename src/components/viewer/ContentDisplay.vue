<script lang="ts">
import SimpleContentDisplay from "./content/SimpleContentDisplay.vue";
import { AnyContent, ContentType } from "../../data/model/content";
import { match } from "ts-pattern";
import { computed, defineComponent, h, toRefs } from "vue";
import { AnyElement } from "../../data/model/element";
import { useStore } from "vuex";
import { editorStoreKey } from "../../store/editor";
import * as R from "ramda";


export default defineComponent({
  name: "ContentDisplay",
  components: { SimpleContentDisplay },
  props: {
    objectId: { type: String, required: true },
    contentProp: { type: String, required: true },
  },
  setup(props) {
    const store = useStore(editorStoreKey);
    const { objectId, contentProp } = toRefs(props);
    const contentType = computed(() => {
      const element = store.getters["project/findElement"](objectId.value) as AnyElement;
      const content = R.view(R.lensProp(contentProp.value), element) as AnyContent | undefined;
      return content?.type || ContentType.Empty;
    });
    return {
      contentType
    };
  },
  render() {
    return match<ContentType>(this.contentType)
      .with(ContentType.Empty, () => null)
      .with(ContentType.Simple, () => h(SimpleContentDisplay, { class: "editor-view", ...this.$props }))
      .exhaustive();
  }
});
</script>

<style scoped lang="scss">
.content-editor {
  display: grid;
  grid-gap: 5px;
  grid-template:
   "name type" auto
   "view view" 1fr
   / 1fr minmax(100px, auto);

  .editor-name {
    display: block;
    font-weight: bold;
    grid-area: name;
    align-self: center;
  }

  .content-type {
    grid-area: type;
  }

  .editor-view {
    grid-area: view;
  }
}
</style>
