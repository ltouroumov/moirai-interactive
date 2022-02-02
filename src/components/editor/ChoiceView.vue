<template>
  <div class="choice">
    <div class="ch-header">
      <input class="form-control ch-title" :value="choice.title" @input="updateProp('title', $event)"/>
      <div class="ch-conditions" v-if="choice.conditions"></div>
      <div class="ch-scores" v-if="choice.scores"></div>
      <textarea class="form-control ch-text" :value="choice.text" @input="updateProp('text', $event)"></textarea>
    </div>
    <div class="ch-options" v-if="options && options.length > 0">
      <OptionView v-for="optionId in options" :optionId="optionId"/>
    </div>
    <div class="ch-actions">
      <span class="ch-id">{{ choice.id }}</span>
      <button class="btn btn-sm btn-outline-primary" @click="createOption">
        <mdi-icon name="plus-circle" />
      </button>
      <button class="btn btn-sm btn-outline-danger" @click="deleteChoice">
        <mdi-icon name="delete-outline" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Choice, ElementType, Option } from '../../data/model/element';
import OptionView from './OptionView.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';
import { updatePropFor } from '../utils';
import { editorStoreKey } from "../../store/editor";
import MdiIcon from "../utils/mdi-icon.vue";

const store = useStore(editorStoreKey)

const props = defineProps({
  choiceId: String
})

const choice = computed(() => store.getters['project/findElement'](props.choiceId) as Choice)
const options = computed(() => store.getters['project/findChildrenIds'](props.choiceId) as Option[])

const updateProp = updatePropFor(store, () => props.choiceId)

async function createOption() {
  const childCounter = await store.dispatch('project/genNextId', ElementType.Option)
  const childId = `${ElementType.Option}_${childCounter}`
  console.log('New Choice', childId)
  store.commit('project/addObject', new Option(childId, `Option ${childCounter}`, 'Bar',))
  store.commit('project/addChild', { parentId: props.choiceId, childId })
}

async function deleteChoice() {
  store.commit('project/removeObject', props.choiceId)
}

</script>

<style scoped>
.choice {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto 1fr;
  grid-template-areas:
   "header tools"
   "options options";
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
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-auto-flow: row;
  grid-gap: 5px;
  align-content: start;

  background: lightgray;
  border-radius: 5px;
  padding: 5px;
}

.ch-actions .ch-id {
  grid-column: 1 / span 2;
}

.ch-id {
  font-family: monospace;
}
</style>