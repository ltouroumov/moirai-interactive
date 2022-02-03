<template>
  <section class="section">
    <div class="sec-header">
      <div class="sec-text">
        <input class="form-control sec-header-title" type="text" v-model="M_title">
        <div class="form-floating">
          <textarea class="form-control sec-header-text" v-model="M_headerText" placeholder="..."></textarea>
          <label>Header Text</label>
        </div>
        <div class="form-floating">
          <textarea class="form-control sec-header-text" v-model="M_footerText" placeholder="..."></textarea>
          <label>Footer Text</label>
        </div>
      </div>
      <div class="sec-conditions">
        <b>Conditions</b>
        <div v-for="cond in section.conditions">IF {{ cond.test }} THEN {{ cond.state }}</div>
      </div>
      <div class="sec-style">
        <b>Style</b>
        <select class="form-select sec-style-select" v-model="M_style_name">
          <option v-for="style in styles" :value="style">{{ style }}</option>
        </select>
        <div class="sec-grid">
          <label>Direction</label>
          <select class="form-select sec-style-dir span3" v-model="M_gridFlow">
            <option>row</option>
            <option>column</option>
          </select>
          <label>Columns</label>
          <input class="form-control sec-grid-cols" type="text" v-model="M_gridCols" />
          <label>Rows</label>
          <input class="form-control sec-grid-rows" type="text" v-model="M_gridRows" />
          <label>Default Width</label>
          <input class="form-control sec-grid-cols" type="text" v-model="M_gridDefaultColSpan" />
          <label>Default Height</label>
          <input class="form-control sec-grid-rows" type="text" v-model="M_gridDefaultRowSpan" />
        </div>
      </div>
      <div class="sec-meta">
        <b>Choices</b>
        <label>Maximum Selected</label>
        <input class="form-control" type="number" />
      </div>
    </div>
    <div class="sec-choices" :style="choicesContainerStyle">
      <ChoiceView v-for="choiceId in choices" :choiceId="choiceId" :defaultStyle="defaultChoiceStyle" />
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
import { updatePropsFor } from "../utils/props";
import { editorStoreKey } from "../../store/editor";
import MdiIcon from "../utils/mdi-icon.vue";
import { Condition } from "../../data/model";
import * as P from "ts-pattern";
import * as R from "ramda";
import { ChoiceStyle, DefaultChoiceStyle, DefaultSectionStyle, SectionStyle } from "../../data/model/style";

const store = useStore(editorStoreKey);

const props = defineProps({
  sectionId: String
});

const section = computed(() => store.getters["project/findElement"](props.sectionId) as Section);
const choices = computed(() => store.getters["project/findChildrenIds"](props.sectionId) as Choice[]);
const styles = computed(() => ["default", "Style 1", "Style 2"]);
const {
  M_title,
  M_headerText,
  M_footerText,
  style: { M_name: M_style_name, M_gridCols, M_gridRows, M_gridFlow, M_gridDefaultColSpan, M_gridDefaultRowSpan }
} = updatePropsFor(store, {
  type: Section,
  prop: section,
  objectId: () => props.sectionId
});

const EMPTY = R.always<object>({});
const choicesContainerStyle = computed(() => {
  return R.mergeAll([
    P.match<string | undefined>(section.value.style.gridCols)
      .with(undefined, EMPTY)
      .when(R.match(/^\d+$/), (numCols) => {
        return { "grid-template-columns": `repeat(${numCols}, 1fr)` };
      })
      .otherwise(EMPTY),
    P.match<string | undefined>(section.value.style.gridRows)
      .with(undefined, EMPTY)
      .when(R.match(/^\d+$/), (numCols) => {
        return { "grid-template-rows": `repeat(${numCols}, 1fr)` };
      })
      .otherwise(EMPTY),
    P.match<string | undefined>(section.value.style.gridFlow)
      .with(undefined, EMPTY)
      .when(R.match(/^row|column$/), (flow) => {
        return { "grid-auto-flow": flow };
      })
      .otherwise(EMPTY)
  ]);
});
const defaultChoiceStyle = computed(() => {
  return R.mergeAll([
    DefaultChoiceStyle,
    P.match<number | string | undefined>(section.value.style.gridDefaultColSpan)
      .with(undefined, EMPTY)
      .with(P.__.number, (colSpan) => {
        return { colSpan };
      })
      .when(R.match(/^\d+$/), (colSpan: string) => {
        return { colSpan: Number.parseInt(colSpan) };
      })
      .otherwise(EMPTY),
    P.match<number | string | undefined>(section.value.style.gridDefaultRowSpan)
      .with(undefined, EMPTY)
      .with(P.__.number, (rowSpan) => {
        return { rowSpan };
      })
      .when(R.match(/^\d+$/), (rowSpan: string) => {
        return { rowSpan: Number.parseInt(rowSpan) };
      })
      .otherwise(EMPTY)
  ]);
});

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

<style scoped lang="less">
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
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto;
  grid-gap: 5px;

  grid-template-areas:
    "text cond style"
    "text cond meta";

  .sec-text {
    grid-area: text;

    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    grid-auto-flow: row;
    align-content: start;
    grid-gap: 5px;
  }

  .sec-conditions {
    grid-area: cond;
  }

  .sec-style {
    grid-area: style;

    display: grid;
    grid-template-columns: 1fr;
    grid-auto-flow: row;
    grid-gap: 5px;

    .sec-style-select {
      grid-area: span 1 / span 2;
    }

    .sec-grid {

      display: grid;
      grid-template-columns: auto 1fr auto 1fr;
      grid-auto-flow: row;
      grid-gap: 5px;
      align-items: center;

      .span3 {
        grid-area: span 1 / span 3;
      }
    }
  }

  .sec-meta {
    grid-area: meta;
  }
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

  .sec-id {
    grid-column: 1 / span 2;
    font-family: monospace;
  }
}

</style>