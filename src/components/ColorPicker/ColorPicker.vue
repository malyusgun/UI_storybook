<script setup lang="ts">
import type { IColorPickerProps } from '@interfaces/componentsProps';
import { computed, type Ref } from 'vue';
import Button from './Button.vue';
import { convertThemeToColor, convertThemeToTextColor } from '@helpers/common';

const props = withDefaults(defineProps<IColorPickerProps>(), {
  size: 'normal',
  disabled: false,
});

const value = defineModel() as Ref<string>;
const size = computed(() => {
  const size = props.size;
  if (size === 'normal') return '25px';
  if (size === 'large') return '40px';
  if (size === 'huge') return '60px';
  return '15px';
}) as Ref<string>;
const borderWidth = computed(() => (props.size === 'small' ? '2px' : '3px')) as Ref<string>;
const borderRadius = computed(() => `calc(${size.value} * 0.3)`);

function wc_hex_is_light(color: string | undefined) {
  if (!color) return true;
  const hex = color.replace('#', '');
  const c_r = parseInt(hex.substring(0, 2), 16);
  const c_g = parseInt(hex.substring(2, 4), 16);
  const c_b = parseInt(hex.substring(4, 6), 16);
  const brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;
  return brightness > 150;
}

const color = computed(() =>
  props.buttonProps?.textColor
    ? convertThemeToColor(props.buttonProps.textColor, props.buttonProps?.darknessTextColor)
    : props.sameButtonColor
      ? !wc_hex_is_light(value?.value)
        ? 'white'
        : 'black'
      : convertThemeToTextColor(props.buttonProps?.theme ?? 'white', props.buttonProps?.darknessTheme),
);
const textSize = computed(() => {
  switch (props.size) {
    case 'small':
      return '12px';
    case 'large':
      return '20px';
    case 'huge':
      return '28px';
  }
  return '16px';
});
const buttonPadding = computed(() => {
  if (props.buttonProps?.padding) return props.buttonProps?.padding;
  switch (props.size) {
    case 'small':
      return '0.5rem';
    case 'large':
      return '1.2rem';
    case 'huge':
      return '1.8rem';
  }
  return '0.75rem';
});
</script>

<template>
  <div class="container">
    <Button
      v-if="buttonProps"
      v-bind="buttonProps"
      :color="sameButtonColor ? value : null"
      :class="{
        disabledButton: disabled,
      }"
      :disabled="disabled"
    >
      <label
        for="inputColor"
        :style="`padding: ${buttonPadding}; color: ${color}; font-size: ${textSize}`"
        :class="[
          'text',
          {
            bold: buttonProps && buttonProps?.textStyle === 'bold',
            italic: buttonProps && buttonProps?.textStyle === 'italic',
          },
        ]"
        >{{ buttonProps?.label ?? 'Button' }}</label
      >
    </Button>
    <input
      type="color"
      id="inputColor"
      v-model="value"
      :disabled="disabled"
      :class="{
        noVisible: !!buttonProps,
        disabled: disabled,
      }"
    />
  </div>
</template>

<style scoped>
.container {
  position: relative;
}
.noVisible {
  opacity: 0;
  position: absolute;
  bottom: 0;
  left: 0;
}
.text {
  border-radius: 5px;
}
.disabledButton {
  * {
    background-color: #e1e7f1 !important;
    color: #62708c !important;
  }
  pointer-events: none;
}
.disabled {
  border-color: #62708c !important;
  cursor: auto;
}
input {
  position: absolute;
  z-index: -1;
  -webkit-appearance: none;
  appearance: none;
  border: v-bind(borderWidth) solid black;
  border-radius: v-bind(borderRadius);
  outline: none;
  width: v-bind(size);
  height: v-bind(size);
  padding: 0;
  background-color: transparent;
  cursor: pointer;
}
input[type='color']::-webkit-color-swatch-wrapper {
  padding: 0;
}

input[type='color']::-webkit-color-swatch {
  border: none;
}
</style>
