<script setup lang="ts">
import { computed } from 'vue';
import { convert500ThemeToColor } from '@helpers/colors';
import type { IDividerProps } from '@interfaces/componentsProps';

const props = withDefaults(defineProps<IDividerProps>(), {
  height: 1,
  type: 'solid',
  color: 'black',
});
const colorConverted = computed(() => convert500ThemeToColor(props.color));
</script>

<template>
  <div :style="`border-bottom: ${height}px ${type} ${colorConverted}`" class="w-full"></div>
</template>

<style scoped></style>
