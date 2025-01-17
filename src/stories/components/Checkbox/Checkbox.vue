<script setup lang="ts">
import type { ICheckboxProps } from '@interfaces/componentsProps';
import { computed } from 'vue';
import { convertThemeToColor, convertThemeToTextColor } from '@helpers/common';
import CheckMarkIcon from '@stories/icons/Mono/CheckMarkIcon.vue';

const props = withDefaults(defineProps<ICheckboxProps>(), {
  label: '',
  name: '',
  labelPos: 'right',
  size: 'normal',
  theme: 'white',
  activeTheme: 'black',
  textColor: 'black',
  borderColor: 'black',
  darknessTheme: '500',
  darknessActiveTheme: '500',
  darknessTextColor: '500',
  darknessBorder: '500',
});
const active = defineModel();
// watch(, () => {});
const themeColor = computed(() => convertThemeToColor(props.theme, props.darknessTheme));
const activeThemeColor = computed(() => convertThemeToColor(props.activeTheme, props.darknessActiveTheme));
const iconColor = computed(() =>
  props.disabled ? '#62708c' : convertThemeToTextColor(props.activeTheme, props.darknessActiveTheme),
);
const color = computed(() => convertThemeToColor(props.textColor, props.darknessTextColor));
const borderColor = computed(() =>
  props.invalid ? 'red' : props.disabled ? '#62708c' : convertThemeToColor(props.borderColor, props.darknessBorder),
);
const elSize = computed(() => {
  const size = props.size;
  if (size === 'normal') return 20;
  if (size === 'large') return 30;
  if (size === 'huge') return 40;
  return 13;
});
const gap = computed(() => {
  if (!props.label) return '0px';
  const size = props.size;
  if (size === 'normal') return '7px';
  if (size === 'large') return '10px';
  if (size === 'huge') return '15px';
  return '5px';
});
const borderWidth = computed(() => (props.size === 'large' || props.size === 'huge' ? 2 : 1));
const borderRadius = computed(() => `${elSize.value / 7 - borderWidth.value}px`);
</script>

<template>
  <section
    :class="[
      'container',
      {
        flexColumn: ['top', 'bottom'].includes(labelPos),
      },
    ]"
    @click.prevent="!disabled ? (active = !active) : ''"
  >
    <div class="main" :style="`width: ${elSize}px; height: ${elSize}px; border: ${borderWidth}px solid ${borderColor}`">
      <input
        :style="`width: ${elSize}px; height: ${elSize}px; position: absolute; z-index: 100; cursor: ${disabled ? 'initial' : 'pointer'}`"
        v-model="active"
        type="checkbox"
        :name="name"
        :value="label"
        :disabled="disabled"
      />
      <div
        :class="[
          {
            inactive: !active,
            active: active,
            disabled: disabled,
          },
        ]"
      >
        <CheckMarkIcon
          :style="`transition: all 0.3s ease-in-out; opacity: ${active ? 1 : 0}; position: absolute;`"
          :color="iconColor"
          :size="elSize"
        />
      </div>
    </div>
    <p
      :class="[
        {
          first: ['top', 'left'].includes(labelPos),
        },
      ]"
      :style="`color: ${color}; line-height: 0.9; font-size: ${elSize}px; pointer-events: none`"
    >
      {{ label }}
    </p>
  </section>
</template>

<style scoped>
.container {
  position: relative;
  display: flex;
  gap: v-bind(gap);
  box-sizing: content-box;
  width: max-content;
}
.main {
  position: relative;
  border-radius: 15%;
}
.inactive {
  height: 100%;
  border-radius: v-bind(borderRadius);

  background-color: v-bind(themeColor);
  transition: all 0.2s ease-in-out;
}
.active {
  width: 100%;
  height: 100%;
  border-radius: v-bind(borderRadius);
  background-color: v-bind(activeThemeColor);
  transition: all 0.2s ease-in-out;
}
.disabled {
  background-color: #e1e7f1 !important;
}
.first {
  order: -1;
}
.flexColumn {
  flex-direction: column;
  align-items: center;
}
input[type='checkbox'] {
  all: unset;
  width: 100%;
}
</style>
