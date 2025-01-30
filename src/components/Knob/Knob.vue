<script setup lang="ts">
import type { IKnobProps } from '@interfaces/componentsProps';
import { computed, ref, type Ref, watch } from 'vue';
import { convertThemeToColor } from '@helpers/common';
import { calcCenter, calcStart, calcNewValue, calcThemeColor, calcContainerSize } from '@components/Knob/helpers';
import Button from '@components/Button/Button.vue';

const props = withDefaults(defineProps<IKnobProps>(), {
  min: 0,
  max: 5,
  step: 1,
  size: 'normal',
  buttons: false,
  theme: 'sky',
  darknessTheme: '500',
  negativeTheme: 'black',
  darknessNegativeTheme: '500',
  color: 'black',
  darknessColor: '500',
  background: 'white',
  showLabel: true,
  colorAsTheme: false,
  textBold: false,
});
const value = defineModel<number>({
  default: 0,
}) as Ref<number>;
const emit = defineEmits(['update']);

if (props.value) {
  value.value = props.value;
}
const propValue = computed(() => props.value);
watch(propValue, () => (value.value = propValue.value ?? value.value));
watch(value, () => emit('update', value));

const isClickHold = ref<boolean>(false);
const container = ref();

const degreesTotal = computed(() => 360 - 90);
const length = computed(() => props.max - props.min);
const center = computed(() => calcCenter(container.value));
const start = computed(() => calcStart(container.value));
const containerSize = computed(() => props.width ?? calcContainerSize(props.size));
const buttonSize = computed(() => {
  const size = props.size;
  return size === 'normal' || size === 'small' ? 'small' : size === 'large' ? 'large' : 'huge';
});
const textSize = computed(() => {
  if (props.fontSize) return props.fontSize;
  const size = props.size;
  return size === 'normal' ? '1.7rem' : size === 'small' ? '1.3rem' : size === 'large' ? '2.5rem' : '3.5rem';
});
const buttonPadding = computed(() => {
  const size = props.size;
  return size === 'normal'
    ? '0.3rem 0.5rem'
    : size === 'small'
      ? '0.2rem'
      : size === 'large'
        ? '0.5rem 0.75rem'
        : '0.7rem 1rem';
});
const buttonWidth = computed(() => `${+textSize.value.slice(0, -3) * 0.78}rem`);
const backgroundSize = computed(() => `${+containerSize.value.slice(0, -2) * 0.71}px`);
const themeColor = computed(() => calcThemeColor(props.colorGaps, props.theme, props.darknessTheme, value.value));
const textColor = computed(() => convertThemeToColor(props.color, props.darknessColor));
const backgroundCircle = computed(() => {
  const color = convertThemeToColor(
    props.negativeTheme ?? (props.theme === 'white' ? 'black' : props.theme === 'black' ? 'white' : props.theme),
    (!props.negativeTheme && props.theme === 'black') || props.negativeTheme === 'white'
      ? '500'
      : props.darknessNegativeTheme,
  );
  return `radial-gradient(circle at center, transparent 50%, ${color} 50%)`;
});
const conicGradient = computed(() => {
  const valueDeg = 225 + (value.value / length.value) * degreesTotal.value;
  if (valueDeg >= 360)
    return `conic-gradient(${themeColor.value} 0deg ${valueDeg % 360}deg, transparent ${valueDeg % 360}deg 225deg, ${themeColor.value} 225deg 360deg)`;
  return `conic-gradient(transparent 0deg 225deg, ${themeColor.value} 225deg ${valueDeg}deg, transparent ${valueDeg}deg 360deg)`;
});

const setNewValue = ($event: MouseEvent) => {
  value.value = calcNewValue(
    $event,
    center.value,
    start.value,
    degreesTotal.value,
    length.value,
    props.step,
    value.value,
  );
};
const onPointerDown = ($event: MouseEvent) => {
  isClickHold.value = true;
  setNewValue($event);
};
</script>

<template>
  <section
    @pointerdown.prevent="!buttons && onPointerDown($event)"
    @pointermove="isClickHold ? setNewValue($event) : ''"
    @pointerup="isClickHold = false"
    @pointerleave="isClickHold = false"
    class="container containerSize"
    ref="container"
  >
    <div class="background"></div>
    <span
      v-if="showLabel"
      class="count"
      :style="`color: ${colorAsTheme ? themeColor : textColor};
       font-weight: ${textBold ? 'bold' : 'medium'};
       font-size: ${textSize}`"
      >{{ textBefore ?? '' }}{{ value }}{{ textAfter ?? '' }}</span
    >
    <div class="circle containerSize">
      <div class="circle containerSize selected"></div>
    </div>
    <div v-if="buttons" class="buttons" :style="`gap: ${+textSize.slice(0, -3) * 3}px`">
      <Button
        @click="value++"
        :theme="negativeTheme"
        textColor="white"
        :size="buttonSize"
        label="+"
        textStyle="bold"
        :padding="buttonPadding"
        :width="buttonWidth"
      ></Button>
      <Button
        @click="value--"
        :theme="negativeTheme"
        textColor="white"
        :size="buttonSize"
        label="-"
        textStyle="bold"
        :padding="buttonPadding"
        :width="buttonWidth"
      ></Button>
    </div>
  </section>
</template>

<style scoped>
.container {
  position: relative;
}
.containerSize {
  width: v-bind(containerSize);
  height: v-bind(containerSize);
}
.circle {
  position: relative;
  border-radius: 50%;
  background: v-bind(backgroundCircle);
  clip-path: polygon(0 0, 0 100%, 50% 50%, 50% 50%, 100% 100%, 100% 0);
  cursor: pointer;
}
.selected {
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: v-bind(conicGradient);
}
.background {
  width: v-bind(backgroundSize);
  height: v-bind(backgroundSize);
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 4;
  background: v-bind(background);
  border-radius: 50%;
  transform: translate(-50%, -50%);
}
.count {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 5;
  transform: translate(-50%, -50%);
  user-select: none;
}
.buttons {
  display: flex;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
}
</style>
