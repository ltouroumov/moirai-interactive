<template>
  <div class="toolbar">
    <nav class="nav nav-pills nav-fill editor-tabs">
      <router-link class="nav-link" :to="{ name: 'home' }">
        <font-awesome-icon icon="home" /> Home
      </router-link>
      <router-link class="nav-link" :to="{ name: 'edit_sections', params: $route.params }" active-class="active">
        Sections
      </router-link>
      <router-link class="nav-link" :to="{ name: 'edit_pages', params: $route.params }" active-class="active">
        Pages
      </router-link>
      <router-link class="nav-link" :to="{ name: 'edit_settings', params: $route.params }" active-class="active">
        Settings
      </router-link>
    </nav>
    <div class="editor-actions">
      <button class="btn btn-primary" @click="createSection">
        <font-awesome-icon :icon="['far', 'plus-square']" /> Add Section
      </button>
    </div>
  </div>

  <router-view></router-view>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { RootState } from '../data/state';
import SectionView from './editor/SectionView.vue';
import { useStore } from 'vuex';
import { ElementType, Section } from '../data/model/element';
import { computed, onMounted, onUnmounted } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';

const route = useRoute()
const store = useStore<RootState>()
const findSections = computed(() => store.getters['database/findChildrenIds']('root'))

async function createSection() {
  const childCounter = await store.dispatch('database/genNextId', ElementType.Section)
  const childId = `${ElementType.Section}_${childCounter}`
  console.log('New Section', childId)
  store.commit('database/addObject', new Section(childId, `Section ${childCounter}`, 'Bar'))
  store.commit('database/addChild', { parentId: 'root', childId })
}

onMounted(() => {
  const projectId = route.params['project']
  console.log(`Loading project ${projectId}`)

  const jsonData = localStorage.getItem(`vuex/projects/${projectId}`)
  if (jsonData) {
    const project = JSON.parse(jsonData)
    store.commit('database/loadProject', project)
  }
  if (!store.state.database.key) {
    const projectData = store.getters['projects/findProject'](projectId)
    store.commit('database/setupProject', projectData)
  }
})
onUnmounted(() => {
  store.commit('database/unloadProject')
})
onBeforeRouteUpdate((to, from, next) => {
  console.log(`Route change`, from, to)
  next()
})
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

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 5px;
}
</style>
