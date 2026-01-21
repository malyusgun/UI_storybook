<script setup lang="ts">
import ComponentDoc from '@/preview/ComponentDoc.vue';
import ComponentProps from '@/preview/ComponentProps.vue';
import Button from './Button.vue';
import Popup from '@components/Popup/Popup.vue';
import { ref } from 'vue';

const keys = [
  'label?',
  'size?',
  'textStyle?',
  'iconPos?',
  'width?',
  'padding?',
  'iconOnly?',
  'theme?',
  'textColor?',
  'darknessTheme?',
  'darknessTextColor?',
];
const values = [
  'string',
  'TSize',
  'TTextStyle',
  'TPosition',
  'string | number',
  'string',
  'boolean',
  'TThemeColor',
  'TThemeColor',
  'TDarkness',
  'TDarkness',
];
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
    name="Button"
    text="Компонент-обёртка для кнопки. Может принимать иконку, её расположение, тему, её тусклость, размер и многое другое. Если цвет текста не передан, то он сам выбирается между чёрным и белым для лучшей контрастности."
    isHorizontalStates
  >
    <Button />

    <Button
      label="My own label"
      theme="green"
      @pointerenter="
        onPointerEnter(
          '#firstButton',
          `label='My own label'
    theme='green'`,
        )
      "
      @pointerleave="isPopupActive = false"
      id="firstButton"
    />

    <Button
      label="Danger!"
      theme="red"
      padding="10px 30px"
      id="secondButton"
      @pointerenter="
        onPointerEnter(
          '#secondButton',
          `label='Danger!'
theme='red'
padding='10px 30px'`,
        )
      "
      @pointerleave="isPopupActive = false"
    />

    <Button
      label="Accept"
      theme="blue"
      darknessTheme="800"
      id="thirdButton"
      @pointerenter="
        onPointerEnter(
          '#thirdButton',
          `label='Accept'
theme='blue'
darknessTheme='800'`,
        )
      "
      @pointerleave="isPopupActive = false"
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
