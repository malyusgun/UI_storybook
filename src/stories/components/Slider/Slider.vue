<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { convert500ThemeToColor } from '@helpers/colors';
import type { ISliderProps } from '@interfaces/componentsProps';

const props = withDefaults(defineProps<ISliderProps>(), {
  width: '100',
  size: 'medium',
  theme: 'sky',
  backgroundColor: 'black',
});
const value = defineModel('value');
const optionValue = ref(
  typeof value.value === 'string'
    ? props.options!.findIndex((option) => option.label === value.value)
    : value.value,
);
watch([optionValue], () => {
  if (props.options) {
    value.value = props.options!.find(
      (option) => (option.value ?? option.label) == optionValue.value,
    )!.label;
  } else value.value = optionValue.value;
});
watch([value], () => {
  if (value.value !== optionValue.value) {
    optionValue.value =
      typeof value.value === 'string'
        ? props.options!.findIndex((option) => option.label === value.value)
        : value.value;
  }
});
const sliderButtonSize = computed(() => {
  switch (props.size) {
    case 'small':
      return '10px';
    case 'large':
      return '30px';
    case 'huge':
      return '40px';
  }
  return '20px';
});
const optionsFontSize = computed(() => {
  if (!props.options?.length) return;
  switch (props.size) {
    case 'small':
      return '10px';
    case 'large':
      return '14px';
    case 'huge':
      return '16px';
  }
  return '12px';
});
const widthHalf = computed(() => `${Math.floor(+props.width / 2)}px`);
const sliderHeight = computed(() => `${Math.floor(+sliderButtonSize.value.slice(0, -2) / 2.5)}px`);
const sliderBorderRadius = computed(() => (props.isSmooth ? sliderHeight.value : '0%'));
const sliderButtonBorderRadius = computed(() => (props.isSmooth ? '50%' : '0%'));
const themeColor = computed(() => convert500ThemeToColor(props.theme));
const themeBackground = computed(() => convert500ThemeToColor(props.backgroundColor));
const marksListPadding = computed(
  () => `${Math.floor(+sliderButtonSize.value.slice(0, -2) / 2)}px`,
);
</script>

<template>
  <div
    :class="[
      'sliderContainer',
      {
        verticalSlider: orientation === 'vertical',
      },
    ]"
    :style="`width: ${width}px`"
  >
    <input
      v-model="optionValue"
      type="range"
      class="slider"
      :min="min ?? 0"
      :max="max ?? 100"
      :step="step ?? 1"
    />
    <div v-if="options?.length">
      <ul class="marksList" :style="`width: ${width ?? 200}px`">
        <li
          v-for="option of options"
          :key="option.label"
          class="mark"
          :style="`color: ${convert500ThemeToColor(option?.color) ?? 'white'}; font-size: ${optionsFontSize}`"
        >
          {{ option.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.sliderContainer {
  width: v-bind(width);
}
.slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: v-bind(sliderHeight);
  background: v-bind(themeBackground);
  outline: none;
  border-radius: v-bind(sliderBorderRadius);
  filter: brightness(100%);
  -webkit-transition: 0.2s;
  transition: filter 0.2s;
  cursor: pointer;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: v-bind(sliderButtonSize);
  height: v-bind(sliderButtonSize);
  border-radius: v-bind(sliderButtonBorderRadius);
  background: v-bind(themeColor);
  -webkit-transition: 0.2s;
  transition: filter 0.2s;
}

.slider::-webkit-slider-thumb:hover {
  filter: brightness(90%);
}

.slider::-moz-range-thumb {
  width: v-bind(sliderButtonSize);
  height: v-bind(sliderButtonSize);
  background: v-bind(themeColor);
  cursor: pointer;
}
.verticalSlider {
  margin-top: v-bind(widthHalf);
  transform: rotate(270deg);
}
datalist {
  display: flex;
  justify-content: space-between;
  width: v-bind(width);
}
.values {
  padding: 0 -15px;
}
option {
  padding: 0;
}
.marksList {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: 10px;
  padding: 0 v-bind(marksListPadding);
}
.mark {
  display: flex;
  justify-content: center;
  line-height: 40px;
  background-color: black;
  width: 1px;
  height: 10px;
}
</style>
