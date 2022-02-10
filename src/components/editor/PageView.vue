<template>
  <div class="page">
    <div class="page-actions">
      <button class="btn btn-sm btn-link" @click="togglePage">
        <mdi-icon name="eye" v-show="_state.collapsed" />
        <mdi-icon name="eye-off" v-show="!_state.collapsed" />
      </button>
      <span class="page-id">{{ page.id }}</span>
      <div class="btn-toolbar">
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
          <button class="btn btn-sm btn-outline-danger wide" @click="deletePage">
            <mdi-icon name="delete-outline" />
          </button>
        </div>
      </div>
    </div>
    <div class="page-header" v-if="!_state.collapsed">
      <div class="page-text">
        <input class="form-control page-title" type="text" v-model="M_title">
        <div class="form-floating">
          <textarea class="form-control page-header" v-model="M_headerText" placeholder="..."></textarea>
          <label>Header Text</label>
        </div>
        <div class="form-floating">
          <textarea class="form-control page-footer" v-model="M_footerText" placeholder="..."></textarea>
          <label>Footer Text</label>
        </div>
      </div>
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
import MdiIcon from "../utils/mdi-icon.vue";
import { Condition } from "../../data/model";
import * as P from "ts-pattern";
import * as R from "ramda";
import { ChoiceStyle, DefaultChoiceStyle, DefaultSectionStyle, SectionStyle } from "../../data/model/style";
import BModal from "../utils/bs-modal.vue";

const store = useStore(editorStoreKey);

const props = defineProps({
  pageId: String
});

const _state = reactive({
  collapsed: false
});

const page = computed(() => store.getters["project/findElement"](props.pageId) as Page);
const {
  M_title,
  M_headerText,
  M_footerText
} = updatePropsFor(store, {
  type: Page,
  prop: page,
  objectId: () => props.pageId
});


function togglePage() {
  _state.collapsed = !_state.collapsed;
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
  grid-template-columns: auto 1fr auto;
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

.page-header {
  grid-area: header;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-gap: 5px;

  grid-template-areas:
    "text";

  .page-text {
    grid-area: text;

    display: grid;
    grid-template:
      "title title" auto
      "header footer" auto
    / 1fr 1fr;
    grid-gap: 5px;

    .page-title {
      grid-area: title;
    }
    .page-header {
      grid-area: header;
    }
    .page-footer {
      grid-area: footer;
    }
  }
}
</style>