<template>
  <section class="section">
    <div class="sec-actions">
      <button class="btn btn-sm btn-link" @click="toggleSection">
        <mdi-icon name="eye" v-show="_state.collapsed" />
        <mdi-icon name="eye-off" v-show="!_state.collapsed" />
      </button>
      <button class="btn btn-sm btn-link" @click="moveSection('prev')">
        <mdi-icon name="arrow-up" />
      </button>
      <button class="btn btn-sm btn-link" @click="moveSection('next')">
        <mdi-icon name="arrow-down" />
      </button>
      <span class="object-id">{{ section.id }}</span>
      <div class="btn-toolbar">
        <div class="btn-group me-2">
          <button class="btn btn-sm btn-outline-primary" @click="createChoice">
            <mdi-icon name="plus-circle" />
            Choice
          </button>
        </div>
        <div class="btn-group me-2">
          <button class="btn btn-sm btn-outline-primary" data-bs-toggle="modal"
                  :data-bs-target="`#cond_${props.sectionId}`">
            <mdi-icon name="key" />
            Requirements
          </button>
          <button type="button" class="btn btn-sm btn-outline-primary" data-bs-toggle="modal"
                  :data-bs-target="`#style_${props.sectionId}`">
            <mdi-icon name="palette-swatch" />
            Style
          </button>
        </div>
        <div class="btn-group">
          <button class="btn btn-sm btn-outline-danger wide" @click="deleteSection">
            <mdi-icon name="delete-outline" />
          </button>
        </div>
      </div>
    </div>
    <div class="sec-header" v-if="!_state.collapsed">
      <div class="sec-text">
        <input class="form-control sec-title" type="text" v-model="M_name">
        <ContentView :object-id="props.sectionId" content-prop="headerContent" name="Section Header" />
        <ContentView :object-id="props.sectionId" content-prop="footerContent" name="Section Footer" />
      </div>
      <div class="sec-meta">
        <b>Choices</b>
        <label>Maximum Selected</label>
        <input class="form-control" type="number" />
      </div>
    </div>
    <div class="sec-choices" :style="choicesContainerStyle" v-if="!_state.collapsed">
      <ChoiceView v-for="choiceId in choices" :choiceId="choiceId" :defaultStyle="defaultChoiceStyle" />
    </div>
  </section>

  <!-- Modals -->
  <bs-modal :modalId="`style_${props.sectionId}`" title="Style Editor">
    <div class="sec-style">
      <b>Section Style</b>
      <select class="form-select sec-style-select" v-model="M_style_name">
        <option v-for="style in styles" :value="style">{{ style }}</option>
      </select>
      <b>Choices Style (default)</b>
      <select class="form-select sec-style-select" v-model="M_style_children">
        <option v-for="style in styles" :value="style">{{ style }}</option>
      </select>
      <b>Grid</b>
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
  </bs-modal>

  <bs-modal :modalId="`cond_${props.sectionId}`" title="Requirements">
    <div class="sec-conditions">
      <b>Conditions</b>

      <button class="btn btn-sm btn-outline-primary" @click="addCondition">
        <mdi-icon name="key-plus" />
      </button>

      <div v-for="cond in section.conditions">IF {{ cond.test }} THEN {{ cond.state }}</div>
    </div>
  </bs-modal>

</template>

<script setup lang="ts">
import { Choice, ElementType, Section } from "../../data/model/element";
import ChoiceView from "./ChoiceView.vue";
import { useStore } from "vuex";
import { computed, reactive, ref } from "vue";
import { updatePropsFor } from "../utils/props";
import { editorStoreKey } from "../../store/editor";
import MdiIcon from "../utils/mdi-icon.vue";
import BsModal from "../utils/bs-modal.vue";
import { Condition } from "../../data/model";
import * as P from "ts-pattern";
import { __ as PM } from "ts-pattern";
import * as R from "ramda";
import { DefaultChoiceStyle } from "../../data/model/style";
import ContentView from "./ContentView.vue";

const store = useStore(editorStoreKey);

const props = defineProps({
  sectionId: String
});

const _state = reactive({
  collapsed: false
});

const section = computed(() => store.getters["project/findElement"](props.sectionId) as Section);
const choices = computed(() => store.getters["project/findChildrenIds"](props.sectionId) as Choice[]);
const styles = computed(() => ["default", "Style 1", "Style 2"]);
const {
  M_name,
  style: {
    M_name: M_style_name,
    M_children: M_style_children,
    M_gridCols,
    M_gridRows,
    M_gridFlow,
    M_gridDefaultColSpan,
    M_gridDefaultRowSpan
  }
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
      .with(PM.string, R.match(/^\d+$/), (numCols) => {
        return { "grid-template-columns": `repeat(${numCols}, 1fr)` };
      })
      .otherwise(EMPTY),
    P.match<string | undefined>(section.value.style.gridRows)
      .with(undefined, EMPTY)
      .with(PM.string, R.match(/^\d+$/), (numCols) => {
        return { "grid-template-rows": `repeat(${numCols}, 1fr)` };
      })
      .otherwise(EMPTY),
    P.match<string | undefined>(section.value.style.gridFlow)
      .with(undefined, EMPTY)
      .with(PM.string, R.match(/^row|column$/), (flow) => {
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
      .with(PM.number, (colSpan) => {
        return { colSpan };
      })
      .with(PM.string, R.match(/^\d+$/), (colSpan: string) => {
        return { colSpan: Number.parseInt(colSpan) };
      })
      .otherwise(EMPTY),
    P.match<number | string | undefined>(section.value.style.gridDefaultRowSpan)
      .with(undefined, EMPTY)
      .with(PM.number, (rowSpan) => {
        return { rowSpan };
      })
      .with(PM.string, R.match(/^\d+$/), (rowSpan: string) => {
        return { rowSpan: Number.parseInt(rowSpan) };
      })
      .otherwise(EMPTY)
  ]);
});

function toggleSection() {
  _state.collapsed = !_state.collapsed;
}

function moveSection(relative: "prev" | "next") {
  store.commit("project/moveObject", {
    objectId: props.sectionId,
    relative
  });
}

function createChoice() {
  store.dispatch("project/insertElement", {
    elementType: ElementType.Choice,
    parentId: props.sectionId,
    build: (choiceId: string, counter: number) => new Choice(choiceId, `Choice ${counter}`, "Bar")
  });
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

<style scoped lang="scss">
.section {
  display: grid;
  grid-template:
    "tools" auto
    "header" auto
    "choices" auto
    / 1fr;
  grid-gap: 5px;

  padding: 5px 0;
  margin-bottom: 10px;
}

.sec-actions {
  grid-area: tools;

  display: grid;
  grid-template-columns: repeat(3, auto) 1fr auto;
  grid-auto-flow: column;
  grid-gap: 5px;
  align-items: center;

  background: lightgray;
  border-radius: 5px;
  padding: 5px;
}

.sec-header {
  grid-area: header;

  display: grid;
  grid-template-columns: 2fr 1fr auto;
  grid-template-rows: auto;
  grid-gap: 5px;

  grid-template-areas:
    "text meta tools";

  .sec-text {
    grid-area: text;

    display: grid;
    grid-template:
      "title title" auto
      "header footer" auto
      / 1fr 1fr;
    align-content: start;
    grid-gap: 5px;

    .sec-title {
      grid-area: title;
    }

    .sec-header-text {
      grid-area: header;
    }

    .sec-footer-text {
      grid-area: footer;
    }
  }

  .sec-conditions {
    grid-area: cond;
  }

  .sec-meta {
    grid-area: meta;
  }

}

.sec-style {
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-flow: row;
  grid-gap: 5px;
  align-items: center;

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

</style>