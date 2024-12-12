<script setup lang="ts">
import { computed } from 'vue';
import type { TThemeColor } from '@interfaces/common';
import { convert500ThemeToColor } from '@helpers/colors';

const props = withDefaults(
  defineProps<{
    options: {
      label: string;
      value?: never;
      color?: TThemeColor;
      activeColor?: TThemeColor;
      backgroundColor?: TThemeColor;
      isLabelHidden?: boolean;
      iconPosition?: 'left' | 'right' | 'top' | 'bottom';
      textStyle?: 'bold' | 'italic';
    }[];
    size?: 'small' | 'medium' | 'large' | 'huge';
    rounded?: boolean;
    activeBgColor?: TThemeColor;
    border?: TThemeColor;
    disabled?: boolean;
  }>(),
  {
    size: 'medium',
    border: 'black',
    activeBgColor: 'sky',
  },
);
const emit = defineEmits(['onClick']);
const value = defineModel<boolean>('value');

const activeBgColor = computed(() =>
  props.activeBgColor ? convert500ThemeToColor(props.activeBgColor) : '',
);
const borderColor = computed(() => (props.border ? convert500ThemeToColor(props.border) : ''));
const textSize = computed(() => {
  switch (props.size) {
    case 'small':
      return '12px';
    case 'large':
      return '20px';
    case 'huge':
      return '24px';
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
const buttonHeight = computed(() => {
  switch (props.size) {
    case 'small':
      return '24px';
    case 'large':
      return '68px';
    case 'huge':
      return '114px';
  }
  return '40px';
});
</script>

<template>
  <div
    :class="[
      'buttonGroup',
      {
        'rounded-full': props.rounded,
        border: borderColor,
        disabled: disabled,
      },
    ]"
  >
    <button
      v-for="(item, index) of options"
      :key="item.label"
      :class="[
        'button',
        {
          'flex-column': item.iconPosition === 'top' || item.iconPosition === 'bottom',
        },
      ]"
      :style="`padding: ${buttonPadding}`"
      @click.prevent="
        () => {
          value = item?.value ?? item.label;
          emit('onClick', value);
        }
      "
    >
      <span
        :style="`background-color: ${activeBgColor && (value === item.value || value === item.label) ? activeBgColor : convert500ThemeToColor(item.backgroundColor ?? 'white')}`"
        :class="[
          'background',
          {
            'rounded-left': index === 0,
            'rounded-left-full': index === 0 && props.rounded,
            'rounded-right': index === options.length - 1,
            'rounded-right-full': index === options.length - 1 && props.rounded,
          },
        ]"
      ></span>
      <span
        v-if="!item.isLabelHidden"
        :style="`color: ${value === item.value || value === item.label ? item.activeColor : convert500ThemeToColor(item.color ?? 'black')}; font-size: ${textSize}`"
        :class="[
          'text',
          {
            bold: item.textStyle === 'bold',
            italic: item.textStyle === 'italic',
          },
        ]"
        >{{ item.label ?? index }}</span
      >
      <div
        :class="[
          'icon',
          {
            'order-1': item.iconPosition === 'left' || item.iconPosition === 'top',
          },
        ]"
      >
        <slot :name="`${index + 1}Icon`" />
      </div>
    </button>
  </div>
</template>

<style scoped>
.buttonGroup {
  width: max-content;
  display: flex;
  border-radius: 0.75rem;
  position: relative;
}
.button {
  position: relative;
  display: flex;
  gap: 8px;
  align-items: center;
  user-select: none;
}
.button:hover .background {
  filter: brightness(90%);
}
.background {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -2;
  top: 0;
  left: 0;
  transition: filter 0.2s ease-in-out;
}
.icon {
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
.rounded-left {
  border-radius: 0.5rem 0 0 0.5rem;
}
.rounded-left-full {
  border-radius: v-bind(buttonHeight) 0 0 v-bind(buttonHeight);
}
.rounded-right {
  border-radius: 0 0.5rem 0.5rem 0;
}
.rounded-right-full {
  border-radius: 0 v-bind(buttonHeight) v-bind(buttonHeight) 0;
}
.rounded-full {
  border-radius: v-bind(buttonHeight);
}
.disabled {
  pointer-events: none;
  background-color: #e1e7f1;
}
.disabled * {
  color: #62708c !important;
}
</style>
