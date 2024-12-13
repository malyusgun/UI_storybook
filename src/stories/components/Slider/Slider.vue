<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { TThemeColor } from '@interfaces/common';
import { convert500ThemeToColor } from '@helpers/colors';

const props = withDefaults(
  defineProps<{
    width?: string | number;
    min?: string | number;
    max?: string | number;
    step?: string | number;
    size?: 'small' | 'medium' | 'large' | 'huge';
    theme?: TThemeColor;
    backgroundColor?: TThemeColor;
    orientation?: 'horizontal' | 'vertical';
    isSmooth?: boolean;
    options?: {
      label: string;
      value: number;
      color?: string;
    }[];
  }>(),
  {
    width: '200',
    size: 'medium',
    theme: 'white',
    backgroundColor: 'black',
  },
);
const value = defineModel('value');
const optionValue = ref(
  typeof value.value === 'string'
    ? props.options!.findIndex((option) => option.label === value.value)
    : value.value,
);
watch([optionValue], () => {
  if (props.options) {
    value.value = props.options!.find((option) => option.value == optionValue.value)!.label;
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
      return '25px';
    case 'large':
      return '70px';
    case 'huge':
      return '100px';
  }
  return '40px';
});
const sliderHeight = computed(() => `${Math.floor(sliderButtonSize.value.slice(0, -2) / 3)}px`);
const sliderBorderRadius = computed(() => (props.isSmooth ? sliderHeight.value : '0%'));
const sliderButtonBorderRadius = computed(() => (props.isSmooth ? '50%' : '0%'));
const themeColor = computed(() => convert500ThemeToColor(props.theme));
const themeBackground = computed(() => convert500ThemeToColor(props.backgroundColor));
</script>

<template>
  <div
    :class="[
      'slideContainer',
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
    <input type="range" list="values" class="opacity-0 size-0" />

    <div v-if="options?.length">
      <ul class="marksList" :style="`width: ${width ?? 200}px`">
        <li v-for="option of options" :key="option.label">|</li>
      </ul>
      <datalist
        id="values"
        :class="[
          'values',
          {
            datalistVertical: orientation === 'vertical',
          },
        ]"
      >
        <template v-for="option of options" :key="option.value">
          <option
            :value="option.value"
            :label="option.label"
            :style="`color: ${option.color ?? 'white'}`"
          ></option>
        </template>
      </datalist>
    </div>
  </div>
</template>

<style scoped>
.slideContainer {
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
  transform: rotate(270deg);
}
datalist {
  display: flex;
  justify-content: space-between;
  width: v-bind(width);
}
.datalistVertical {
  flex-direction: column;
  writing-mode: vertical-lr;
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
  padding: 0 10px;
}
</style>
