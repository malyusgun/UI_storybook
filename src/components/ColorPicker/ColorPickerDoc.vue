<script setup lang="ts">
import ComponentDoc from '@/preview/ComponentDoc.vue';
import ComponentProps from '@/preview/ComponentProps.vue';
import ColorPicker from './ColorPicker.vue';

const text =
  'Флажок из двух значений с настройкой внешнего вида и возможностью установки текста, а также его положения: верх, низ, лево или право.';
const keys = [
  'active?',
  'label?',
  'labelPos?',
  'name?',
  'size?',
  'disabled',
  'invalid?',
  'theme?',
  'activeTheme?',
  'textColor?',
  'borderColor?',
  'darknessTheme?',
  'darknessActiveTheme?',
  'darknessTextColor?',
  'darknessBorder?',
];
const values = [
  'boolean',
  'string',
  'TPosition',
  'string',
  'TSize',
  'boolean',
  'boolean',
  'TThemeColor',
  'TThemeColor',
  'TThemeColor',
  'TThemeColor',
  'TDarkness',
  'TDarkness',
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
  <ComponentDoc name="ColorPicker" :text="text" isHorizontalStates>
    <ColorPicker
      size="small"
      @pointerenter="onPointerEnter('#firstColorPicker', `size='small'`)"
      @pointerleave="isPopupActive = false"
      id="firstColorPicker"
    />

    <ColorPicker
      theme="green"
      activeTheme="amber"
      invalid
      active
      @pointerenter="
        onPointerEnter(
          '#secondColorPicker',
          `theme='green'
activeTheme='amber'
invalid
active`,
        )
      "
      @pointerleave="isPopupActive = false"
      id="secondColorPicker"
    />

    <ColorPicker
      theme="red"
      size="large"
      label="Уведомления"
      borderColor="green"
      textColor="white"
      @pointerenter="
        onPointerEnter(
          '#thirdColorPicker',
          `theme='red'
size='large'
label='Уведомления'
borderColor='green'
textColor='white'`,
        )
      "
      @pointerleave="isPopupActive = false"
      id="thirdColorPicker"
    />

    <ColorPicker
      theme="blue"
      size="huge"
      disabled
      @pointerenter="
        onPointerEnter(
          '#fourthColorPicker',
          `theme='blue'
size='huge'
disabled`,
        )
      "
      @pointerleave="isPopupActive = false"
      id="fourthColorPicker"
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
