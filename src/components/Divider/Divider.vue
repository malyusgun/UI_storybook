<script setup lang="ts">
import { computed } from 'vue';
import type { IDividerProps } from '../../common/interfaces/componentsProps';
import { convertThemeToColor } from '../../common/helpers/common';

const props = withDefaults(defineProps<IDividerProps>(), {
  height: 1,
  type: 'solid',
  color: 'black',
  darknessColor: '500',
});
const colorConverted = computed(() => convertThemeToColor(props.color, props.darknessColor));
</script>

<template>
  <div :style="`border-bottom: ${height}px ${type} ${colorConverted}`"></div>
</template>

<style scoped></style>
