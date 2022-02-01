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
import { RootState } from '../../data/state';
import { computed } from 'vue';
import SectionView from './SectionView.vue';

const store = useStore<RootState>()
const findSections = computed(() => store.getters['database/findChildrenIds']('root'))
</script>

<style scoped>

</style>