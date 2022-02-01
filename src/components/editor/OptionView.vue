<template>
  <div class="option">
    <h3>{{ option.title }}</h3>
    <div class="scores"></div>
    <div class="text">{{ option.text }}</div>
  </div>
</template>

<script setup lang="ts">
import {Option} from "../../data/model/element";
import {useStore} from "vuex";
import {RootState} from "../../data/state";
import {computed} from "vue";


const store = useStore<RootState>()

const props = defineProps({
  optionId: String
})

const option = computed(() => store.getters["database/findElement"](props.optionId) as Option)
</script>

<style scoped>

</style>