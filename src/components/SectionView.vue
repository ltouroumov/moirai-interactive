<template>
  <section class="section">
    <div class="sec-header">
      <span class="sec-header-id">{{ section.id }}</span>
      <input  class="sec-header-title" type="text" :value="section.title" @input="updateTitle">
      <textarea class="sec-header-text" :value="section.header" @input="updateHeader"></textarea>
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
  store.commit('addObject', new Choice(childId, `Choice ${childCounter}`, "Bar"))
  store.commit('addChild', {parentId: props.sectionId, childId})
}

async function deleteSection() {
  store.commit('removeObject', props.sectionId)
}

function updateTitle(evt?: InputEvent) {
  if (!evt || !evt.target) return

  store.commit('updateObject', {
    objectId: props.sectionId,
    data: {title: evt.target.value}
  })
}

function updateHeader() {

}

</script>

<style scoped>
.section {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto auto;
  grid-template-areas:
   "header tools"
   "choices tools"
   "footer tools";
}

.sec-header {
  grid-area: header;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-auto-flow: row;
  grid-row-gap: 5px;
}

.sec-choices {
  grid-area: choices;

  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: auto;
  grid-auto-flow: row;
  grid-gap: 5px;
  justify-items: stretch;
  align-items: stretch;
}

.sec-footer {
  grid-area: footer;
}

.sec-actions {
  grid-area: tools;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-auto-flow: row;
  grid-row-gap: 5px;
  align-content: start;
}
</style>