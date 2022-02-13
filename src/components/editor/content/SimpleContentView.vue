<template>
  <div class="simple-content-edit">
    <input class="form-control content-title" type="text" v-model="M_title" placeholder="Title">
    <button class="btn btn-outline-primary">
      <MdIcon name="palette-swatch" />
      Style
    </button>
    <div class="content-image" :class="{ 'ph-empty': !content.image }">
      <button class="btn btn-outline-primary edit-btn"
              data-bs-toggle="modal"
              :data-bs-target="modalId('image', true)">
        <MdIcon name="image-edit-outline" />
      </button>
      <img :src="content.image" v-if="content.image" :alt="content.title" class="img-thumbnail">
      <div class="ph-empty-text" v-else>No Image</div>
    </div>
    <div class="content-body" :class="{ 'ph-empty': !content.body }">
      <button class="btn btn-outline-primary edit-btn"
              data-bs-toggle="modal"
              :data-bs-target="modalId('body', true)">
        <MdIcon name="playlist-edit" />
      </button>
      <div class="content-body-render" v-if="content.body" v-html="marked.parse(content.body)"></div>
      <div class="ph-empty-text" v-else>No content</div>
    </div>


    <BsModal :modal-id="modalId('image')" title="Image Editor">
      Edit Image
    </BsModal>
    <BsModal :modal-id="modalId('body')" :size="ModalSize.ExtraLarge" title="Body Editor">
      <div class="body-editor">
        <textarea class="form-control body-html" v-model="M_body" @input="updateBodyPreview"></textarea>
        <iframe class="body-preview" :ref="(el) => { bodyPreviewFrame = el }"></iframe>
      </div>
    </BsModal>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { editorStoreKey } from "../../../store/editor";
import { AnyElement } from "../../../data/model/element";
import { SimpleContent } from "../../../data/model/content";
import { updatePropsFor } from "../../utils/props";
import { computed, ref } from "vue";
import * as R from "ramda";
import MdIcon from "../../utils/MdIcon.vue";
import BsModal from "../../utils/BsModal.vue";
import { genModalId, ModalSize } from "../../utils/modal";
import { marked } from "marked";

const store = useStore(editorStoreKey);
const props = defineProps({
  objectId: { type: String, required: true },
  contentProp: { type: String, required: true },
  name: { type: String, required: true }
});

const modalId = genModalId(["edit", props.contentProp, props.objectId]);
const bodyPreviewFrame = ref<HTMLIFrameElement | undefined>(undefined);

const content = computed(() => {
  const element = store.getters["project/findElement"](props.objectId) as AnyElement;
  return R.view(R.lensProp(props.contentProp), element) as SimpleContent;
});
const {
  M_title,
  M_body
} = updatePropsFor(store, {
  type: SimpleContent,
  provider: () => store.getters["project/findElement"](props.objectId) as AnyElement,
  objectId: () => props.objectId,
  path: [props.contentProp]
});

function updateBodyPreview() {
  const bodyElement = bodyPreviewFrame.value?.contentWindow?.document.body;
  if (bodyElement) {
    bodyElement.innerHTML = marked.parse(content.value.body);
  }
}
</script>

<style scoped lang="scss">
@import "../../../styles/mixins";

.simple-content-edit {
  display: grid;
  grid-gap: 5px;
  grid-template:
    "title title layout" auto
    "image body body" minmax(200px, auto)
    / minmax(200px, auto) 1fr minmax(100px, auto);

  .content-title {
    grid-area: title;
  }

  .content-layout {
    grid-area: layout;
  }

  .content-image {
    grid-area: image;
    position: relative;
    border-radius: 5px;

    @include empty-placeholder;
    @include edit-button;
  }

  .content-body {
    grid-area: body;
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 5px;

    @include empty-placeholder;
    @include edit-button;
  }
}

.body-editor {
  display: grid;
  grid-template: "html preview" minmax(400px, 1fr) / 1fr 1fr;

  .body-html {
    grid-area: html;
  }

  .body-preview {
    grid-area: preview;
    place-self: stretch stretch;
  }
}
</style>