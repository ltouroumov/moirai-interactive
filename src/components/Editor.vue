<template>
  <div class="toolbar">
    <nav class="nav nav-pills nav-fill editor-tabs">
      <router-link class="nav-link" :to="{ name: 'home' }">
        <mdi-icon name="chevron-left" />
        Home
      </router-link>
      <router-link class="nav-link" :to="{ name: 'edit_sections', params: $route.params }" active-class="active">
        <mdi-icon name="layers-triple" />
        Sections
      </router-link>
      <router-link class="nav-link" :to="{ name: 'edit_pages', params: $route.params }" active-class="active">
        <mdi-icon name="file-multiple" />
        Pages
      </router-link>
      <router-link class="nav-link" :to="{ name: 'edit_settings', params: $route.params }" active-class="active">
        <mdi-icon name="cog" />
        Settings
      </router-link>
    </nav>
    <div class="editor-actions">
      <div class="btn-toolbar">
        <div class="btn-group">
          <button class="btn btn-primary" @click="createSection">
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
import { onMounted, onUnmounted } from "vue";
import { onBeforeRouteUpdate, RouteLocationNormalizedLoaded, useRoute, useRouter } from "vue-router";
import { editorStoreKey } from "../store/editor";
import { homeStoreKey } from "../store/home";
import { ElementType, Section } from "../data/model/element";
import MdiIcon from "./utils/mdi-icon.vue";

const $router = useRouter();
const store = useStore(editorStoreKey);

async function createSection() {
  const childCounter = await store.dispatch("project/genNextId", ElementType.Section);
  const childId = `${ElementType.Section}_${childCounter}`;
  console.log("New Section", childId);
  store.commit("project/addObject", new Section(childId, `Section ${childCounter}`));
  store.commit("project/addChild", { parentId: "root", childId });
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

  if (route.name === "edit")
    $router.push({ name: "edit_sections", params: route.params });
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
