<template>
  <div class="element-toolbar">
    <button class="btn btn-sm btn-link" @click="emit('toggle')" :class="{ disabled: props.collapseDisabled }">
      <MdIcon name="eye" v-show="props.collapsed" />
      <MdIcon name="eye-off" v-show="!props.collapsed" />
    </button>
    <button class="btn btn-sm btn-link" @click="emit('move', 'prev')">
      <MdIcon :name="props.arrows === 'vertical' ? 'arrow-up' : 'arrow-left'" />
    </button>
    <button class="btn btn-sm btn-link" @click="emit('move', 'next')">
      <MdIcon :name="props.arrows === 'vertical' ? 'arrow-down' : 'arrow-right'" />
    </button>
    <span class="ch-id">{{ element.name }} / {{ element.id }}</span>
    <div class="btn-toolbar">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import MdIcon from "../utils/MdIcon.vue";
import { AnyElement } from "../../data/model/element";

const props = defineProps<{
  element: AnyElement,
  collapsed: boolean,
  collapseDisabled?: boolean,
  arrows: 'horizontal' | 'vertical'
}>()

const emit = defineEmits<{
  (e: 'toggle'): void,
  (e: 'move', direction: 'prev' | 'next'): void,
}>()

</script>

<style scoped lang="scss">
.element-toolbar {
  grid-area: tools;

  display: grid;
  grid-template-columns: repeat(3, min-content) minmax(max-content, 1fr) max-content;
  grid-auto-rows: auto;
  grid-auto-flow: column;
  grid-gap: 5px;
  align-items: center;

  background: lightgray;
  border-radius: 5px;
  padding: 5px;
}
</style>