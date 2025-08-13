<script setup lang="ts">
import type { ITagProps } from '@interfaces/componentsProps';
import { computed, ref } from 'vue';
import { convertThemeToColor, getValueFromSize } from '@helpers/common';
import { iconsSet } from '@/common/constants/icons';

const props = withDefaults(defineProps<ITagProps>(), {
  size: 'normal',
  theme: 'black',
  darknessTheme: '700',
  darknessBackground: '200',
  darknessBorder: '500',
});

const value = defineModel('value');
const changed = ref(false);
if (!value.value) value.value = 'Tag';

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

function adjustWidth(input: HTMLInputElement) {
  changed.value = true;
  const tempSpan = document.createElement('span');
  document.body.appendChild(tempSpan);
  tempSpan.style.visibility = 'hidden';
  tempSpan.style.whiteSpace = 'pre';
  tempSpan.innerText = input.value || input.placeholder;
  input.style.width = `${tempSpan.offsetWidth + 10}px`;
  document.body.removeChild(tempSpan);
}
</script>

<template>
  <div>
    <section
      class="container"
      :style="`border-radius: ${rounded ? fontSize : `calc(${fontSize} / 2)`}; gap: calc(${fontSize} / 2.5); border: ${['normal', 'small'].includes(size) ? '1px' : '2px'} solid ${borderColor}`"
    >
      <slot name="icon-left"></slot>
      <component v-show="iconLeft" :is="iconsSet[iconLeft ?? 0]" :color="textColor" :size="fontSize.slice(0, -2)" />
      <span v-show="!changed" class="text">{{ value }}</span>
      <input
        v-show="changed"
        type="text"
        class="text"
        v-model="value"
        @loadstart="adjustWidth($event.target as HTMLInputElement)"
        @input="adjustWidth($event.target as HTMLInputElement)"
      />
      <component v-show="iconRight" :is="iconsSet[iconRight ?? 0]" :color="textColor" :size="fontSize.slice(0, -2)" />
      <slot name="icon-right"></slot>
    </section>
  </div>
</template>

<style scoped>
.container {
  display: inline-flex;
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
