<script setup lang="ts">
import { computed, type Ref } from 'vue';
import type { ISBProps } from '@interfaces/componentsProps';
import { convertThemeToSecondaryColor, convertThemeToColor, convertThemeToTextColor } from '@helpers/common';
import type { ISBOption } from '@interfaces/componentsProp';

const props = withDefaults(defineProps<ISBProps>(), {
  size: 'normal',
  theme: 'white',
  activeBackgroundColor: 'sky',
  darknessTheme: '500',
  darknessActiveBackgroundColor: '500',
});
const emit = defineEmits(['onClick']);
const value = defineModel() as Ref<string | number | boolean | never>;

const themeColor = computed(() => convertThemeToColor(props.theme, props.darknessTheme));
const color = computed(() =>
  props.textColor
    ? convertThemeToColor(props.textColor, props.darknessTextColor)
    : convertThemeToTextColor(props.theme, props.darknessTheme),
);
const activeBGColorComputed = computed(() =>
  convertThemeToColor(props.activeBackgroundColor, props.darknessActiveBackgroundColor),
);
const borderColor = computed(() => convertThemeToSecondaryColor(props.theme, props.darknessTheme));
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
const calcItemColor = (item: ISBOption) => {
  if ((item.value && value.value === item.value) || String(value.value) === item.label) {
    const activeColor = item.activeColor;
    if (!activeColor) {
      return color.value;
    } else {
      return convertThemeToColor(activeColor, item.darknessActiveColor ?? '500');
    }
  } else {
    const itemColor = item.color;
    if (!itemColor) {
      return color.value;
    } else {
      return convertThemeToColor(itemColor, item.darknessColor ?? '500');
    }
  }
};
const calcBGColorItem = (item: ISBOption) => {
  return (value.value && value.value === item.value) || String(value.value) === item.label
    ? activeBGColorComputed.value
    : item.backgroundColor
      ? convertThemeToColor(item.backgroundColor, item.darknessBackgroundColor ?? '500')
      : themeColor.value;
};
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
        :style="`background-color: ${calcBGColorItem(item)}`"
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
        :style="`color: ${calcItemColor(item)}; font-size: ${textSize}`"
        :class="[
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
