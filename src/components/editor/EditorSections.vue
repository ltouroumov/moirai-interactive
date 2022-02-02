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
import { computed } from 'vue';
import SectionView from './SectionView.vue';
import { editorStoreKey } from "../../store/editor";

const store = useStore(editorStoreKey)
const findSections = computed(() => store.getters['project/findChildrenIds']('root'))
</script>

<style scoped>

</style>