<template>
  <section class="section">
    <div class="sec-header">
      <input class="form-control sec-header-title" type="text" :value="section.title"
             @input="updateProp('title', $event)">
      <textarea class="form-control sec-header-text" :value="section.header"
                @input="updateProp('header', $event)"></textarea>
      <div class="sec-conditions" v-if="section.conditions && section.conditions.length > 0">
        <b>Conditions</b>
        <div v-for="cond in section.conditions">IF {{ cond.test }} THEN {{ cond.state }}</div>
      </div>
    </div>
    <div class="sec-choices">
      <ChoiceView v-for="choiceId in choices" :choiceId="choiceId" />
    </div>
    <div class="sec-footer" v-if="section.footer">
      {{ section.footer }}
    </div>
    <div class="sec-actions">
      <span class="sec-id">{{ section.id }}</span>
      <button class="btn btn-sm btn-outline-primary" @click="createChoice">
        <mdi-icon name="plus-circle" />
      </button>
      <button class="btn btn-sm btn-outline-primary" @click="addCondition">
        <mdi-icon name="key-plus" />
      </button>
      <button class="btn btn-sm btn-outline-danger" @click="deleteSection">
        <mdi-icon name="delete-outline" />
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Choice, ElementType, Section } from "../../data/model/element";
import ChoiceView from "./ChoiceView.vue";
import { useStore } from "vuex";
import { computed } from "vue";
import { updatePropFor } from "../utils";
import { editorStoreKey } from "../../store/editor";
import MdiIcon from "../utils/mdi-icon.vue";
import { Condition } from "../../data/model";

const store = useStore(editorStoreKey);

const props = defineProps({
  sectionId: String
});

const section = computed(() => store.getters["project/findElement"](props.sectionId) as Section);
const choices = computed(() => store.getters["project/findChildrenIds"](props.sectionId) as Choice[]);

const updateProp = updatePropFor(store, () => props.sectionId);

async function createChoice() {
  const childCounter = await store.dispatch("project/genNextId", ElementType.Choice);
  const childId = `${ElementType.Choice}_${childCounter}`;
  console.log("New Choice", childId);
  store.commit("project/addObject", new Choice(childId, `Choice ${childCounter}`, "Bar"));
  store.commit("project/addChild", { parentId: props.sectionId, childId });
}

function addCondition() {
  store.commit("project/addCondition", {
    objectId: props.sectionId,
    data: new Condition("always", "enabled")
  });
}

async function deleteSection() {
  store.commit("project/removeObject", props.sectionId);
}

</script>

<style scoped>
.section {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto auto;
  grid-template-areas:
   "header tools"
   "choices choices"
   "footer footer";
  grid-gap: 5px;

  padding: 5px 0;
  margin-bottom: 10px;
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
  grid-template-columns: repeat(4, 1fr);
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
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-auto-flow: row;
  grid-gap: 5px;
  align-content: start;

  background: lightgray;
  border-radius: 5px;
  padding: 5px;
}

.sec-actions .sec-id {
  grid-column: 1 / span 2;
}

.sec-id {
  font-family: monospace;
}
</style>