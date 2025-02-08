<script setup lang="ts">
import type { IToastProps } from '@interfaces/componentsProps';
import { computed } from 'vue';
import { convertThemeToColor } from '@helpers/common';
import type { TToastType } from '@interfaces/componentsProp';

const props = withDefaults(defineProps<IToastProps>(), {
  type: 'success',
  text: 'This is a toast about success.',
  size: 'normal',
  theme: 'green',
});

const typeToHeader: Record<TToastType, string> = {
  success: 'Success Message',
  info: 'Info Message',
  warn: 'Warn Message',
  error: 'Error Message',
};

const header = computed<string>(() => props.header ?? typeToHeader[props.type]);

const color = computed(() => convertThemeToColor(props.theme, '400'));
const whiteOrBlack = computed(() => (props.theme === 'white' ? 'black' : 'white'));
const backgroundColor = computed(() =>
  convertThemeToColor(props.theme === 'white' ? 'black' : props.theme === 'black' ? 'white' : props.theme, '700'),
);
const borderColor = computed(() => convertThemeToColor(props.theme, '500'));
const fontSize = computed(() => {
  const size = props.size;
  if (size === 'normal') return '16px';
  if (size === 'large') return '20px';
  if (size === 'huge') return '24px';
  return '12px';
});
const padding = computed(() => {
  const size = props.size;
  if (size === 'normal') return '5px 11px';
  if (size === 'large') return '6px 13px';
  if (size === 'huge') return '7px 16px';
  return '3px 7px';
});
</script>

<template>
  <section class="toast-container">
    <h3 class="toast-header" :style="`font-size: calc(${fontSize} + 4px)`">{{ header }}</h3>
    <p class="toast-text">{{ text }}</p>
  </section>
</template>

<style scoped>
.toast-container {
  position: absolute;
  padding: v-bind(padding);
  border: 1px solid v-bind(borderColor);
  border-radius: 5px;
  background-color: v-bind(backgroundColor);
}
.toast-header {
  color: v-bind(color);
  margin-bottom: 5px;
}
.toast-text {
  color: v-bind(whiteOrBlack);
  font-size: v-bind(fontSize);
}
</style>
