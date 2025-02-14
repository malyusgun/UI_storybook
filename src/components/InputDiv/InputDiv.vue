<script setup lang="ts">
import type { IInputDivProps } from '@interfaces/componentsProps';
import { computed, type Ref } from 'vue';
import { convertThemeToColor, convertThemeToTextColor, getValueFromSize } from '@helpers/common';
import { calcPartsBy, calcPartsDash } from '@components/InputDiv/helpers';

const props = withDefaults(defineProps<IInputDivProps>(), {
  scheme: '4by1',
  size: 'normal',
  theme: 'white',
  darknessTheme: '500',
  darknessTextColor: '500',
});

const value = defineModel() as Ref<string>;
const container = document.querySelector('#inputDiv-container');

const inputPartsBy = computed(() => calcPartsBy(props.scheme));
const inputPartsDash = computed(() => calcPartsDash(props.scheme));

const themeColor = computed(() => convertThemeToColor(props.theme, props.darknessTheme));
const color = computed(() =>
  props.textColor
    ? convertThemeToColor(props.textColor, props.darknessTextColor)
    : convertThemeToTextColor(props.theme, props.darknessTheme),
);
const inputWidth = computed(() => getValueFromSize(props.size, ['20px', '24px', '30px', '45px']));
const inputHeight = computed(() => getValueFromSize(props.size, ['30px', '36px', '45px', '67px']));
const fontSize = computed(() => getValueFromSize(props.size, ['12px', '16px', '24px', '32px']));
const borderWidth = computed(() => (props.size === 'small' || props.size === 'normal' ? '1px' : '2px'));

const toggleInput = () => {};
</script>

<template>
  <section id="inputDiv-container">
    <div v-show="inputPartsBy" class="list">
      <div
        v-for="(item, itemIndex) of inputPartsBy"
        :key="item"
        :class="[
          'item',
          {
            itemIndex,
          },
        ]"
      >
        <input
          v-for="(input, inputIndex) of item"
          :key="inputIndex"
          @change="toggleInput(itemIndex, inputIndex)"
          type="text"
          :class="[
            'input',
            {
              inputIndex,
            },
          ]"
        />
      </div>
    </div>
    <div v-show="inputPartsDash" class="list">
      <div
        v-for="(item, itemIndex) of inputPartsDash"
        :key="item"
        :class="[
          'item',
          {
            itemIndex,
          },
        ]"
      >
        <input
          v-for="(input, inputIndex) of item"
          :key="inputIndex"
          @change="toggleInput(itemIndex, inputIndex)"
          type="text"
          :class="[
            'input',
            {
              inputIndex,
            },
          ]"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.list {
  display: flex;
  gap: v-bind(fontSize);
}
.input {
  all: unset;
  width: v-bind(inputWidth);
  height: v-bind(inputHeight);
  font-size: v-bind(fontSize);
  text-align: center;
  background-color: v-bind(themeColor);
  color: v-bind(color);
  border: v-bind(borderWidth) solid black;
  border-radius: 5px;
}
</style>
