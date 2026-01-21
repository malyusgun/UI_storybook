<script setup lang="ts">
import ComponentDoc from '@/preview/ComponentDoc.vue';
import ComponentProps from '@/preview/ComponentProps.vue';
import Carousel from './Carousel.vue';

const items = [
  'Первый элемент массива из простых строк',
  'Второй элемент. Моё содержимое может быть каким угодно.',
  'Третий слайд.',
  'Четвёртый слайд.',
];
const text =
  'Способ отображения списка элементов по одному или несколько в зависимости от переданных свойств, с двумя кнопками "влево" и "вправо". Также возможна настройка размера карусели, отступов, количества пролистываемых элементов за раз и включения кнопок снизу для более быстрого выбора нужного слайда в случае, когда их много.';
const keys = [
  'items?',
  'innerWidth?',
  'size?',
  'padding',
  'perView?',
  'perScroll?',
  'circular?',
  'buttonsBelow?',
  'theme?',
  'darknessTheme?',
];
const values = [
  'any[]',
  'string',
  'TSize',
  'string',
  'number',
  'number',
  'boolean',
  'boolean',
  'TThemeColor',
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
  <ComponentDoc name="Carousel" :text="text" isHorizontalStates>
    <Carousel
      size="small"
      @pointerenter="onPointerEnter('#firstCarousel', `size='small'`)"
      @pointerleave="isPopupActive = false"
      id="firstCarousel"
    />

    <Carousel
      theme="green"
      innerWidth="200px"
      @pointerenter="
        onPointerEnter(
          '#secondCarousel',
          `innerWidth='200px'
theme='green'`,
        )
      "
      @pointerleave="isPopupActive = false"
      id="secondCarousel"
    />

    <Carousel
      theme="red"
      size="large"
      :perView="2"
      @pointerenter="
        onPointerEnter(
          '#thirdCarousel',
          `size=large'
theme='red'
:perView=2`,
        )
      "
      @pointerleave="isPopupActive = false"
      id="thirdCarousel"
    />

    <Carousel
      :items="items"
      theme="blue"
      :perScroll="2"
      circular
      padding="20px 50px"
      size="huge"
      @pointerenter="
        onPointerEnter(
          '#fourthCarousel',
          `:perScroll=2
theme='blue'
padding='20px 50px'
circular
size='huge'
    `,
        )
      "
      @pointerleave="isPopupActive = false"
      id="fourthCarousel"
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
