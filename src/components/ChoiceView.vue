<script lang="ts">
import {Choice} from "../data/model";
import {defineComponent} from 'vue'

export default defineComponent({
  setup() {
  },
  props: {
    choice: Choice
  }
});
</script>

<template>
  <div class="choice">
    <h2>{{choice.title}}</h2>
    <div class="scores"></div>
    <div class="text">{{choice.text}}</div>
  </div>
</template>

<style scoped>

</style>