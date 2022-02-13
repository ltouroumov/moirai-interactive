<template>
  <div class="page">
    <div class="page-actions">
      <button class="btn btn-sm btn-link" @click="togglePage">
        <MdIcon name="eye" v-show="_state.collapsed" />
        <MdIcon name="eye-off" v-show="!_state.collapsed" />
      </button>
      <button class="btn btn-sm btn-link" @click="movePage('prev')">
        <MdIcon name="arrow-up" />
      </button>
      <button class="btn btn-sm btn-link" @click="movePage('next')">
        <MdIcon name="arrow-down" />
      </button>
      <span class="page-id">{{ page.name}} / {{ page.id }}</span>
      <div class="btn-toolbar">
        <div class="btn-group me-2">
          <button class="btn btn-sm btn-outline-primary" data-bs-toggle="modal"
                  :data-bs-target="`#cond_${props.sectionId}`">
            <MdIcon name="key" />
            Requirements
          </button>
          <button type="button" class="btn btn-sm btn-outline-primary" data-bs-toggle="modal"
                  :data-bs-target="`#style_${props.sectionId}`">
            <MdIcon name="palette-swatch" />
            Style
          </button>
        </div>
        <div class="btn-group">
          <button class="btn btn-sm btn-outline-danger wide" @click="deletePage">
            <MdIcon name="delete-outline" />
          </button>
        </div>
      </div>
    </div>
    <div class="page-content" v-if="!_state.collapsed">
      <input class="form-control page-name" type="text" v-model="M_name">
      <ContentView :object-id="props.pageId" content-prop="headerContent" name="Page Header" class="page-header"></ContentView>
      <ContentView :object-id="props.pageId" content-prop="footerContent" name="Page Footer" class="page-footer"></ContentView>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Choice, ElementType, Page, Section } from "../../data/model/element";
import ChoiceView from "./ChoiceView.vue";
import { useStore } from "vuex";
import { computed, reactive, ref } from "vue";
import { updatePropsFor } from "../utils/props";
import { editorStoreKey } from "../../store/editor";
import MdIcon from "../utils/MdIcon.vue";
import { Condition } from "../../data/model";
import * as P from "ts-pattern";
import * as R from "ramda";
import { ChoiceStyle, DefaultChoiceStyle, DefaultSectionStyle, SectionStyle } from "../../data/model/style";
import BModal from "../utils/BsModal.vue";
import ContentView from "./ContentView.vue";

const store = useStore(editorStoreKey);

const props = defineProps({
  pageId: String
});

const _state = reactive({
  collapsed: false
});

const page = computed(() => store.getters["project/findElement"](props.pageId) as Page);
const {
  M_name
} = updatePropsFor(store, {
  type: Page,
  prop: page,
  objectId: () => props.pageId
});


function togglePage() {
  _state.collapsed = !_state.collapsed;
}

function movePage(relative: "prev" | "next") {
  store.commit("project/moveObject", {
    objectId: props.pageId,
    relative
  });
}

async function deletePage() {
  store.commit("project/removeObject", props.pageId);
}
</script>

<style scoped lang="less">
.page {
  display: grid;
  grid-template:
    "tools" auto
    "header" auto
    / 1fr;
  grid-gap: 5px;

  padding: 5px 0;
  margin-bottom: 10px;
}

.page-actions {
  grid-area: tools;

  display: grid;
  grid-template-columns: repeat(3, auto) 1fr auto;
  grid-auto-flow: column;
  grid-gap: 5px;
  align-items: center;

  background: lightgray;
  border-radius: 5px;
  padding: 5px;

  .page-id {
    font-family: monospace;
  }
}

.page-content {
  grid-area: header;

  display: grid;
  grid-template: "name name options" auto
   "header footer options" auto
  / 2fr 2fr 1fr;
  grid-gap: 5px;

  .page-name {
    grid-area: name;
  }
  .page-header {
    grid-area: header;
  }
  .page-footer {
    grid-area: footer;
  }
}
</style>