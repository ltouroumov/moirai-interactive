<template>
  <div class="btn-toolbar">
    <div class="btn-group">
      <button class="btn btn-primary" @click="createPage">
        <mdi-icon name="file-plus" />
        New Page
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import MdiIcon from "../utils/mdi-icon.vue";
import { ElementType, Page } from "../../data/model/element";
import { useStore } from "vuex";
import { editorStoreKey } from "../../store/editor";

const store = useStore(editorStoreKey);

const props = defineProps({
  projectId: String
});

function createPage() {
  store.dispatch("project/insertElement", {
    elementType: ElementType.Page,
    parentId: "__pages__",
    build: (pageId: string, counter: number) => new Page(pageId, `Page ${counter}`)
  });
}
</script>

<style scoped lang="scss">

</style>