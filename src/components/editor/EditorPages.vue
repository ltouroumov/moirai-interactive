<template>
  <h1>Pages</h1>
  <div v-if="findPages && findPages.length > 0">
    <PageView v-for="pageId in findPages" :pageId="pageId" />
  </div>
  <div v-if="!findPages || findPages.length === 0">
    <p>No Pages</p>
  </div>

</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { computed, watch } from "vue";
import SectionView from "./SectionView.vue";
import { editorStoreKey } from "../../store/editor";
import { useRoute } from "vue-router";
import PageView from "./PageView.vue";

const props = defineProps({
  projectId: String,
  pageId: String
});
const store = useStore(editorStoreKey);
const findPages = computed(() => store.getters["project/findChildrenIds"]("__pages__"));
</script>

<style scoped>
h1 {
  text-align: center;
  margin-top: 10px;
  background: #6c757d;
  padding: 5px;
  border-radius: 5px;
}

</style>