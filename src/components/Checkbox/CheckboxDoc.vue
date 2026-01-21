<script setup lang="ts">
import ComponentDoc from '@/preview/ComponentDoc.vue';
import ComponentProps from '@/preview/ComponentProps.vue';
import Checkbox from './Checkbox.vue';

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
  <ComponentDoc name="Checkbox" :text="text" isHorizontalStates>
    <Checkbox
      size="small"
      @pointerenter="onPointerEnter('#firstCheckbox', `size='small'`)"
      @pointerleave="isPopupActive = false"
      id="firstCheckbox"
    />

    <Checkbox
      theme="green"
      activeTheme="amber"
      invalid
      active
      @pointerenter="
        onPointerEnter(
          '#secondCheckbox',
          `theme='green'
activeTheme=amber
invalid
active`,
        )
      "
      @pointerleave="isPopupActive = false"
      id="secondCheckbox"
    />

    <Checkbox
      theme="red"
      size="large"
      label="Уведомления"
      borderColor="green"
      textColor="white"
      @pointerenter="
        onPointerEnter(
          '#thirdCheckbox',
          `size='large'
label='Уведомления'
borderColor='green'
textColor='white'`,
        )
      "
      @pointerleave="isPopupActive = false"
      id="thirdCheckbox"
    />

    <Checkbox
      theme="blue"
      size="huge"
      disabled
      @pointerenter="
        onPointerEnter(
          '#fourthCheckbox',
          `size='huge'
theme='blue'
disabled`,
        )
      "
      @pointerleave="isPopupActive = false"
      id="fourthCheckbox"
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
