<template>
  <div id="editor-main" v-if="_state.loaded">
    <div class="toolbar">
      <nav class="nav nav-pills nav-fill editor-tabs">
        <router-link class="nav-link" :to="{ name: 'home' }">
          <mdi-icon name="chevron-left" />
          Home
        </router-link>
        <router-link class="nav-link" :to="{ name: 'edit_pages', params: $route.params }" active-class="active">
          <mdi-icon name="file-multiple" />
          Pages
        </router-link>
        <div class="nav-item dropdown">
          <a :class="['nav-link', { disabled: !findPageIds || findPageIds.length === 0 }, 'dropdown-toggle']" href="#"
             role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
            <mdi-icon name="layers-triple" />
            Sections
          </a>

          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li v-for="pageId in findPageIds">
              <router-link class="dropdown-item"
                           :to="{ name: 'edit_section', params: {...$route.params, pageId: pageId }}"
                           active-class="active">
                {{ findPage(pageId).name }} / <span class="object-id">{{ pageId }}</span>
              </router-link>
            </li>
          </ul>
        </div>
        <router-link class="nav-link" :to="{ name: 'edit_settings', params: $route.params }" active-class="active">
          <mdi-icon name="cog" />
          Settings
        </router-link>
      </nav>
      <div class="editor-actions">
        <router-view name="tools"></router-view>
      </div>
    </div>
    <div id="editor-current">
      <router-view></router-view>
    </div>
  </div>
  <div id="editor-loader" v-else>
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
import MdiIcon from "./utils/mdi-icon.vue";
import { Project } from "../data/model/project";
import { sleep } from "./utils/time";

const _state = reactive({
  loaded: false
});

const props = defineProps({
  projectId: String,
  pageId: String
});

const $router = useRouter();
const store = useStore(editorStoreKey);
const project = computed(() => store.state.project as Project);
const findPageIds = computed(() => store.getters["project/findChildrenIds"]("__pages__") as string[]);

function findPage(pageId: string) {
  return store.getters["project/findElement"](pageId) as Page;
}

watch(
  () => props.projectId,
  (newValue) => {
    if (newValue) reloadProject(newValue);
  }
);

async function reloadProject(projectId: string) {
  console.log(`Loading project ${projectId}`);

  const homeStore = useStore(homeStoreKey);
  const projectInfo = homeStore.getters["findProject"](projectId);

  await store.dispatch("project/restoreProject", {
    projectId,
    projectInfo
  });
  await sleep(500);
}

onMounted(async () => {
  _state.loaded = false
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

#editor-current {
  padding: 5px;
}

#editor-loader {
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
