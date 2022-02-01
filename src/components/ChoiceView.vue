<template>
  <div class="choice">
    <div class="ch-header">
      <h2 class="ch-title">{{ choice.title }}</h2>
      <div class="ch-conditions"></div>
      <div class="ch-scores"></div>
      <div class="ch-text">{{ choice.text }}</div>
    </div>
    <div class="ch-options" v-if="options && options.length > 0">
      <OptionView v-for="optionId in options" :optionId="optionId"/>
    </div>
    <div class="ch-actions">
      <button @click="createOption">Add Option</button>
      <button @click="deleteChoice">Delete</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Choice, ElementType, Option} from "../data/model/element";
import OptionView from "./OptionView.vue";
import {useStore} from "vuex";
import {State} from "../data/state";
import {computed} from "vue";

const store = useStore<State>()

const props = defineProps({
  choiceId: String
})

const choice = computed(() => store.getters.findElement(props.choiceId) as Choice)
const options = computed(() => store.getters.findChildrenIds(props.choiceId) as Option[])

async function createOption() {
  const childCounter = await store.dispatch('genNextId', ElementType.Option)
  const childId = `${ElementType.Option}_${childCounter}`
  console.log("New Choice", childId)
  store.commit('addObject', new Option(childId, `Option ${childCounter}`, "Bar",))
  store.commit('addChild', {parentId: props.choiceId, childId})
}

async function deleteChoice() {
  store.commit('removeObject', props.choiceId)
}

</script>

<style scoped>
.choice {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto;
  grid-template-areas:
   "header tools"
   "options tools";
}

.ch-header {
  grid-area: header;
}
.ch-options {
  grid-area: options;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-auto-flow: row;
  grid-row-gap: 5px;
}
.ch-actions {
  grid-area: tools;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-auto-flow: row;
  grid-row-gap: 5px;
  align-content: start;
}

</style>