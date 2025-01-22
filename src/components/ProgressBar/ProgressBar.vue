<script setup lang="ts">
import type { IProgressBarProps } from '@interfaces/componentsProps';
import { computed } from 'vue';
import { convertThemeToColor, convertThemeToTextColor } from '@helpers/common';

const props = withDefaults(defineProps<IProgressBarProps>(), {
  value: 0,
  max: 100,
  size: 'normal',
  theme: 'black',
  inactiveTheme: 'white',
  darknessTheme: '500',
  darknessInactiveTheme: '300',
  showLabel: true,
  labelAfter: '%',
});
const active = computed(() => `${(props.value / props.max) * 100}%`);
const activeColor = computed(() => {
  if (!props.colorGaps) return convertThemeToColor(props.theme, props.darknessTheme);
  const current = props.colorGaps.find((item) => item.start <= props.value && props.value <= item.end);
  if (!current) return convertThemeToColor(props.theme, props.darknessTheme);
  return convertThemeToColor(current.color, current.darknessColor);
});
const inactiveColor = computed(() => {
  if (!props.colorInactiveGaps) return convertThemeToColor(props.inactiveTheme, props.darknessInactiveTheme);
  const current = props.colorInactiveGaps.find((item) => item.start <= props.value && props.value <= item.end);
  if (!current) return convertThemeToColor(props.inactiveTheme, props.darknessInactiveTheme);
  return convertThemeToColor(current.color, current.darknessColor);
});
const textColor = computed(() => convertThemeToTextColor(props.theme, props.darknessTheme));
const fontSize = computed(() => {
  if (props.fontSize) return props.fontSize;
  const size = props.size;
  if (size === 'normal') return '16px';
  if (size === 'large') return '20px';
  if (size === 'huge') return '24px';
  return '12px';
});
const defaultHeight = computed(() => {
  const size = props.size;
  if (size === 'normal') return '30px';
  if (size === 'large') return '45px';
  if (size === 'huge') return '60px';
  return '15px';
});
</script>

<template>
  <section
    class="container"
    :style="`width: ${width ?? '300px'}; height: ${height ?? defaultHeight}; border: ${noBorder ? '' : '2px solid black'}`"
  >
    <div class="active">
      <span v-show="showLabel" class="value">{{ labelBefore }}{{ value }}{{ labelAfter }}</span>
    </div>
  </section>
</template>

<style scoped>
.container {
  position: relative;
  overflow: hidden;
  border-radius: calc(v-bind(fontSize) / 2.5);
  background-color: v-bind(inactiveColor);
}
.active {
  width: v-bind(active);
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  transition: width 0.4s ease-in-out;
  background-color: v-bind(activeColor);
}
.value {
  font-weight: bold;
  font-size: v-bind(fontSize);
  color: v-bind(textColor);
}
</style>
