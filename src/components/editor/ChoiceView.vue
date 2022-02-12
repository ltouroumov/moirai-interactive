<template>
  <div class="choice" :style="containerStyle">
    <div class="ch-header">
      <input class="form-control ch-title" v-model="M_name" />
      <div class="ch-conditions" v-if="choice.conditions"></div>
      <div class="ch-scores" v-if="choice.scores"></div>
      <div class="form-floating">
        <textarea class="form-control ch-text" v-model="M_text"></textarea>
        <label>Choice Text</label>
      </div>
    </div>
    <div class="ch-style">
      <div class="form-floating">
        <select class="form-select ch-style-select" v-model="M_style_name">
          <option v-for="style in styles" :value="style">{{ style }}</option>
        </select>
        <label>Style</label>
      </div>
      <div class="ch-grid-area">
        <div class="form-floating">
          <input class="form-control sec-grid-cols" type="text" v-model="M_colSpan" />
          <label>Col Span</label>
        </div>
        <div class="form-floating">
          <input class="form-control sec-grid-rows" type="text" v-model="M_rowSpan" />
          <label>Row Span</label>
        </div>
      </div>
    </div>
    <div class="ch-options" v-if="options && options.length > 0">
      <OptionView v-for="optionId in options" :optionId="optionId" />
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
import { Choice, ElementType, Option } from "../../data/model/element";
import OptionView from "./OptionView.vue";
import { useStore } from "vuex";
import { computed } from "vue";
import { updatePropsFor } from "../utils/props";
import { editorStoreKey } from "../../store/editor";
import MdiIcon from "../utils/mdi-icon.vue";
import { ChoiceStyle, DefaultChoiceStyle } from "../../data/model/style";
import * as P from "ts-pattern";
import { __ } from "ts-pattern";
import * as R from "ramda";

const store = useStore(editorStoreKey);

const props = defineProps({
  choiceId: String,
  defaultStyle: { type: Object, default: DefaultChoiceStyle }
});

const choice = computed(() => store.getters["project/findElement"](props.choiceId) as Choice);
const options = computed(() => store.getters["project/findChildrenIds"](props.choiceId) as Option[]);
const styles = computed(() => ["default", "Style 1", "Style 2"]);
const { M_name, M_text, style: { M_name: M_style_name, M_colSpan, M_rowSpan } } = updatePropsFor(store, {
  type: Choice,
  prop: choice,
  objectId: () => props.choiceId
});

const containerStyle = computed(() => {
  const EMPTY = R.always({});
  const style = R.mergeWith(
    (a: any, b: any) => b || a,
    props.defaultStyle, choice.value.style
  );
  console.log("Merged Style", style, props.defaultStyle, choice.value.style);
  return R.mergeAll([
    P.match<number | string | undefined>(style.colSpan)
      .with(undefined, EMPTY)
      .with(__.number, colSpan => {
        return { "grid-column": `span ${colSpan}` };
      })
      .with(__.string, R.match(/^\d+$/), colSpan => {
        return { "grid-column": `span ${colSpan}` };
      })
      .otherwise(EMPTY),
    P.match<number | string | undefined>(style.rowSpan)
      .with(undefined, EMPTY)
      .with(__.number, colSpan => {
        return { "grid-row": `span ${colSpan}` };
      })
      .with(__.string, R.match(/^\d+$/), colSpan => {
        return { "grid-row": `span ${colSpan}` };
      })
      .otherwise(EMPTY)
  ]);
});

function createOption() {
  store.dispatch("project/insertElement", {
    elementType: ElementType.Option,
    parentId: props.choiceId,
    build: (optionId: string, counter: number) => new Option(optionId, `Option ${counter}`, "Bar")
  });
}

async function deleteChoice() {
  store.commit("project/removeObject", props.choiceId);
}

</script>

<style scoped lang="less">
.choice {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto 1fr;
  grid-template-areas:
   "header tools"
   "style style"
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


.ch-style {
  grid-area: style;

  display: grid;
  grid-template-columns: 1fr;
  grid-auto-flow: row;
  grid-gap: 5px;
  align-content: start;

  .ch-grid-area {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-flow: row;
    grid-gap: 5px;
    align-items: center;
  }
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