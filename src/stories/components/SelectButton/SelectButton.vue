<script setup lang="ts">
import { computed } from 'vue';
import type { ISBProps } from '@interfaces/componentsProps';
import { convertThemeToColor } from '@helpers/common';

const props = withDefaults(defineProps<ISBProps>(), {
  size: 'normal',
  activeBackgroundColor: 'sky',
  darknessActiveBackgroundColor: 500,
  darknessBorder: 500,
});
const emit = defineEmits(['onClick']);
const value = defineModel<never>('value');

const activeBackgroundColorComputed = computed(() =>
  props.activeBackgroundColor
    ? convertThemeToColor(props.activeBackgroundColor, props.darknessActiveBackgroundColor)
    : '',
);
const borderColor = computed(() =>
  !props.border ? '' : convertThemeToColor(props.border, props.darknessBorder),
);
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
          value = (item.value as never) ?? item.label;
          emit('onClick', value);
        }
      "
    >
      <span
        :style="`background-color: ${activeBackgroundColorComputed && ((value && value === item.value) || value === item.label) ? activeBackgroundColorComputed : convertThemeToColor(item.backgroundColor ?? 'white', item.darknessBackgroundColor ?? 500)}`"
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
        :style="`color: ${(item.value && value === item.value) || value === item.label ? convertThemeToColor(item.activeColor ?? 'black', item.darknessActiveColor ?? 500) : convertThemeToColor(item.color ?? 'black', item.darknessColor ?? 500)}; font-size: ${textSize}`"
        :class="[
          'text',
          {
            bold: item.textStyle === 'bold',
            italic: item.textStyle === 'italic',
          },
        ]"
        >{{ item.label ?? index }}</span
      >
      <span
        v-if="$slots[`${index + 1}Icon`]"
        :class="[
          'icon',
          {
            'order-1': item.iconPosition === 'left' || item.iconPosition === 'top',
          },
        ]"
      >
        <slot :name="`${index + 1}Icon`" />
      </span>
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
.button:active .background {
  filter: brightness(75%);
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
.order-1 {
  order: -1;
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
