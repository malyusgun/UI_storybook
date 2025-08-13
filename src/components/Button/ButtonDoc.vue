<script setup lang="ts">
import ComponentDoc from '@/preview/ComponentDoc.vue';
import ComponentProps from '@/preview/ComponentProps.vue';
import Button from './Button.vue';

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
</script>

<template>
  <ComponentDoc
    name="Button"
    text="Компонент-обёртка для кнопки. Может принимать иконку, её расположение, тему, её тусклость, размер и многое другое. Если цвет текста не передан, то он сам выбирается между чёрным и белым для лучшей контрастности."
    isHorizontalStates
  >
    <Button />
    <Button label="My own label" theme="green" />
    <Button label="Danger!" theme="red" padding="10px 30px" />
    <Button label="Accept" theme="blue" darknessTheme="800" />
    <template #props>
      <ComponentProps :keys="keys" :values="values" />
    </template>
  </ComponentDoc>
</template>

<style scoped></style>
