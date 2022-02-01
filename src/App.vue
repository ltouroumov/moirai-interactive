<template>
  <SectionView v-for="sectionId in findSections" :sectionId="sectionId"/>
  <div>
    <button @click="createSection">Add Section</button>
  </div>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import {State} from "./data/state";
import SectionView from "./components/SectionView.vue";
import {useStore} from "vuex";
import {ElementType, Section} from "./data/model/element";
import {computed, onMounted} from "vue";

const store = useStore<State>()
const findSections = computed(() => store.getters.findChildrenIds('root'))

async function createSection() {
  const childCounter = await store.dispatch('genNextId', ElementType.Section)
  const childId = `${ElementType.Section}_${childCounter}`
  console.log("New Section", childId)
  store.commit('addObject', new Section(childId, "Foo", "Bar"))
  store.commit('addChild', {parentId: 'root', childId})
}

onMounted(() => {
  console.log("Reloading data from storage")
  const current = localStorage.getItem("project")
  if (current != null) {
    const stateJson = localStorage.getItem(`project/${current}`)
    if (stateJson !=  null) {
      const state = JSON.parse(stateJson)
      store.replaceState(state)
    }
  }
})
</script>

<style>
.sec-objects {
  border: 2px solid black;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 5px;
}
.sec-objects .sec-choices {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(auto-fill, 1fr);
  grid-auto-flow: row;
  grid-gap: 5px;
}

.sec-objects .sec-choices .choice {
  justify-self: stretch;
  align-self: stretch;
  border: 2px solid black;
  border-radius: 5px;
  padding: 5px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 5px;
}
</style>
