<template>
  <div class="toolbar">
    <button @click="createSection">Add Section</button>
    <button @click="clearSections">Clear</button>
    <router-link :to="{ name: 'home' }">Home</router-link>
  </div>
  <SectionView v-for="sectionId in findSections" :sectionId="sectionId"/>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import {RootState} from "../data/state";
import SectionView from "./editor/SectionView.vue";
import {useStore} from "vuex";
import {ElementType, Section} from "../data/model/element";
import {computed, onMounted, onUnmounted} from "vue";
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";

const route = useRoute()
const store = useStore<RootState>()
const findSections = computed(() => store.getters["database/findChildrenIds"]('root'))

async function createSection() {
  const childCounter = await store.dispatch('database/genNextId', ElementType.Section)
  const childId = `${ElementType.Section}_${childCounter}`
  console.log("New Section", childId)
  store.commit('database/addObject', new Section(childId, `Section ${childCounter}`, "Bar"))
  store.commit('database/addChild', {parentId: 'root', childId})
}

function clearSections() {
  store.commit('database/removeChildren', 'root')
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
    const projectData = store.getters["projects/findProject"](projectId)
    store.commit("database/setupProject", projectData)
  }
})
onUnmounted(() => {
  store.commit('database/unloadProject')
})
onBeforeRouteUpdate((to, from, next) => {
  console.log(`Route change from ${from} to ${to}`)
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 5px;
}
</style>
