<script setup lang="ts">
import { computed } from 'vue';
import type { TThemeColor } from '@interfaces/common';
import { convert500ThemeToColor } from '@helpers/colors';

const props = withDefaults(
  defineProps<{
    label?: string;
    size?: 'small' | 'medium' | 'large' | 'huge';
    textStyle?: 'bold' | 'italic';
    iconPos?: 'left' | 'top' | 'right' | 'bottom';
    width?: string | number;
    theme?: TThemeColor;
    textColor?: TThemeColor;
    border?: TThemeColor;
    iconOnly?: boolean;
  }>(),
  {
    size: 'medium',
    theme: 'white',
    textColor: 'black',
    iconPos: 'left',
  },
);
const themeColor = computed(() => convert500ThemeToColor(props.theme));
const textColor = computed(() => convert500ThemeToColor(props.textColor));
const borderColor = computed(() => (props.border ? convert500ThemeToColor(props.border) : ''));
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
  switch (props.size) {
    case 'small':
      return '0.5rem 0.375rem';
    case 'large':
      return '1.2rem 0.8rem';
    case 'huge':
      return '1.8rem 1.2rem';
  }
  return '0.75rem 0.5rem';
});
const width = computed(() => (props.width ? `${props.width}px` : 'max-content'));
</script>

<template>
  <button
    :class="[
      'button',
      {
        'flex-column': iconPos === 'top' || iconPos === 'bottom',
        border: borderColor,
      },
    ]"
    :style="`padding: ${buttonPadding}; width: ${width}`"
  >
    <span :style="`background-color: ${themeColor}`" class="background"></span>
    <span
      v-if="label || !iconOnly"
      :style="`color: ${textColor}; font-size: ${textSize}`"
      :class="[
        'text',
        {
          bold: textStyle === 'bold',
          italic: textStyle === 'italic',
        },
      ]"
      >{{ label ? label : !iconOnly ? 'Button' : '' }}</span
    >
    <span
      v-if="$slots.default"
      :class="[
        'icon',
        {
          'order-1': iconPos === 'left' || iconPos === 'top',
        },
      ]"
    >
      <slot />
    </span>
  </button>
</template>

<style scoped>
.button {
  position: relative;
  border-radius: 7px;
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  user-select: none;
}
.button:hover .background {
  filter: brightness(90%);
}
.button:active .background {
  filter: brightness(75%);
}
.background {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 5px;
  transition: filter 0.2s ease-in-out;
}
.text {
  position: relative;
  z-index: 2;
  line-height: 1;
}
.icon {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}
.flex-column {
  flex-direction: column;
}
.order-1 {
  order: -1;
}
.bold {
  font-weight: bold;
}
.italic {
  font-style: italic;
}
.border {
  border: 2px solid v-bind(borderColor);
}
</style>
