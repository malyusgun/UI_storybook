<script setup lang="ts">
import type { IProgressBarProps } from '@interfaces/componentsProps';
import { computed, ref, type Ref, watch } from 'vue';
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
const value = defineModel() as Ref<number>;
const emit = defineEmits(['update']);

if (props.value) {
  value.value = props.value;
}
watch(value, () => emit('update', value));

const active = computed(() => `${(value.value / props.max) * 100}%`);
const activeColor = computed(() => {
  if (props.gradient) return `linear-gradient(to right, ${props.gradient.join(',')})`;
  if (!props.colorGaps) return convertThemeToColor(props.theme, props.darknessTheme);
  const current = props.colorGaps.find((item) => item.start <= value.value && value.value <= item.end);
  if (!current) return convertThemeToColor(props.theme, props.darknessTheme);
  return convertThemeToColor(current.color, current.darknessColor);
});
const inactiveColor = computed(() => {
  if (!props.colorInactiveGaps) return convertThemeToColor(props.inactiveTheme, props.darknessInactiveTheme);
  const current = props.colorInactiveGaps.find((item) => item.start <= value.value && value.value <= item.end);
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

const isClickHold = ref<boolean>(false);

const setNewValue = (event: MouseEvent) => {
  const layerX = event.layerX;
  value.value = Math.round((layerX / (props.width ? parseInt(props.width) - 1 : 299)) * props.max);
};
const onPointerDown = (event: MouseEvent) => {
  isClickHold.value = true;
  setNewValue(event);
};
</script>

<template>
  <section
    class="container"
    id="progressBar"
    :style="`width: ${width ?? '300px'}; height: ${height ?? defaultHeight}; border: ${noBorder ? '' : '2px solid black'}`"
    @pointerdown.prevent="onPointerDown($event)"
    @pointermove="isClickHold ? setNewValue($event) : ''"
    @pointerup="isClickHold = false"
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
  cursor: pointer;
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
  background: v-bind(activeColor);
}
.value {
  font-weight: bold;
  font-size: v-bind(fontSize);
  color: v-bind(textColor);
  user-select: none;
}
</style>
