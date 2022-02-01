<template>
  <div class="toolbar">
    <button @click="createSection">Add Section</button>
    <button @click="clearSections">Clear</button>
  </div>
  <SectionView v-for="sectionId in findSections" :sectionId="sectionId"/>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import {State} from "../data/state";
import SectionView from "./SectionView.vue";
import {useStore} from "vuex";
import {ElementType, Section} from "../data/model/element";
import {computed, onMounted} from "vue";

const store = useStore<State>()
const findSections = computed(() => store.getters.findChildrenIds('root'))

async function createSection() {
  const childCounter = await store.dispatch('genNextId', ElementType.Section)
  const childId = `${ElementType.Section}_${childCounter}`
  console.log("New Section", childId)
  store.commit('addObject', new Section(childId, `Section ${childCounter}`, "Bar"))
  store.commit('addChild', {parentId: 'root', childId})
}

function clearSections() {
  store.commit('removeChildren', 'root')
}

onMounted(() => {
  console.log("Reloading data from storage")
  const current = localStorage.getItem("project")
  if (current != null) {
    const stateJson = localStorage.getItem(`project/${current}`)
    if (stateJson != null) {
      const state = JSON.parse(stateJson)
      store.replaceState(state)
    }
  }
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
