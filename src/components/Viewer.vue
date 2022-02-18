<template>
  <div id="viewer-main" v-if="_state.loaded">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <div class="navbar-nav me-auto mb-2 mb-lg-0">
          <a class="nav-link btn btn-link"
             :class="{ active: _state.topPageId === pageId }"
             v-for="pageId in topPageIds"
             @click.prevent="showPage(pageId)">
            {{ findPage(pageId).name }}
          </a>
        </div>
        <div class="mb-2 mb-lg-0">
          <span class="points-display">
            <span class="points-entry">Shard Points: <span class="points-value">100 SP</span></span>
            <span class="points-entry">Character Points: <span class="points-value">100 CP</span></span>
          </span>
        </div>
      </div>
    </nav>
    <TopPageDisplay :page-id="_state.topPageId" v-if="_state.topPageId" />
  </div>
  <div id="viewer-loader" v-else>
    <div class="loader">
      <div class="spinner-border" style="width: 5rem; height: 5rem;" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p>Loading Project ...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Imports
import { useStore } from "vuex";
import { computed, onMounted, onUnmounted, reactive, watch } from "vue";
import { onBeforeRouteUpdate, RouteLocationNormalizedLoaded, useRoute, useRouter } from "vue-router";
import { editorStoreKey } from "../store/editor";
import { homeStoreKey } from "../store/home";
import { Choice, ElementType, Page, Section } from "../data/model/element";
import MdIcon from "./utils/MdIcon.vue";
import { Project } from "../data/model/project";
import { sleep } from "./utils/time";
import TopPageDisplay from "./viewer/TopPageDisplay.vue";
import { reloadProject } from "../store/utils";

const _state = reactive<{
  loaded: boolean,
  topPageId: string | undefined
}>({
  loaded: false,
  topPageId: undefined
});

const props = defineProps({
  projectId: String
});

const store = useStore(editorStoreKey);
const project = computed(() => store.state.project as Project);
const topPageIds = computed(() => store.getters["project/findChildrenIds"]("__pages__") as string[]);

function findPage(pageId: string) {
  return store.getters["project/findElement"](pageId) as Page;
}

function showPage(pageId: string) {
  _state.topPageId = pageId
}

watch(
  () => props.projectId,
  (newValue) => {
    if (newValue) reloadProject(newValue);
  }
);

onMounted(async () => {
  _state.loaded = false;
  if (props.projectId) {
    await Promise.all([
      reloadProject(props.projectId),
      sleep(200)
    ]);
    _state.loaded = true;
  }
});
onUnmounted(() => {
  store.commit("project/unloadProject");
});
</script>

<style lang="scss">
div.toolbar {
  padding: 5px;
  background: lightgray;
  border-bottom: 1px solid grey;

  display: grid;
  grid-template-columns: [nav] auto 1fr [actions] auto;
  justify-content: center;
}

div.toolbar .editor-tabs {
  grid-column: nav / span 1;
}

div.toolbar .editor-actions {
  grid-column: actions / span 1;
}


#viewer-main {
  flex-grow: 1;

  display: flex;
  flex-direction: column;


  #editor-current {
    padding: 5px;
    flex-grow: 1;
  }
}

#viewer-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  div.loader {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 10px;
  }
}
</style>
