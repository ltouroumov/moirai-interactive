<template>
  <div class="editor-home">
    <div class="card" v-for="idx in 8">
      <div class="card-img-top"></div>
      <div class="card-body">
        <h5 class="card-title">Card title {{ idx }}</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
          content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>

  </div>


</template>

<script setup lang="ts">
const props = defineProps({
  projectId: String
});
</script>

<style scoped lang="scss">
.editor-home {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(4, minmax(200px, 400px));
  grid-auto-rows: auto;
  grid-auto-flow: row;

  justify-content: center;
  align-content: center;
}
</style>