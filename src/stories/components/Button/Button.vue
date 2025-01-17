<script setup lang="ts">
import { computed } from 'vue';
import type { IButtonProps } from '@interfaces/componentsProps';
import { convertThemeToSecondaryColor, convertThemeToColor, convertThemeToTextColor } from '@helpers/common';

const props = withDefaults(defineProps<IButtonProps>(), {
  size: 'normal',
  theme: 'white',
  iconPos: 'left',
  darknessTheme: '500',
  darknessTextColor: '500',
});

const themeColor = computed(() => convertThemeToColor(props.theme, props.darknessTheme));
const color = computed(() =>
  props.textColor
    ? convertThemeToColor(props.textColor, props.darknessTextColor)
    : convertThemeToTextColor(props.theme, props.darknessTheme),
);
const borderColor = computed(() => convertThemeToSecondaryColor(props.theme, props.darknessTheme));
const width = computed(() => (props.width ? props.width : 'max-content'));
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
  if (props.padding) return props.padding;
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
      :style="`color: ${color}; font-size: ${textSize}`"
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
  display: inline-flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  user-select: none;
  transition: filter 0.2s ease-in-out;
}
.button:hover {
  filter: brightness(90%);
}
.button:active {
  filter: brightness(75%);
}
.background {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 5px;
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
.order-1 {
  order: -1;
}
.border {
  border: 2px solid v-bind(borderColor);
}
</style>
