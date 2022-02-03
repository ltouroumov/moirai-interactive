<template>
  <div class="option">
    <div class="opt-header">
      <input class="form-control opt-title" v-model="M_title" />
      <div class="opt-conditions"></div>
      <div class="opt-scores"></div>
    </div>
    <div class="opt-actions">
      <span class="opt-id">{{ option.id }}</span>
      <button class="btn btn-sm btn-outline-danger" @click="deleteOption">
        <mdi-icon name="delete-outline" />
      </button>
    </div>
    <textarea class="form-control opt-text" v-model="M_text"></textarea>
  </div>
</template>

<script setup lang="ts">
import { Choice, Option } from "../../data/model/element";
import { useStore } from "vuex";
import { computed } from "vue";
import { editorStoreKey } from "../../store/editor";
import { updatePropsFor } from "../utils/props";
import MdiIcon from "../utils/mdi-icon.vue";


const store = useStore(editorStoreKey);

const props = defineProps({
  optionId: String
});

const option = computed(() => store.getters["project/findElement"](props.optionId) as Option);
const { M_title, M_text } = updatePropsFor(store, {
  type: Option,
  prop: option,
  objectId: () => props.optionId
});

async function deleteOption() {
  store.commit("project/removeObject", props.optionId);
}
</script>

<style scoped lang="less">
.option {
  border-bottom: 1px solid lightgray;

  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "header tools"
    "text text";
  grid-gap: 5px;
}

.option .opt-header {
  grid-area: header;
}

.option .opt-actions {
  grid-area: tools;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-auto-flow: row;
  grid-gap: 5px;
  align-content: start;
  justify-items: end;

  background: lightgray;
  border-radius: 5px;
  padding: 5px;

  .opt-id {
    grid-area: span 1 / span 2;
  }
}

.option .opt-text {
  grid-area: text;
}
</style>