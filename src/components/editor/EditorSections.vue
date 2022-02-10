<template>
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

const route = useRoute()
const props = defineProps({
  pageId: String
});

const store = useStore(editorStoreKey)
const findSections = computed(() => store.getters['project/findChildrenIds'](props.pageId))
</script>

<style scoped>

</style>