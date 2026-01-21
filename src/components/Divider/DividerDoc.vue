<script setup lang="ts">
import ComponentDoc from '@/preview/ComponentDoc.vue';
import ComponentProps from '@/preview/ComponentProps.vue';
import Divider from './Divider.vue';

const keys = ['height?', 'type?', 'color?', 'darknessColor?'];
const values = ['number', 'TBorder', 'TThemeColor', 'TDarkness'];

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
    name="Divider"
    text="Горизонтальная линия для разделения контента на странице / в информационном блоке. Принимает цвет, его тусклость, высоту и тип: сплошная, тире или точки."
  >
    <Divider
      color="white"
      @pointerenter="onPointerEnter('#firstDivider', `color='white'`)"
      @pointerleave="isPopupActive = false"
      id="firstDivider"
    />

    <Divider
      :height="2"
      color="green"
      @pointerenter="
        onPointerEnter(
          '#secondDivider',
          `color='green'
:height='2'`,
        )
      "
      @pointerleave="isPopupActive = false"
      id="secondDivider"
    />

    <Divider
      :height="4"
      color="red"
      type="dashed"
      @pointerenter="
        onPointerEnter(
          '#thirdDivider',
          `color='red'
:height='4'
type='dashed'`,
        )
      "
      @pointerleave="isPopupActive = false"
      id="thirdDivider"
    />

    <Divider
      :height="8"
      color="blue"
      darknessColor="800"
      type="dotted"
      @pointerenter="
        onPointerEnter(
          '#fourthDivider',
          `color='blue'
:height='8'
darknessColor='800'
type='dotted'`,
        )
      "
      @pointerleave="isPopupActive = false"
      id="fourthDivider"
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
