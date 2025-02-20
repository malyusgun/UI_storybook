<script setup lang="ts">
import type { ISelectProps } from '../../common/interfaces/componentsProps';
import { computed, ref, watch } from 'vue';
import { convertThemeToColor, convertThemeToTextColor } from '../../common/helpers/common';
import { iconsSet } from '../../common/constants/icons';
import type { TThemeColor } from '../../common/interfaces/common';
import SelectItem from './SelectItem.vue';
import SearchIcon from '../../icons/Mono/SearchIcon.vue';
import { calcFontSize, calcPadding, getOptionsGroups } from './helpers';

const props = withDefaults(defineProps<ISelectProps>(), {
  options: () => [{ value: 'One' }, { value: 'Two' }],
  size: 'normal',
  width: '200px',
  theme: 'white',
  darknessBackground: '200',
  darknessOpenIcon: '700',
  name: 'select',
  placeholder: 'Nothing selected',
  openIcon: 'ArrowShortDown',
});
const selected = defineModel();
const emit = defineEmits(['update']);

if (props.selected) {
  selected.value = props.selected;
}
const propSelected = computed(() => props.selected);
watch(propSelected, () => (selected.value = propSelected.value));
watch(selected, () => emit('update', selected));

const isOpen = ref<boolean>(false);
const filter = ref<string>('');

const optionsGroups = computed(() => getOptionsGroups(props.options, props.groups, filter.value));
const optionsNoGroup = computed(() =>
  props.options.filter(
    (option) =>
      !option.group &&
      (filter.value ? (option.label ?? option.value).toLowerCase().startsWith(filter.value.toLowerCase()) : true),
  ),
);
const fontSize = computed(() => props.fontSize ?? calcFontSize(props.size));
const padding = computed(() => calcPadding(props.size));
const selectedOption = computed(() => props.options.find((option) => option.value === selected.value));
const selectedTextWidth = computed(() => {
  const numberString = String(parseInt(props.width));
  if (numberString.length + 2 === props.width.length) {
    return +numberString - parseInt(fontSize.value) - parseInt(padding.value) * 2 - 10 + props.width.slice(-2);
  }
  if (numberString.length + 3 === props.width.length) {
    return +numberString - parseInt(fontSize.value) - parseInt(padding.value) * 2 - 10 + props.width.slice(-3);
  }
  return +numberString - parseInt(fontSize.value) - parseInt(padding.value) * 2 - 10 + props.width.slice(-1);
});
const fontSizeNumber = computed(() => fontSize.value.slice(0, -2));
const textColor = computed(() =>
  props.disabled ? '#62708c' : convertThemeToTextColor(props.theme, props.darknessTheme ?? '700'),
);
const borderColor = computed(() => (props.noBorder ? 'transparent' : textColor.value));
const backgroundColor = computed(() =>
  props.noBackground
    ? 'transparent'
    : convertThemeToColor(props.theme, props.theme === 'white' && !props.darknessTheme ? '500' : props.darknessTheme),
);

const pickOption = (value: string) => {
  selected.value = value;
  isOpen.value = false;
};
const calcOptionColor = (color: TThemeColor | undefined, darknessColor: string | undefined, defaultColor: string) =>
  color ? convertThemeToColor(color, darknessColor ?? '500') : defaultColor;

document.querySelector('body')!.addEventListener('pointerup', (e: MouseEvent) => {
  if (isOpen.value && e.button === 0) isOpen.value = false;
});
</script>

<template>
  <section>
    <select :name="name" id="select">
      <option value=""></option>
      <option v-for="option of options" :key="option.value" :selected="selected === option.value">
        {{ option.label ?? option.value }}
      </option>
    </select>
    <div
      :class="[
        'list',
        {
          noHighlight,
        },
      ]"
      :style="`background-color: ${noSelectedBackground ? 'transparent' : backgroundColor}`"
    >
      <button
        @pointerup.stop="!disabled ? (isOpen = !isOpen) : ''"
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
          :option="selectedOption"
          :fontSizeNumber="fontSizeNumber"
          :textColor="textColor"
          :style="`color: ${
            selected
              ? calcOptionColor(selectedOption?.color, selectedOption?.darknessColor, textColor)
              : placeholderColor
                ? convertThemeToColor(placeholderColor, '700')
                : '#62708c'
          }; font-weight: 600`"
        >
          <slot :name="`icon-left-${selectedOption?.value}`"></slot>
          <span class="text" :style="`font-size: ${fontSize}; width: ${selectedTextWidth}`">{{
            selected ?? placeholder
          }}</span>
          <slot :name="`icon-right-${selectedOption?.value}`"></slot>
        </SelectItem>
        <component
          :is="iconsSet[openIcon]"
          :size="fontSizeNumber"
          :color="openIconColor ? convertThemeToColor(openIconColor, darknessOpenIcon) : '#62708c'"
          :style="`min-width: ${fontSize}`"
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
          <div class="flex filter" v-if="filtered" @click="isOpen = true">
            <input v-model="filter" type="text" /><SearchIcon :size="fontSizeNumber" color="#62708c" />
          </div>
          <div v-for="group of optionsGroups" :key="group.name" class="group">
            <h3
              class="flexNoHover groupHeader"
              :style="`color: ${calcOptionColor(group.nameColor, darknessTheme ?? '700', textColor)};
              background-color: ${calcOptionColor(group.background, group.background === 'white' ? '500' : '200', backgroundColor)};
              font-size: calc(${fontSize} * 0.8); padding: calc(${padding} * 0.8)`"
            >
              <component
                v-if="group?.iconLeft"
                :is="iconsSet[group?.iconLeft]"
                :size="fontSizeNumber"
                :color="calcOptionColor(group?.iconLeftColor ?? group.nameColor, darknessTheme ?? '700', textColor)"
              />{{ group.name }}
              <component
                v-if="group?.iconRight"
                :is="iconsSet[group?.iconRight]"
                :size="fontSizeNumber"
                :color="calcOptionColor(group?.iconRightColor ?? group.nameColor, darknessTheme ?? '700', textColor)"
              />
            </h3>
            <SelectItem
              @click.prevent="pickOption(option.value)"
              v-for="option of group.items"
              :key="option.value"
              :width="width"
              :option="option"
              :fontSizeNumber="fontSizeNumber"
              :textColor="textColor"
              :class="[
                'flex',
                {
                  firstOption: options[0].value === option.value,
                  lastOption: options[options.length - 1].value === option.value,
                },
              ]"
              :style="`color: ${calcOptionColor(option.color, option.darknessColor, textColor)};
            background-color: ${calcOptionColor(option.background, option.darknessBackground, backgroundColor)}`"
            >
              <slot :name="`icon-left-${option.value}`"></slot>
              <span class="text" :style="`font-size: ${fontSize}`">{{ option.label ?? option.value }}</span>
              <slot :name="`icon-right-${option.value}`"></slot>
            </SelectItem>
          </div>
          <SelectItem
            @click.prevent="pickOption(option.value)"
            v-for="option of optionsNoGroup"
            :key="option.value"
            :width="width"
            :option="option"
            :fontSizeNumber="fontSizeNumber"
            :textColor="textColor"
            :class="[
              'flex',
              {
                firstOption: options[0].value === option.value,
                lastOption: options[options.length - 1].value === option.value,
              },
            ]"
            :style="`color: ${calcOptionColor(option.color, option.darknessColor, textColor)};
            background-color: ${calcOptionColor(option.background, option.darknessBackground, backgroundColor)}`"
          >
            <slot :name="`icon-left-${option.value}`"></slot>
            <span class="text" :style="`font-size: ${fontSize}`">{{ option.label ?? option.value }}</span>
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
  border: 1px solid v-bind(borderColor);
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
  z-index: 1;
  top: 101%;
  width: 100%;
  border: 1px solid v-bind(borderColor);
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
  z-index: 5000;
}
.group {
  border-top: 1px solid;
}
.groupHeader {
  cursor: auto;
}
.flexNoHover {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: v-bind(padding);
}
.flex {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: v-bind(padding);
}
.flex:hover {
  filter: brightness(85%);
  transition: all 0.1s ease-in-out;
}
.group {
  border-top: 1px solid v-bind(textColor);
  border-bottom: 1px solid v-bind(textColor);
}
.filter {
  cursor: auto;
  gap: 7px;
}
.text {
  display: inline-block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
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
.noHighlight * {
  user-select: none;
}
</style>
