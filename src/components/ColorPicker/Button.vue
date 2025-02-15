<script setup lang="ts">
import { computed } from 'vue';
import type { IButtonProps } from '@interfaces/componentsProps';
import { convertThemeToSecondaryColor, convertThemeToColor } from '@helpers/common';

interface Props extends IButtonProps {
  disabled?: boolean;
  color: string | null;
}
const props = withDefaults(defineProps<Props>(), {
  size: 'normal',
  theme: 'white',
  iconPos: 'left',
  darknessTheme: '500',
  darknessTextColor: '500',
});

const themeColor = computed(() => props.color ?? convertThemeToColor(props.theme, props.darknessTheme));
const borderColor = computed(() =>
  props.disabled ? '#62708c' : convertThemeToSecondaryColor(props.theme, props.darknessTheme),
);
const width = computed(() => (props.width ? props.width : 'max-content'));
</script>

<template>
  <div
    :class="[
      'button',
      {
        'flex-column': iconPos === 'top' || iconPos === 'bottom',
        border: borderColor,
      },
    ]"
    :style="`width: ${width}`"
  >
    <span :style="`background-color: ${themeColor}`" class="background"></span>
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
  </div>
</template>

<style scoped>
.button {
  position: relative;
  border-radius: 7px;
  display: inline-flex;
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
  border-radius: 5px;
}
.order-1 {
  order: -1;
}
.border {
  border: 2px solid v-bind(borderColor);
}
</style>
