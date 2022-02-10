<template>

  <div v-for="pageId in findPages">
    {{ pageId }}
  </div>

</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { computed, watch } from 'vue';
import SectionView from './SectionView.vue';
import { editorStoreKey } from "../../store/editor";
import { useRoute } from "vue-router";

const store = useStore(editorStoreKey)
const findPages = computed(() => store.getters['project/findChildrenIds']("__pages__"))
</script>

<style scoped>

</style>