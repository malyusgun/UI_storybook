<script setup lang="ts">
import type { IInputDivProps } from '../../common/interfaces/componentsProps';
import { computed, ref, type Ref, watch } from 'vue';
import { convertThemeToColor, convertThemeToTextColor, getValueFromSize } from '../../common/helpers/common';
import { calcIndexesToValueindex, calcPartsBy, calcPartsDash, changeInputHandler, moveFocus } from './helpers';

const props = withDefaults(defineProps<IInputDivProps>(), {
  scheme: '4by1',
  size: 'normal',
  theme: 'white',
  darknessTheme: '500',
  darknessTextColor: '500',
});

const value = defineModel() as Ref<string>;
const valueParts = ref<string[]>([]);

watch(
  valueParts,
  () => {
    value.value = valueParts.value.join('');
  },
  { deep: true },
);
let container: HTMLElement | null;
setTimeout(() => (container = document.querySelector('#inputDiv-container')), 0);

const inputPartsBy = computed(() => calcPartsBy(props.scheme));
const isInputPartsBy = computed(() => !!inputPartsBy.value);
const inputPartsDash = computed(() => calcPartsDash(props.scheme));
const indexesToValueIndex = computed(() => calcIndexesToValueindex(isInputPartsBy.value, props.scheme));

const themeColor = computed(() => convertThemeToColor(props.theme, props.darknessTheme));
const color = computed(() =>
  props.textColor
    ? convertThemeToColor(props.textColor, props.darknessTextColor)
    : convertThemeToTextColor(props.theme, props.darknessTheme),
);
const inputWidth = computed(() => getValueFromSize(props.size, ['20px', '24px', '30px', '45px']));
const inputHeight = computed(() => getValueFromSize(props.size, ['30px', '36px', '45px', '67px']));
const fontSize = computed(() => getValueFromSize(props.size, ['12px', '16px', '24px', '32px']));
const gap = computed(() => props.gap ?? fontSize.value);
const dashRight = computed(() => +gap.value.slice(0, -2) * -0.5 - 5 + 'px');
const borderWidth = computed(() => (props.size === 'small' || props.size === 'normal' ? '1px' : '2px'));

const toggleInput = (target: any, itemIndex: number, inputIndex: number, backspace?: boolean) =>
  (valueParts.value = changeInputHandler(
    target,
    container!,
    isInputPartsBy.value,
    valueParts.value,
    indexesToValueIndex.value,
    itemIndex,
    inputIndex,
    backspace ?? false,
    props.numbersOnly,
    props.regex ?? null,
  ));
</script>

<template>
  <section id="inputDiv-container">
    <div v-show="inputPartsBy" class="list">
      <div
        v-for="(item, itemIndex) of inputPartsBy"
        :key="itemIndex"
        :class="[
          `item ${itemIndex}`,
          {
            dashed: dashed && (inputPartsBy?.length ?? -1) - 1 !== itemIndex,
          },
        ]"
      >
        <input
          v-for="(_, inputIndex) of item"
          :key="inputIndex"
          @input="toggleInput($event.target, itemIndex, +inputIndex)"
          @keydown.delete="toggleInput($event.target, itemIndex, +inputIndex, true)"
          @keydown.left="moveFocus('left', container!, isInputPartsBy, itemIndex, inputIndex)"
          @keydown.right="moveFocus('right', container!, isInputPartsBy, itemIndex, inputIndex)"
          :type="secret ? 'password' : 'text'"
          :class="[
            `input ${inputIndex}`,
            {
              firstInput: !bottomOnly && inputIndex === 0,
              lastInput: !bottomOnly && inputPartsBy && inputIndex === inputPartsBy[itemIndex].length - 1,
              bottomOnly,
            },
          ]"
          maxlength="2"
        />
      </div>
    </div>
    <div v-show="inputPartsDash" class="list">
      <div
        v-for="(item, itemIndex) of inputPartsDash"
        :key="itemIndex"
        :class="[
          `item ${itemIndex}`,
          {
            dashed: dashed && (inputPartsDash?.length ?? -1) - 1 !== itemIndex,
          },
        ]"
      >
        <input
          v-for="(_, inputIndex) of item"
          :key="inputIndex"
          @input="toggleInput($event.target, itemIndex, +inputIndex)"
          @keydown.delete="toggleInput($event.target, itemIndex, +inputIndex, true)"
          @keydown.left="moveFocus('left', container!, isInputPartsBy, itemIndex, inputIndex)"
          @keydown.right="moveFocus('right', container!, isInputPartsBy, itemIndex, inputIndex)"
          :type="secret ? 'password' : 'text'"
          :class="[
            `input ${inputIndex}`,
            {
              firstInput: !bottomOnly && inputIndex === 0,
              lastInput: !bottomOnly && inputPartsDash && inputIndex === inputPartsDash[itemIndex].length - 1,
              bottomOnly,
            },
          ]"
          maxlength="2"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.list {
  display: flex;
  gap: v-bind(gap);
}
.input {
  all: unset;
  width: v-bind(inputWidth);
  height: v-bind(inputHeight);
  font-size: v-bind(fontSize);
  text-align: center;
  background-color: v-bind(themeColor);
  color: v-bind(color);
  border-top: v-bind(borderWidth) solid v-bind(color);
  border-bottom: v-bind(borderWidth) solid v-bind(color);
  border-right: v-bind(borderWidth) solid v-bind(color);
}
.input.bottomOnly {
  border: none;
  border-bottom: v-bind(borderWidth) solid v-bind(color);
}
.item {
  position: relative;
  display: flex;
  gap: v-bind(inputsGap);
}
.item.dashed::after {
  position: absolute;
  color: v-bind(color);
  z-index: 2;
  top: calc(50% - 2px);
  right: v-bind(dashRight);
  content: '-';
  width: 10px;
  height: 4px;
  text-align: center;
  line-height: 0;
  font-size: v-bind(fontSize);
}
.firstInput {
  border-left: v-bind(borderWidth) solid v-bind(color);
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.lastInput {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>
