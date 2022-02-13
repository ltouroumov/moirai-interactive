<template>
  <i :class="cssClasses"></i>
</template>

<script setup>

import { computed } from "vue";

const cssClasses = computed(() => {
  const classes = ["mdi", `mdi-${props.name}`];
  if (props.size) classes.push(`mdi-${props.size}`);
  if (props.rotate) classes.push(`mdi-rotate-${props.rotate}`);
  if (props.color) classes.push(`mdi-${props.color}`);
  if (props.flipH) classes.push(`mdi-flip-h`);
  if (props.flipV) classes.push(`mdi-flip-v`);
  if (props.spin) classes.push(`mdi-spin`);
  if (props.inactive) classes.push(`mdi-inactive`);
  return classes;
});

const props = defineProps({
  name: { type: String, required: true },
  size: { type: String, default: undefined },
  rotate: { type: String, default: undefined },
  color: { type: String, default: undefined },
  flipH: { type: Boolean, default: false },
  flipV: { type: Boolean, default: false },
  spin: { type: Boolean, default: false },
  inactive: { type: Boolean, default: false }
});
</script>

<style scoped>

</style>