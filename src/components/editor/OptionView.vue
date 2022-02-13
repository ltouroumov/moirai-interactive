<template>
  <div class="option">
    <div class="opt-actions">
      <button class="btn btn-sm btn-link" @click="toggleOptions">
        <MdIcon name="eye" v-show="_state.collapsed" />
        <MdIcon name="eye-off" v-show="!_state.collapsed" />
      </button>
      <button class="btn btn-sm btn-link" @click="moveOption('prev')">
        <MdIcon name="arrow-up" />
      </button>
      <button class="btn btn-sm btn-link" @click="moveOption('next')">
        <MdIcon name="arrow-down" />
      </button>
      <span class="ch-id">{{ option.name }} / {{ option.id }}</span>
      <div class="btn-group">
        <button class="btn btn-sm btn-outline-danger" @click="deleteOption">
          <MdIcon name="delete-outline" />
        </button>
      </div>
    </div>
    <div class="opt-header">
      <input class="form-control opt-title" v-model="M_name" />
    </div>
    <ContentView name="Option Content" :object-id="props.optionId" content-prop="content" />
  </div>
</template>

<script setup lang="ts">
import { Choice, Option } from "../../data/model/element";
import { useStore } from "vuex";
import { computed, reactive } from "vue";
import { editorStoreKey } from "../../store/editor";
import { updatePropsFor } from "../utils/props";
import MdIcon from "../utils/MdIcon.vue";
import ContentView from "./ContentView.vue";


const store = useStore(editorStoreKey);

const _state = reactive({
  collapsed: false
});

const props = defineProps({
  optionId: String
});

const option = computed(() => store.getters["project/findElement"](props.optionId) as Option);
const { M_name, M_text } = updatePropsFor(store, {
  type: Option,
  prop: option,
  objectId: () => props.optionId
});

async function deleteOption() {
  store.commit("project/removeObject", props.optionId);
}

function moveOption(relative: "prev" | "next") {
  store.commit("project/moveObject", {
    objectId: props.optionId,
    relative
  });
}
</script>

<style scoped lang="scss">
.option {
  display: grid;
  grid-template:
    "tools" auto
    "header" auto
    / 1fr;
  grid-gap: 5px;
  align-content: start;
  border-bottom: 1px solid lightgray;
  padding-bottom: 5px;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .opt-actions {
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

  .opt-header {
    grid-area: header;
  }

}

</style>