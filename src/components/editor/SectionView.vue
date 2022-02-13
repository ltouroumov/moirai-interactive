<template>
  <section class="section">
    <ElementToolbar class="sec-actions" :element="section" :collapsed="_state.collapsed" arrows="vertical"
                    @toggle="toggleSection" @move="moveSection">
      <div class="btn-group me-2">
        <button class="btn btn-sm btn-outline-primary" @click="createChoice">
          <MdIcon name="plus-circle" />
          Choice
        </button>
      </div>
      <div class="btn-group me-2">
        <button class="btn btn-sm btn-outline-primary" data-bs-toggle="modal"
                :data-bs-target="modalId('cond', true)">
          <MdIcon name="key" />
          Requirements
        </button>
        <button type="button" class="btn btn-sm btn-outline-primary" data-bs-toggle="modal"
                :data-bs-target="modalId('style', true)">
          <MdIcon name="palette-swatch" />
          Style
        </button>
      </div>
      <div class="btn-group">
        <button class="btn btn-sm btn-outline-danger wide" @click="deleteSection">
          <MdIcon name="delete-outline" />
        </button>
      </div>
    </ElementToolbar>
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
  <BsModal :modalId="modalId('style')" title="Style Editor">
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
  </BsModal>

  <BsModal :modalId="modalId('cond')" title="Requirements">
    <div class="sec-conditions">
      <b>Conditions</b>

      <button class="btn btn-sm btn-outline-primary" @click="addCondition">
        <MdIcon name="key-plus" />
      </button>

      <div v-for="cond in section.conditions">IF {{ cond.test }} THEN {{ cond.state }}</div>
    </div>
  </BsModal>

</template>

<script setup lang="ts">
import { Choice, ElementType, Section } from "../../data/model/element";
import ChoiceView from "./ChoiceView.vue";
import { useStore } from "vuex";
import { computed, reactive, ref } from "vue";
import { updatePropsFor } from "../utils/props";
import { editorStoreKey } from "../../store/editor";
import MdIcon from "../utils/MdIcon.vue";
import BsModal from "../utils/BsModal.vue";
import { Condition } from "../../data/model";
import * as R from "ramda";
import { DefaultChoiceStyle } from "../../data/model/style";
import ContentView from "./ContentView.vue";
import { genModalId } from "../utils/modal";
import { computeDefaultGridSpans, computeGridStyle } from "../utils/style";
import ElementToolbar from "./ElementToolbar.vue";

const store = useStore(editorStoreKey);


const props = defineProps({
  sectionId: { type: String, required: true }
});

const _state = reactive({
  collapsed: false
});

const modalId = genModalId(["edit", props.sectionId]);

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

const choicesContainerStyle = computed(() => {
  return computeGridStyle(section.value.style);
});
const defaultChoiceStyle = computed(() => {
  return R.mergeAll([
    DefaultChoiceStyle,
    computeDefaultGridSpans(section.value.style)
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
    grid-template-columns: auto 1fr;
    grid-auto-flow: row;
    grid-gap: 5px;
    align-items: center;

    .span3 {
      grid-area: span 1 / span 2;
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
  overflow: auto;
}

</style>