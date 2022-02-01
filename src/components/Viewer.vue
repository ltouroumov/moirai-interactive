<template>
<div>
  <h1>Viewer</h1>
</div>
</template>

<script setup lang="ts">
import {useStore} from "vuex";
import {RootState} from "../data/state";

const store = useStore<RootState>()
</script>

<style scoped>

</style>