<script setup lang="ts">
import type { ISelectProps } from '@interfaces/componentsProps';
import { computed, ref } from 'vue';
import { convertThemeToColor } from '@helpers/common';
import { iconsSet } from '@/common/constants/icons';
import type { TThemeColor } from '@interfaces/common';

const props = withDefaults(defineProps<ISelectProps>(), {
  size: 'normal',
  width: '200px',
  theme: 'black',
  darknessTheme: '700',
  darknessBackground: '200',
  name: 'select',
  placeholder: 'Nothing selected',
  openIcon: 'ArrowShortDown',
});
const selected = defineModel('value');
// watch(, () => {});
const isOpen = ref<boolean>(false);

const selectedOption = computed(() => props.options.find((option) => option.value === selected.value));
const textColor = computed(() => convertThemeToColor(props.theme, props.darknessTheme));
const backgroundColor = computed(() =>
  convertThemeToColor(
    props.background ?? (props.theme === 'white' ? 'black' : props.theme === 'black' ? 'white' : props.theme),
    (!props.background && props.theme === 'black') || (props.background === 'white' && props.theme === 'black')
      ? '500'
      : props.darknessBackground,
  ),
);
const fontSize = computed(() => {
  const size = props.size;
  if (size === 'normal') return '16px';
  if (size === 'large') return '20px';
  if (size === 'huge') return '24px';
  return '12px';
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
      <button @click.prevent="isOpen = !isOpen" class="button" :style="`width: ${width}`">
        <span
          class="selected"
          :style="`color: ${selected ? calcOptionColor(selectedOption?.color, selectedOption?.darknessColor, textColor) : '#62708c'}; font-weight: 600`"
        >
          <slot :name="`icon-left-${selectedOption?.value}`"></slot>
          <component
            v-if="selectedOption?.iconLeft"
            :is="iconsSet[selectedOption?.iconLeft]"
            :size="fontSize.slice(0, -2)"
            :color="
              calcOptionColor(
                selectedOption.iconColor ?? selectedOption?.color,
                selectedOption?.darknessColor,
                textColor,
              )
            " /><span>{{ selected ?? placeholder }}</span>
          <component
            v-if="selectedOption?.iconRight"
            :is="iconsSet[selectedOption?.iconRight]"
            :size="fontSize.slice(0, -2)"
            :color="
              calcOptionColor(
                selectedOption.iconColor ?? selectedOption?.color,
                selectedOption?.darknessColor,
                textColor,
              )
            " /><slot :name="`icon-right-${selectedOption?.value}`"></slot></span
        ><component
          :is="iconsSet[openIcon]"
          :size="fontSize.slice(0, -2)"
          color="#62708c"
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
          <p
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
          >
            <slot :name="`icon-left-${option.value}`"></slot>
            <component
              v-if="option.iconLeft"
              :is="iconsSet[option.iconLeft]"
              :size="fontSize.slice(0, -2)"
              :color="calcOptionColor(option.iconColor ?? option.color, option.darknessColor, textColor)"
            /><span>{{ option.label ?? option.value }}</span
            ><component
              v-if="option.iconRight"
              :is="iconsSet[option.iconRight]"
              :size="fontSize.slice(0, -2)"
              :color="calcOptionColor(option.iconColor ?? option.color, option.darknessColor, textColor)"
            />
            <slot :name="`icon-right-${option.value}`"></slot>
          </p>
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
  padding: 7px;
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
  padding: 7px;
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
</style>
<!--.list {-->
<!--position: relative;-->
<!--width: max-content;-->
<!--border: 1px solid v-bind(textColor);-->
<!--border-radius: 5px 5px 0 0;-->
<!--cursor: pointer;-->
<!--}-->
<!--.button {-->
<!--display: flex;-->
<!--padding: 7px;-->
<!--justify-content: space-between;-->
<!--gap: 10px;-->
<!--}-->
<!--.selected {-->
<!--display: flex;-->
<!--gap: 5px;-->
<!--}-->
<!--.options {-->
<!--position: absolute;-->
<!--top: 100%;-->
<!--width: 100%;-->
<!--border: 1px solid v-bind(textColor);-->
<!--border-top: none;-->
<!--border-bottom-left-radius: 5px;-->
<!--border-bottom-right-radius: 5px;-->
<!--display: grid;-->
<!--grid-template-rows: 0fr;-->
<!--opacity: 0;-->
<!--transition:-->
<!--all 0.2s ease-in-out,-->
<!--opacity 0.1s ease-in-out;-->
<!--}-->
