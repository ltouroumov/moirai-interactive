<script lang="ts">
import EmptyContentView from "./content/EmptyContentView.vue";
import SimpleContentView from "./content/SimpleContentView.vue";
import { AnyContent, ContentType } from "../../data/model/content";
import { match } from "ts-pattern";
import { computed, defineComponent, h, toRefs } from "vue";
import { AnyElement } from "../../data/model/element";
import { useStore } from "vuex";
import { editorStoreKey } from "../../store/editor";
import * as R from "ramda";


export default defineComponent({
  name: "ContentView",
  components: { EmptyContentView, SimpleContentView },
  props: {
    objectId: { type: String, required: true },
    contentProp: { type: String, required: true },
    name: { type: String, required: true }
  },
  setup(props) {
    const store = useStore(editorStoreKey);
    const { objectId, contentProp } = toRefs(props);
    const contentType = computed({
      get: () => {
        const element = store.getters["project/findElement"](objectId.value) as AnyElement
        const content = R.view(R.lensProp(contentProp.value), element) as AnyContent | undefined;
        return content?.type || ContentType.Empty;
      },
      set: (value: ContentType) => {
        store.commit("project/updateObject", {
          objectId: objectId.value,
          path: [contentProp.value],
          data: { type: value },
          replace: true
        });
      }
    });
    return {
      contentType
    };
  },
  render() {
    return h("div", { class: "content-editor" }, [
      h("span", { class: "editor-name" }, this.$props.name),
      h("select", {
        class: "form-select content-type",
        value: this.contentType,
        onChange: (evt: Event) => {
          console.log("Select Changed", evt);
          this.contentType = (evt.target as HTMLSelectElement).value as ContentType;
        }
      }, Object.values(ContentType).map((key) => {
        return h("option", { value: key }, key);
      })),
      match<ContentType>(this.contentType)
        .with(ContentType.Empty, () => h(EmptyContentView, { class: "editor-view", ...this.$props }))
        .with(ContentType.Simple, () => h(SimpleContentView, { class: "editor-view", ...this.$props }))
        .exhaustive()
    ]);
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
