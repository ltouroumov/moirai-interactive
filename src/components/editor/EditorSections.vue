<template>
  <h1>{{ page.title }} - Sections</h1>
  <div v-if="findSections && findSections.length > 0">
    <SectionView v-for="sectionId in findSections" :sectionId="sectionId"/>
  </div>
  <div v-if="!findSections || findSections.length === 0">
    <p>No Sections</p>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { computed, watch } from 'vue';
import SectionView from './SectionView.vue';
import { editorStoreKey } from "../../store/editor";
import { useRoute } from "vue-router";
import { Page, Section } from "../../data/model/element";

const route = useRoute()
const props = defineProps({
  pageId: String
});

const store = useStore(editorStoreKey)
const page = computed(() => store.getters['project/findElement'](props.pageId) as Page)
const findSections = computed(() => store.getters['project/findChildrenIds'](props.pageId) as Section[])
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