<script setup lang="ts">
import { computed } from 'vue';
import type { ITSProps } from '@interfaces/componentsProps';
import { convertThemeToColor } from '@helpers/common';

const props = withDefaults(defineProps<ITSProps>(), {
  size: 'normal',
  theme: 'sky',
  negativeTheme: 'black',
  darknessTheme: '500',
  darknessNegativeTheme: '500',
});
const active = defineModel<boolean>('active');

const themeColor = computed(() => convertThemeToColor(props.theme, props.darknessTheme));
const inactiveColor = computed(() => convertThemeToColor(props.negativeTheme, props.darknessNegativeTheme));
const sizes = computed(() => {
  if (!props?.size) {
    return {
      containerWidth: 37,
      containerHeight: 21,
      padding: 3,
      borderRadius: 11,
      circleSize: 15,
      transformXCircle: 16,
    };
  }
  switch (props.size) {
    case 'small':
      return {
        containerWidth: 28,
        containerHeight: 16,
        padding: 3,
        borderRadius: 8,
        circleSize: 10,
        transformXCircle: 12,
      };
    case 'large':
      return {
        containerWidth: 45,
        containerHeight: 27,
        padding: 4,
        borderRadius: 14,
        circleSize: 19,
        transformXCircle: 18,
      };
    case 'huge':
      return {
        containerWidth: 70,
        containerHeight: 42,
        padding: 6,
        borderRadius: 21,
        circleSize: 30,
        transformXCircle: 28,
      };
  }
  return {
    containerWidth: 37,
    containerHeight: 21,
    padding: 3,
    borderRadius: 11,
    circleSize: 15,
    transformXCircle: 16,
  };
});
</script>

<template>
  <button
    :style="`width: ${sizes.containerWidth}px; min-height: ${sizes.containerHeight}px; border-radius: ${sizes.borderRadius}px; padding: ${sizes.padding}px; cursor: ${disabled ? 'auto' : 'pointer'}`"
    class="switcher"
    @click.prevent="!disabled && (active = !active)"
  >
    <span
      :style="`background-color: ${disabled ? '#e1e7f1 !important' : themeColor}; border-radius: ${sizes.borderRadius}px;`"
      :class="[
        'background',
        {
          inactiveBackground: !active && !disabled,
        },
      ]"
    ></span>
    <span
      :style="`width: ${sizes.circleSize}px; height: ${sizes.circleSize}px; transform: translateX(${active ? sizes.transformXCircle : 0}px); background-color: ${disabled ? '#62708c' : 'white'}`"
      class="switcherCircle"
    ></span>
  </button>
</template>

<style scoped>
.switcher {
  position: relative;
}
.background {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all 0.2s ease-in-out;
}
.inactiveBackground {
  background-color: v-bind(inactiveColor) !important;
  transition: all 0.2s ease-in-out;
}
.switcher:hover .background {
  filter: brightness(90%);
}
.switcherCircle {
  display: block;
  border-radius: 50%;
  transition: transform 0.2s ease-in-out;
}
</style>
