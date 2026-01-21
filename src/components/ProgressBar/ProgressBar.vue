<script setup lang="ts">
import type { IProgressBarProps } from '../../common/interfaces/componentsProps';
import { computed, ref, type Ref, watch } from 'vue';
import { convertThemeToColor, convertThemeToTextColor, getValueFromSize } from '../../common/helpers/common';

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
const progressBar = ref();
const value = defineModel() as Ref<number>;
const emit = defineEmits(['update']);

const propValue = computed(() => props.value);
watch(propValue, () => (value.value = propValue.value), { immediate: true });
watch(value, () => emit('update', value));

const widthNumber = computed<number>(() =>
  props.width && props.width.includes('%')
    ? (progressBar.value.clientWidth * parseInt(props.width)) / 100
    : parseInt(props.width || '300'),
);

const active = computed(() => `${(value.value / props.max) * 100}%`);
const activeColor = computed(() => {
  if (props.gradient) return `linear-gradient(to right, ${props.gradient.join(',')}) 0 / cover no-repeat fixed`;
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
const fontSize = computed(() => getValueFromSize(props.size, ['12px', '16px', '20px', '24px']));
const defaultHeight = computed(() => getValueFromSize(props.size, ['15px', '30px', '45px', '60px']));

const isClickHold = ref<boolean>(false);

const setNewValue = (event: MouseEvent) => {
  if (props.disabled) return;
  const layerX = event.layerX;
  value.value = Math.round((layerX / (widthNumber.value - 1)) * props.max);
};
const onPointerDown = (event: MouseEvent) => {
  if (props.disabled) return;
  isClickHold.value = true;
  setNewValue(event);
};
</script>

<template>
  <section
    class="container"
    ref="progressBar"
    id="progressBar"
    :style="`width: ${width ?? '300px'}; height: ${height ?? defaultHeight}; border: ${noBorder ? '' : '2px solid black'}; ${!disabled ? 'cursor: pointer' : ''}`"
    @pointerdown.prevent="onPointerDown($event)"
    @pointermove="isClickHold ? setNewValue($event) : ''"
    @pointerup="isClickHold = false"
    @pointerleave="isClickHold = false"
  >
    <div
      :class="[
        'active',
        {
          '--transition': disabled,
        },
      ]"
    >
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
  background: v-bind(activeColor);

  &.--transition {
    transition: width 0.2s ease;
  }
}
.value {
  font-weight: bold;
  font-size: v-bind(fontSize);
  color: v-bind(textColor);
  user-select: none;
}
</style>
