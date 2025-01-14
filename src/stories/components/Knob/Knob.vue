<script setup lang="ts">
import type { IKnobProps } from '@interfaces/componentsProps';

const props = withDefaults(defineProps<IKnobProps>(), {});
const value = defineModel('value');
</script>

<template>
  <section class="container"></section>
</template>

<style scoped>
.container {
}
</style>
