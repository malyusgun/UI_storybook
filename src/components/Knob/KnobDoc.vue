<script setup lang="ts">
import ComponentDoc from '@/preview/ComponentDoc.vue';
import ComponentProps from '@/preview/ComponentProps.vue';
import Knob from './Knob.vue';
import { ref } from 'vue';
import type { TDarkness, TSize } from '@interfaces/common';

const keys = [
  'value?',
  'min?',
  'max?',
  'step?',
  'size?',
  'width?',
  'theme?',
  'colorGaps?',
  'negativeTheme?',
  'color?',
  'background?',
  'darknessTheme?',
  'darknessNegativeTheme?',
  'darknessColor?',
  'buttons?',
  'showLabel?',
  'colorAsTheme?',
  'fontSize?',
  'textBold?',
  'textBefore?',
  'textAfter?',
];
const values = [
  'number',
  'number',
  'number',
  'number',
  'TSize',
  'string',
  'TThemeColor',
  'IColorGap[]',
  'TThemeColor',
  'TThemeColor',
  'string',
  'TDarkness',
  'TDarkness',
  'TDarkness',
  'boolean',
  'boolean',
  'boolean',
  'string',
  'boolean',
  'string',
  'string',
];

const value = ref();
const value2 = ref();
const value3 = ref();
const value4 = ref();

const isPopupActive = defineModel('isPopupActive', { default: false });
const popupParentSelector = defineModel('popupParentSelector', { default: '#placeholder' });
const popupContent = defineModel('popupContent', { default: '' });

const onPointerEnter = (selector: string, content: string) => {
  isPopupActive.value = true;
  popupParentSelector.value = selector;
  popupContent.value = content;
};
const onPointerEnterProps = (selector: string, content: string) => {
  popupParentSelector.value = '#' + selector;
  popupContent.value = content;
  isPopupActive.value = true;
};
</script>

<template>
  <ComponentDoc
    name="Knob"
    text="Компонент ввода числового значения в виде круга с возможностью менять значение нажатием по круговой области (если не отключена определением 'buttons')."
    is-horizontal-states
  >
    <Knob v-model="value" />

    <Knob
      v-model="value2"
      size="small"
      :value="5"
      :max="10"
      theme="red"
      negativeTheme="amber"
      @pointerenter="
        onPointerEnter(
          '#firstKnob',
          `size='small'
:value='5'
:max='10'
theme='red'
negativeTheme='amber'
`,
        )
      "
      @pointerleave="isPopupActive = false"
      id="firstKnob"
    />

    <Knob
      v-model="value3"
      size="large"
      :min="3"
      :max="30"
      :step="3"
      :colorGaps="[
        {
          start: 3,
          end: 10,
          color: 'red',
        },
        {
          start: 11,
          end: 20,
          color: 'yellow',
          darknessColor: '600',
        },
        {
          start: 21,
          end: 30,
          color: 'green',
        },
      ]"
      background="#5aa"
      textBold
      textBefore="!"
      @pointerenter="
        onPointerEnter(
          '#secondKnob',
          `size='large'
:min='3'
:max='30'
:step='3'
scheme='4by3'
:colorGaps='[
  {
  start: 3,
  end: 10,
  color: 'red',
  },
  {
    start: 11,
    end: 20,
    color: 'yellow',
    darknessColor: '600',
  },
  {
    start: 21,
    end: 30,
    color: 'green',
  },
]'
background='#5aa'
textBold
textBefore='!'`,
        )
      "
      @pointerleave="isPopupActive = false"
      id="secondKnob"
    />

    <Knob
      v-model="value4"
      size="huge"
      buttons
      textAfter="@"
      @pointerenter="
        onPointerEnter(
          '#thirdKnob',
          `size='huge'
buttons
textAfter='@'`,
        )
      "
      @pointerleave="isPopupActive = false"
      id="thirdKnob"
    />
    <template #props>
      <ComponentProps
        :keys="keys"
        :values="values"
        @pointerEnter="onPointerEnterProps"
        @pointerLeave="isPopupActive = false"
      />
    </template>
  </ComponentDoc>
</template>

<style scoped></style>
