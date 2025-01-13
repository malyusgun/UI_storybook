<script setup lang="ts">
import type { ISelectProps } from '@interfaces/componentsProps';
import { computed, ref } from 'vue';
import { convertThemeToColor } from '@helpers/common';
import { iconsSet } from '@/common/constants/icons';
import type { TThemeColor } from '@interfaces/common';
import SelectItem from '@stories/components/Select/SelectItem.vue';

const props = withDefaults(defineProps<ISelectProps>(), {
  size: 'normal',
  width: '200px',
  theme: 'black',
  darknessTheme: '700',
  darknessBackground: '200',
  darknessOpenIcon: '700',
  name: 'select',
  placeholder: 'Nothing selected',
  openIcon: 'ArrowShortDown',
});
const selected = defineModel('value');
const isOpen = ref<boolean>(false);

const selectedOption = computed(() => props.options.find((option) => option.value === selected.value));
const textColor = computed(() => (props.disabled ? '#62708c' : convertThemeToColor(props.theme, props.darknessTheme)));
const backgroundColor = computed(() =>
  convertThemeToColor(
    props.background ?? (props.theme === 'white' ? 'black' : props.theme === 'black' ? 'white' : props.theme),
    (!props.background && props.theme === 'black') || props.background === 'white' ? '500' : props.darknessBackground,
  ),
);
const fontSize = computed(() => {
  const size = props.size;
  if (size === 'normal') return '16px';
  if (size === 'large') return '20px';
  if (size === 'huge') return '24px';
  return '12px';
});
const padding = computed(() => {
  const size = props.size;
  if (size === 'normal') return '6px';
  if (size === 'large') return '10px';
  if (size === 'huge') return '14px';
  return '4px';
});

const pickOption = (value: string) => {
  selected.value = value;
  isOpen.value = false;
};
const calcOptionColor = (color: TThemeColor | undefined, darknessColor: string | undefined, defaultColor: string) =>
  color ? convertThemeToColor(color, darknessColor ?? '500') : defaultColor;
</script>

<template>
  <section>
    <select :name="name" id="select">
      <option value=""></option>
      <option v-for="option of options" :key="option.value" :selected="selected === option.value">
        {{ option.label ?? option.value }}
      </option>
    </select>
    <div class="list" :style="`background-color: ${backgroundColor}`">
      <button
        @click.prevent="!disabled ? (isOpen = !isOpen) : ''"
        :class="[
          'button',
          {
            disabled: disabled,
          },
        ]"
        :style="`width: ${width}`"
      >
        <SelectItem
          class="selected"
          :style="`color: ${selected ? calcOptionColor(selectedOption?.color, selectedOption?.darknessColor, textColor) : placeholderColor ? convertThemeToColor(placeholderColor, '700') : '#62708c'}; font-weight: 600`"
          :option="selectedOption"
          :fontSize="fontSize"
          :textColor="textColor"
        >
          <slot :name="`icon-left-${selectedOption?.value}`"></slot>
          <span :style="`font-size: ${fontSize}`">{{ selected ?? placeholder }}</span>
          <slot :name="`icon-right-${selectedOption?.value}`"></slot>
        </SelectItem>
        <component
          :is="iconsSet[openIcon]"
          :size="fontSize.slice(0, -2)"
          :color="openIconColor ? convertThemeToColor(openIconColor, darknessOpenIcon) : '#62708c'"
          :style="`width: ${fontSize}`"
        />
      </button>
      <div
        :class="[
          'options',
          {
            optionsOpened: isOpen,
          },
        ]"
      >
        <div style="overflow: hidden">
          <SelectItem
            @click.prevent="pickOption(option.value)"
            v-for="option of options"
            :key="option.value"
            :class="[
              'option',
              {
                firstOption: options[0].value === option.value,
                lastOption: options[options.length - 1].value === option.value,
              },
            ]"
            :style="`color: ${calcOptionColor(option.color, option.darknessColor, textColor)};
            background-color: ${calcOptionColor(option.background, option.darknessBackground, backgroundColor)}`"
            :option="option"
            :fontSize="fontSize"
            :textColor="textColor"
          >
            <slot :name="`icon-left-${option.value}`"></slot>
            <span :style="`font-size: ${fontSize}`">{{ option.label ?? option.value }}</span>
            <slot :name="`icon-right-${option.value}`"></slot>
          </SelectItem>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
#select {
  display: none;
}
.list {
  position: relative;
  width: max-content;
  border: 1px solid v-bind(textColor);
  border-radius: 5px;
  cursor: pointer;
}
.button {
  display: flex;
  padding: v-bind(padding);
  justify-content: space-between;
  gap: 10px;
}
.selected {
  display: flex;
  gap: 5px;
}
.options {
  position: absolute;
  z-index: 5000;
  top: 101%;
  width: 100%;
  border: 1px solid v-bind(textColor);
  border-radius: 5px;
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transition:
    all 0.2s ease-in-out,
    opacity 0.1s ease-in-out;
}
.optionsOpened {
  grid-template-rows: 1fr;
  opacity: 1;
}
.option {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: v-bind(padding);
}
.option:hover {
  filter: brightness(90%);
  transition: all 0.1s ease-in-out;
}
.group {
  border-top: 1px solid v-bind(textColor);
}
.firstOption {
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
}
.lastOption {
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
}
.disabled {
  cursor: auto;
  background-color: #e1e7f1 !important;
  border-radius: 4px;
}
</style>
