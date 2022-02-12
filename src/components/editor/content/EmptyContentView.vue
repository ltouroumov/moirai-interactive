<template>
  <div class="empty-content-edit ph-empty">
    <div class="ph-empty-text">No content</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  name: String
});
</script>

<style scoped lang="scss">
@import "../../../styles/mixins";

.empty-content-edit {
  @include empty-placeholder;
}
</style>