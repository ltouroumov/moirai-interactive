<template>
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
        <a :class="['nav-link', { disabled: !findPageIds || findPageIds.length === 0 }, 'dropdown-toggle']" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
          <mdi-icon name="layers-triple" />
          Sections
        </a>

        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <li v-for="pageId in findPageIds">
            <router-link class="dropdown-item" :to="{ name: 'edit_section', params: {...$route.params, pageId: pageId }}" active-class="active">
              {{ findPage(pageId).title }} / <span class="object-id">{{ pageId }}</span>
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
      <div class="btn-toolbar">
        <div class="btn-group">
          <button class="btn btn-primary" @click="createPage">
            <mdi-icon name="file-plus" />
            New Page
          </button>
          <button class="btn btn-primary" :class="{ disabled: $router.currentRoute.value.name !== 'edit_section' }" @click="createSection">
            <mdi-icon name="layers-plus" />
            New Section
          </button>
          <button class="btn btn-primary" @click="createScore">
            <mdi-icon name="numeric-9-plus-box" />
            New Score
          </button>
          <button class="btn btn-primary" @click="screateStyle">
            <mdi-icon name="palette-swatch-outline" />
            New Style
          </button>
        </div>
      </div>

    </div>
  </div>

  <router-view></router-view>
</template>

<script setup lang="ts">
// Imports
import { useStore } from "vuex";
import { computed, onMounted, onUnmounted } from "vue";
import { onBeforeRouteUpdate, RouteLocationNormalizedLoaded, useRoute, useRouter } from "vue-router";
import { editorStoreKey } from "../store/editor";
import { homeStoreKey } from "../store/home";
import { ElementType, Page, Section } from "../data/model/element";
import MdiIcon from "./utils/mdi-icon.vue";

const $router = useRouter();
const store = useStore(editorStoreKey);
const findPageIds = computed(() => store.getters['project/findChildrenIds']('__pages__') as string[])

function findPage(pageId: string) {
  return store.getters['project/findElement'](pageId) as Page
}

async function createPage() {
  const childCounter = await store.dispatch("project/genNextId", ElementType.Page);
  const childId = `${ElementType.Page}_${childCounter}`;
  console.log("New Page", childId);
  store.commit("project/addObject", new Page(childId, `Page ${childCounter}`));
  store.commit("project/addChild", { parentId: "__pages__", childId });
}

async function createSection() {
  if ($router.currentRoute.value.name !== 'edit_section')
    return

  const parentId = $router.currentRoute.value.params['pageId']

  const childCounter = await store.dispatch("project/genNextId", ElementType.Section);
  const childId = `${ElementType.Section}_${childCounter}`;
  console.log("New Section", childId);
  store.commit("project/addObject", new Section(childId, `Section ${childCounter}`));
  store.commit("project/addChild", { parentId, childId });
}

function reloadProject(route: RouteLocationNormalizedLoaded) {
  const projectId = route.params["project"];
  console.log(`Loading project ${projectId}`);

  const jsonData = localStorage.getItem(`projects/${projectId}`);
  if (jsonData) {
    const project = JSON.parse(jsonData);
    store.commit("project/loadProject", project);
    console.log("Loaded from storage");
  }
  if (!store.state.project.key) {
    console.log("Project requires setup");
    const homeStore = useStore(homeStoreKey);
    const projectData = homeStore.getters["findProject"](projectId);
    if (projectData) {
      store.commit("project/setupProject", projectData);
    } else {
      $router.push({ name: "home" });
    }
  }
}

onMounted(() => {
  const route = useRoute();
  reloadProject(route);
});
onUnmounted(() => {
  store.commit("project/unloadProject");
});
onBeforeRouteUpdate((to, from, next) => {
  console.log(`Route change`, from, to);
  if (from.params["project"] === to.params["project"])
    next();
  else
    reloadProject(to);
});
</script>

<style>
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
</style>
