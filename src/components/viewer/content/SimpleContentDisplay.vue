<template>
  <div>
    <span class="content-title">{{ content.title }}</span>
    <img :src="resolveMedia(content.image)" v-if="content.image" />
    <div class="content-body" v-html="contentHtml"></div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { editorStoreKey } from "../../../store/editor";
import { AnyElement } from "../../../data/model/element";
import { SimpleContent } from "../../../data/model/content";
import { computed, ref } from "vue";
import * as R from "ramda";
import { marked } from "marked";

const store = useStore(editorStoreKey);
const props = defineProps({
  objectId: { type: String, required: true },
  contentProp: { type: String, required: true }
});

const content = computed(() => {
  const element = store.getters["project/findElement"](props.objectId) as AnyElement;
  return R.view(R.lensProp(props.contentProp), element) as SimpleContent;
});
const contentHtml = computed(() => {
  return marked.parse(content.value.body);
});

function resolveMedia(image: string) {
  return "#";
}
</script>

<style scoped lang="scss">

</style>