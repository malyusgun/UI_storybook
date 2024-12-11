<script setup lang="ts">
import { computed } from 'vue';
import type { TThemeColor } from '@interfaces/common';
import { convert500ThemeToColor } from '@helpers/colors';

interface Props {
  height?: number;
  type?: 'solid' | 'dashed' | 'dotted';
  color?: TThemeColor;
}
const props = withDefaults(defineProps<Props>(), {
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
