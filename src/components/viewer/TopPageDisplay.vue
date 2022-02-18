<template>
  <div class="top-page-display">
    <ContentDisplay :object-id="props.pageId" content-prop="headerContent" />
    <ContentDisplay :object-id="props.pageId" content-prop="footerContent" />
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { editorStoreKey } from "../../store/editor";
import { computed } from "vue";
import { Page } from "../../data/model/element";
import ContentDisplay from "./ContentDisplay.vue";

const props = defineProps({
  pageId: { type: String, required: true }
});

const store = useStore(editorStoreKey);
const page = computed(() => store.getters["project/findElement"](props.pageId) as Page);
</script>

<style scoped>

</style>