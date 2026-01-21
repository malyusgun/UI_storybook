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
const container = ref<HTMLElement | null>(null);

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
    container.value!,
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
  <div>
    <section ref="container">
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
          :style="`gap: ${inputsGap};`"
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
            :style="`width: ${inputWidth};height: ${inputHeight};font-size: ${fontSize};background-color: ${themeColor};color: ${color};border-top: ${borderWidth} solid ${color};border-bottom: ${borderWidth} solid ${color};border-right: ${borderWidth} solid ${color}; ${bottomOnly ? `border-bottom: ${borderWidth} solid ${color};` : ''}; ${!bottomOnly && inputIndex === 0 ? `border-left: ${borderWidth} solid ${color};` : ''}`"
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
          :style="`gap: ${inputsGap};`"
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
            :style="`width: ${inputWidth};height: ${inputHeight};font-size: ${fontSize};background-color: ${themeColor};color: ${color};border-top: ${borderWidth} solid ${color};border-bottom: ${borderWidth} solid ${color};border-right: ${borderWidth} solid ${color}; ${bottomOnly ? `border-bottom: ${borderWidth} solid ${color};` : ''}; ${!bottomOnly && inputIndex === 0 ? `border-left: ${borderWidth} solid ${color};` : ''}`"
            maxlength="2"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.list {
  display: flex;
  gap: v-bind(gap);
}
.input {
  all: unset;
  text-align: center;
}
.input.bottomOnly {
  border: none;
}
.item {
  position: relative;
  display: flex;
}
.item.dashed::after {
  position: absolute;
  z-index: 2;
  top: calc(50% - 2px);
  color: v-bind(color);
  font-size: v-bind(fontSize);
  right: v-bind(dashRight);
  content: '-';
  width: 10px;
  height: 4px;
  text-align: center;
  line-height: 0;
}
.firstInput {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.lastInput {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>
