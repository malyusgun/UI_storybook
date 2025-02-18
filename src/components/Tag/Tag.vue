<script setup lang="ts">
import type { ITagProps } from '../../common/interfaces/componentsProps';
import { computed } from 'vue';
import { convertThemeToColor, getValueFromSize } from '../../common/helpers/common';
import { iconsSet } from '../../common/constants/icons';

const props = withDefaults(defineProps<ITagProps>(), {
  value: 'Tag',
  size: 'normal',
  theme: 'black',
  darknessTheme: '700',
  darknessBackground: '200',
  darknessBorder: '500',
});
const textColor = computed(() => convertThemeToColor(props.theme, props.darknessTheme));
const backgroundColor = computed(() =>
  convertThemeToColor(
    props.background ?? (props.theme === 'white' ? 'black' : props.theme === 'black' ? 'white' : props.theme),
    props.darknessBackground,
  ),
);
const borderColor = computed(() =>
  props.border ? convertThemeToColor(props.border, props.darknessBorder) : 'transparent',
);
const fontSize = computed(() => getValueFromSize(props.size, ['12px', '16px', '20px', '24px']));
const padding = computed(() => getValueFromSize(props.size, ['3px 7px', '5px 11px', '6px 13px', '7px 16px']));
</script>

<template>
  <div
    class="container"
    :style="`border-radius: ${rounded ? fontSize : `calc(${fontSize} / 2)`}; gap: calc(${fontSize} / 2.5); border: ${['normal', 'small'].includes(size) ? '1px' : '2px'} solid ${borderColor}`"
  >
    <slot name="icon-left"></slot>
    <component v-show="iconLeft" :is="iconsSet[iconLeft ?? 0]" :color="textColor" :size="fontSize.slice(0, -2)" />
    <span class="text">{{ value }}</span>
    <component v-show="iconRight" :is="iconsSet[iconRight ?? 0]" :color="textColor" :size="fontSize.slice(0, -2)" />
    <slot name="icon-right"></slot>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  width: max-content;
  padding: v-bind(padding);
  align-items: center;
  background-color: v-bind(backgroundColor);
}
.text {
  font-weight: bold;
  font-size: v-bind(fontSize);
  color: v-bind(textColor);
}
</style>
