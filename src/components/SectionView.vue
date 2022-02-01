<template>
  <section class="sec-objects">
    <div class="sec-header">
      <h1>{{ section.title }}</h1>
      <div>{{ section.header }}</div>
    </div>
    <div class="sec-choices">
      <ChoiceView v-for="choiceId in choices" :choiceId="choiceId"/>
    </div>
    <div class="sec-footer" v-if="section.footer">
      {{ section.footer }}
    </div>
    <div class="sec-actions">
      <button @click="createChoice">Add Choice</button>
      <button @click="deleteSection">Delete</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import {Choice, ElementType, Section} from "../data/model/element";
import ChoiceView from "./ChoiceView.vue";
import {useStore} from "vuex";
import {State} from "../data/state";
import {computed} from "vue";

const store = useStore<State>()

const props = defineProps({
  sectionId: String
})

const section = computed(() => store.getters.findElement(props.sectionId) as Section)
const choices = computed(() => store.getters.findChildrenIds(props.sectionId) as Choice[])

async function createChoice() {
  const childCounter = await store.dispatch('genNextId', ElementType.Choice)
  const childId = `${ElementType.Choice}_${childCounter}`
  console.log("New Choice", childId)
  store.commit('addObject', new Choice(childId, "Foo", "Bar", []))
  store.commit('addChild', {parentId: props.sectionId, childId})
}
async function deleteSection() {
  store.commit('removeObject', props.sectionId)
}

</script>

<style scoped>

</style>