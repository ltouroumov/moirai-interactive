<template>
  <div class="choice">
    <h2>{{ choice.title }}</h2>
    <div class="scores"></div>
    <div class="text">{{ choice.text }}</div>
    <div class="options" v-if="options && options.length > 0">
      <OptionView v-for="optionId in options" :optionId="optionId"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Choice, Option} from "../data/model/element";
import OptionView from "./OptionView.vue";
import {useStore} from "vuex";
import {State} from "../data/state";
import {computed} from "vue";

const store = useStore<State>()

const props = defineProps({
  choiceId: String
})

const choice = computed(() => store.getters.findElement(props.choiceId) as Choice)
const options = computed(() => store.getters.findChildrenIds(props.choiceId) as Option[])
</script>

<style scoped>

</style>