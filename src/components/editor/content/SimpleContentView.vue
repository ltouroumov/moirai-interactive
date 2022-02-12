<template>
  <div class="simple-content-edit">
    <input class="form-control content-title" type="text" v-model="M_title">
    <div class="content-image" :class="{ 'img-ph': !content.image }">
      <img :src="content.image" v-if="content.image" :alt="content.title" class="img-thumbnail">
      <div class="img-placeholder" v-else>No Image</div>
    </div>
    <div class="content-body">
      <button class="btn btn-outline-primary">
        <MdiIcon name="pencil-outline" />
      </button>
      <div class="content-body-render" v-html="content.body"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { editorStoreKey } from "../../../store/editor";
import { AnyElement } from "../../../data/model/element";
import { SimpleContent } from "../../../data/model/content";
import { updatePropsFor } from "../../utils/props";
import { computed } from "vue";
import * as R from "ramda";
import MdiIcon from "../../utils/mdi-icon.vue";

const store = useStore(editorStoreKey);
const props = defineProps({
  objectId: { type: String, required: true },
  contentProp: { type: String, required: true },
  name: { type: String, required: true }
});

const content = computed(() => {
  const element = store.getters["project/findElement"](props.objectId) as AnyElement;
  return R.view(R.lensProp(props.contentProp), element) as SimpleContent;
});
const {
  M_title
} = updatePropsFor(store, {
  type: SimpleContent,
  provider: () => store.getters["project/findElement"](props.objectId) as AnyElement,
  objectId: () => props.objectId,
  path: [props.contentProp]
});
</script>

<style scoped lang="scss">
.simple-content-edit {
  display: grid;
  grid-gap: 5px;
  grid-template:
    "title title" auto
    "image body" minmax(200px, auto)
    / minmax(200px, auto) 1fr;

  .content-title {
    grid-area: title;
  }
  .content-image {
    grid-area: image;

    &.img-ph {
      display: flex;
      align-content: center;
      align-items: center;
      justify-content: center;
      background: gray;
    }
  }
  .content-body {
    grid-area: body;
  }
}
</style>