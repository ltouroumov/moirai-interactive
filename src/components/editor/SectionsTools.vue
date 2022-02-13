<template>
  <div class="btn-toolbar">
    <div class="btn-group">
      <button class="btn btn-primary" @click="createSection">
        <MdIcon name="layers-plus" />
        New Section
      </button>
      <button class="btn btn-primary" @click="createScore">
        <MdIcon name="numeric-9-plus-box" />
        New Score
      </button>
      <button class="btn btn-primary" @click="screateStyle">
        <MdIcon name="palette-swatch-outline" />
        New Style
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import MdIcon from "../utils/MdIcon.vue";
import { ElementType, Section } from "../../data/model/element";
import { useStore } from "vuex";
import { editorStoreKey } from "../../store/editor";

const store = useStore(editorStoreKey);

const props = defineProps({
  projectId: String,
  pageId: String
});

function createSection() {
  if (!props.pageId)
    return;

  store.dispatch("project/insertElement", {
    elementType: ElementType.Section,
    parentId: props.pageId,
    build: (sectionId: string, counter: number) => new Section(sectionId, `Section ${counter}`)
  });
}
</script>

<style scoped lang="scss">

</style>