<script setup lang="ts">
import type { IToastProps } from '@interfaces/componentsProps';
import { computed, ref } from 'vue';
import { convertThemeToColor, getValueFromSize } from '@helpers/common';
import type { TToastType } from '@interfaces/componentsProp';
import { iconsSet } from '@/common/constants/icons';
import CrossIcon from '@icons/Mono/CrossIcon.vue';
import type { TThemeColor } from '@interfaces/common';

const props = withDefaults(defineProps<IToastProps>(), {
  type: 'success',
  text: 'This is a toast about success.',
  size: 'normal',
  width: '300px',
  position: 'topRight',
});

const typeToTheme: Record<TToastType, string> = {
  success: 'green',
  info: 'blue',
  warn: 'yellow',
  error: 'red',
};

const typeToHeader: Record<TToastType, string> = {
  success: 'Success Message',
  info: 'Info Message',
  warn: 'Warn Message',
  error: 'Error Message',
};

const typeToIcon: Record<TToastType, string> = {
  success: 'CheckMark',
  info: 'Info',
  warn: 'Warning',
  error: 'CrossRound',
};

const active = ref<boolean>(false);

const themeColor = computed<TThemeColor>(() => props.theme ?? typeToTheme[props.type]);
const header = computed<string>(() => props.header ?? typeToHeader[props.type]);
const icon = computed(() => props.icon ?? typeToIcon[props.type]);

const color = computed(() => convertThemeToColor(themeColor.value, '400'));
const whiteOrBlack = computed(() => (themeColor.value === 'white' ? 'black' : 'white'));
const backgroundColor = computed(() =>
  convertThemeToColor(
    themeColor.value === 'white' ? 'black' : themeColor.value === 'black' ? 'white' : themeColor.value,
    '800',
  ),
);
const borderColor = computed(() => convertThemeToColor(themeColor.value, '500'));
const fontSize = computed(() => getValueFromSize(props.size, ['12px', '16px', '20px', '24px']));
const padding = computed(() => getValueFromSize(props.size, ['7px 10px', '10px 15px', '14px 20px', '20px 30px']));
const gap = computed(() =>
  props.size === 'normal' ? '10px' : props.size === 'large' || props.size === 'huge' ? '15px' : '5px',
);
const iconSize = computed(() => fontSize.value.slice(0, -2));
const textMargin = computed(() => {
  return +iconSize.value + +gap.value.slice(0, -2) + 'px';
});
const positionParts = computed(() => {
  const result = [];
  const position = props.position.toLowerCase();
  if (position.includes('top')) result.push('top');
  if (position.includes('bottom')) result.push('bottom');
  if (position.includes('left')) result.push('left');
  if (position.includes('right')) result.push('right');
  return result;
});
const activeStyles = computed(() => {
  let result = '';
  if (positionParts.value[0] === 'top') result += 'top: 0;';
  if (positionParts.value[0] === 'bottom') result += 'bottom: 0;';
  if (positionParts.value[1] === 'left') result += 'left: 0;';
  if (positionParts.value[1] === 'right') result += 'right: 0;';
  return result;
});

const closeToast = () => {};
</script>

<template>
  <section
    class="toast-container"
    :style="`position: ${static ? 'relative' : 'absolute'};
    ${positionParts[0]}: ${positionParts[0] === 'top' ? '-100%' : '100%'};
    ${positionParts[1]}: ${positionParts[1] === 'left' ? '-100%' : '100%'};
    ${active ? activeStyles : null}`"
  >
    <h3 class="toast-header" :style="`font-size: calc(${fontSize} + 4px)`">
      <component :is="iconsSet[icon]" :color="color" :size="iconSize" />
      <span class="toast-header-text">{{ header }}</span>
    </h3>
    <p class="toast-text">{{ text }}</p>
    <CrossIcon
      @click="closeToast"
      class="toast-close_button"
      :style="`top: ${padding.split(' ')[0]}; right: ${padding.split(' ')[1]}`"
      :color="color"
      :size="iconSize"
    />
  </section>
</template>

<style scoped>
.toast-container {
  padding: v-bind(padding);
  border: 1px solid v-bind(borderColor);
  border-radius: 5px;
  width: v-bind(width);
  ::before {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    background-color: v-bind(backgroundColor);
    width: 100%;
    height: 100%;
    opacity: 0.55;
    border-radius: 4px;
  }
}
.toast-header {
  display: flex;
  gap: v-bind(gap);
  color: v-bind(color);
  margin-bottom: 5px;
}
.toast-header-text {
  font-weight: 500;
}
.toast-text {
  margin-left: v-bind(textMargin);
  color: v-bind(whiteOrBlack);
  font-size: v-bind(fontSize);
}
.toast-close_button {
  background-color: transparent;
  position: absolute;
  cursor: pointer;
  display: block;
}
</style>
