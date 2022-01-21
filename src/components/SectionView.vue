<script lang="ts">
import {Section} from "../data/model";
import {defineComponent} from 'vue'
import ChoiceView from "./ChoiceView.vue";

export default defineComponent({
  components: {ChoiceView},
  setup() {
  },
  props: {
    section: Section
  }
});
</script>

<template>
  <section class="sec-objects">
    <div class="sec-header">
      <h1>{{section.title}}</h1>
      <div>{{section.header}}</div>
    </div>
    <div class="sec-choices">
      <ChoiceView v-for="choice in section.choices" :choice="choice" />
    </div>
    <div class="sec-footer" v-if="section.footer !== undefined">
      {{section.footer}}
    </div>
  </section>
</template>

<style scoped>

</style>