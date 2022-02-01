<template>
  <div class="option">
    <h3>{{ option.title }}</h3>
    <div class="scores"></div>
    <div class="text">{{ option.text }}</div>
  </div>
</template>

<script setup lang="ts">
import {Option} from "../data/model/element";
import {useStore} from "vuex";
import {State} from "../data/state";
import {computed} from "vue";


const store = useStore<State>()

const props = defineProps({
  optionId: String
})

const option = computed(() => store.getters.findElement(props.optionId) as Option)
</script>

<style scoped>

</style>