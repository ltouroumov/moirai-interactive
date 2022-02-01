<template>
  <div class="choice">
    <div class="ch-header">
      <input class="ch-title" :value="choice.title" @input="updateProp('title', $event)"/>
      <div class="ch-conditions" v-if="choice.conditions"></div>
      <div class="ch-scores" v-if="choice.scores"></div>
      <textarea class="ch-text" :value="choice.text" @input="updateProp('text', $event)"></textarea>
    </div>
    <div class="ch-options" v-if="options && options.length > 0">
      <OptionView v-for="optionId in options" :optionId="optionId"/>
    </div>
    <div class="ch-actions">
      <span class="ch-id">{{ choice.id }}</span>
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
import {updatePropFor} from "./utils";

const store = useStore<State>()

const props = defineProps({
  choiceId: String
})

const choice = computed(() => store.getters.findElement(props.choiceId) as Choice)
const options = computed(() => store.getters.findChildrenIds(props.choiceId) as Option[])

const updateProp = updatePropFor(store, () => props.choiceId)

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
  grid-template-rows: auto auto 1fr;
  grid-template-areas:
   "header tools"
   "options tools"
   "_fill_ tools";
  grid-gap: 5px;

  border: grey solid 1px;
  border-radius: 5px;
  padding: 5px;
}

.ch-header {
  grid-area: header;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-auto-flow: row;
  grid-row-gap: 5px;
}

.ch-options {
  grid-area: options;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-auto-flow: row;
  grid-row-gap: 5px;
  align-content: start;

  border-top: 1px solid grey;
  padding-top: 5px;
}

.ch-actions {
  grid-area: tools;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-auto-flow: row;
  grid-row-gap: 5px;
  align-content: start;

  background: lightgray;
  border-radius: 5px;
  padding: 5px;
}

.ch-id {
  font-family: monospace;
}
</style>