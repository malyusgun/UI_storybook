<script setup lang="ts">
import type { ICropperProps } from '@interfaces/componentsProps';

const props = withDefaults(defineProps<ICropperProps>(), {
  size: 'normal',
  disabled: false,
});
</script>

<template>
  <section class="container"></section>
</template>

<style scoped>
.container {
}
</style>
