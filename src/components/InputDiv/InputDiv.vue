<script setup lang="ts">
import type { IInputDivProps } from '@interfaces/componentsProps';
import { computed, ref, type Ref, watch } from 'vue';
import { convertThemeToColor, convertThemeToTextColor, getValueFromSize } from '@helpers/common';
import { calcPartsBy, calcPartsDash, changeInputHandler, moveFocus } from '@components/InputDiv/helpers';

const props = withDefaults(defineProps<IInputDivProps>(), {
  scheme: '4by1',
  size: 'normal',
  theme: 'white',
  darknessTheme: '500',
  darknessTextColor: '500',
});

const value = defineModel() as Ref<string>;
const valueParts = ref<string[]>([]);

watch(valueParts, () => {
  value.value = valueParts.value.join('');
});
let container: HTMLElement | null;
setTimeout(() => (container = document.querySelector('#inputDiv-container')), 0);

const inputPartsBy = computed(() => calcPartsBy(props.scheme));
const inputPartsDash = computed(() => calcPartsDash(props.scheme));
const indexesToValueIndex = computed(() => {
  const result = {};
  let index = 0;
  if (inputPartsBy.value) {
    const splat = props.scheme.split('by');
    for (const itemIndex of [...Array(+splat[0]).keys()]) {
      for (const inputIndex of [...Array(+splat[1]).keys()]) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        result[itemIndex + '-' + inputIndex] = index++;
      }
    }
  } else {
    const splat = props.scheme.split('-').map((i) => +i);
    for (const item of splat) {
      for (const inputIndex of [...Array(item).keys()]) {
        const itemIndex = splat.indexOf(item);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        result[itemIndex + '-' + inputIndex] = index++;
      }
    }
  }
  return result;
});

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

const toggleInput = (target: any, itemIndex: number, inputIndex: number, backspace?: boolean) =>
  (valueParts.value = changeInputHandler(
    target,
    container!,
    !!inputPartsBy.value,
    valueParts.value,
    indexesToValueIndex.value,
    itemIndex,
    inputIndex,
    backspace ?? false,
  ));
</script>

<template>
  <section id="inputDiv-container">
    <div v-show="inputPartsBy" class="list">
      <div v-for="(item, itemIndex) of inputPartsBy" :key="itemIndex" :class="`item ${itemIndex}`">
        <input
          v-for="(_, inputIndex) of item"
          :key="inputIndex"
          @input="toggleInput($event.target, itemIndex, +inputIndex)"
          @keydown.delete="toggleInput($event.target, itemIndex, +inputIndex, true)"
          @keydown.left="moveFocus('left', container!, !!inputPartsBy, itemIndex, inputIndex)"
          @keydown.right="moveFocus('right', container!, !!inputPartsBy, itemIndex, inputIndex)"
          type="text"
          :class="`input ${inputIndex}`"
          maxlength="2"
        />
      </div>
    </div>
    <div v-show="inputPartsDash" class="list">
      <div v-for="(item, itemIndex) of inputPartsDash" :key="itemIndex" :class="`item ${itemIndex}`">
        <input
          v-for="(_, inputIndex) of item"
          :key="inputIndex"
          @input="toggleInput($event.target, itemIndex, +inputIndex)"
          @keydown.delete="toggleInput($event.target, itemIndex, +inputIndex, true)"
          @keydown.left="moveFocus('left', container!, !!inputPartsBy, itemIndex, inputIndex)"
          @keydown.right="moveFocus('right', container!, !!inputPartsBy, itemIndex, inputIndex)"
          type="text"
          :class="`input ${inputIndex}`"
          maxlength="2"
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
