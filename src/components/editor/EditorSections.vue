<template>
<div>
  <SectionView v-for="sectionId in findSections" :sectionId="sectionId"/>
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