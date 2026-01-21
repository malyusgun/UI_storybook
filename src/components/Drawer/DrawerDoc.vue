<script setup lang="ts">
import ComponentDoc from '@/preview/ComponentDoc.vue';
import ComponentProps from '@/preview/ComponentProps.vue';
import Drawer from './Drawer.vue';
import Button from '../Button/Button.vue';
import { ref } from 'vue';
import ArrowLeftIcon from '@icons/Mono/ArrowLeftIcon.vue';
import ArrowRightIcon from '@icons/Mono/ArrowRightIcon.vue';
import ArrowDownIcon from '@icons/Mono/ArrowDownIcon.vue';
import ArrowUpIcon from '@icons/Mono/ArrowUpIcon.vue';

const keys = [
  'position?',
  'width?',
  'theme?',
  'textColor?',
  'darknessTheme?',
  'darknessTextColor?',
  'modal?',
  'dismissible?',
  'closeIcon?',
  'headerDivider',
  'footerDivider',
  'headerHeight',
  'paddingRightOnActive',
];
const values = [
  'TPosition',
  'string | number',
  'TThemeColor',
  'TThemeColor',
  'TDarkness',
  'TDarkness',
  'boolean',
  'boolean',
  'TIcon',
  'boolean',
  'boolean',
  'string',
  'string',
];

const firstVisible = ref(false);
const secondVisible = ref(false);
const thirdVisible = ref(false);
const fourthVisible = ref(false);

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
    name="Drawer"
    text="Открывающееся с одной из четырёх сторон страницы окно с произвольным контентом."
    isHorizontalStates
  >
    <Button @click="firstVisible = !firstVisible" iconOnly>
      <ArrowRightIcon size="24" />
    </Button>
    <Drawer v-model:visible="firstVisible"
      >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis dolorum ducimus eos eum laudantium mollitia
      repudiandae sit. Aliquam culpa cum dignissimos enim eum eveniet, ipsam iure laudantium, maiores nisi
      numquam?</Drawer
    >

    <Button
      @click="secondVisible = !secondVisible"
      iconOnly
      @pointerenter="
        onPointerEnter(
          '#firstDrawer',
          `position='right'
width='600'
theme='sky'
headerDivider
footerDivider`,
        )
      "
      @pointerleave="isPopupActive = false"
      id="firstDrawer"
      ><ArrowLeftIcon size="24"
    /></Button>
    <Drawer v-model:visible="secondVisible" position="right" width="600" theme="sky" headerDivider footerDivider>
      <template #header> Контент в &lt;template #header></template>
      Контент в &lt;template #default> или без template-тега
      <template #footer> Контент в &lt;template #footer></template>
    </Drawer>

    <Button
      @click="thirdVisible = !thirdVisible"
      iconOnly
      @pointerenter="
        onPointerEnter(
          '#secondDrawer',
          `position='top'
:dismissible='false'
theme='lime'
darknessTheme='300'`,
        )
      "
      @pointerleave="isPopupActive = false"
      id="secondDrawer"
    >
      <ArrowDownIcon size="24" />
    </Button>
    <Drawer v-model:visible="thirdVisible" position="top" :dismissible="false" theme="lime" darkness-theme="100">
      <template #header
        >Очень длинный контент, переданный в &lt;template #header>. Lorem ipsum dolor sit amet, consectetur adipisicing
        elit. Aliquid atque aut enim ex inventore maiores, odio porro provident totam ullam? Accusamus aliquid at
        blanditiis dolorum error iusto odit quibusdam quidem.</template
      >
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab doloremque eligendi est, fuga neque possimus sed?
      Consectetur enim impedit laboriosam minima molestiae omnis pariatur quasi quos sunt tenetur. Beatae, pariatur?
      <template #footer> Контент в &lt;template #footer></template>
    </Drawer>

    <Button
      @click="fourthVisible = !fourthVisible"
      iconOnly
      @pointerenter="
        onPointerEnter(
          '#thirdDrawer',
          `position='bottom'
:modal='false'
theme='red'
textColor='yellow'
headerHeight='170px'
closeIcon='Flash'`,
        )
      "
      @pointerleave="isPopupActive = false"
      id="thirdDrawer"
      ><ArrowUpIcon size="24"
    /></Button>
    <Drawer
      v-model:visible="fourthVisible"
      position="bottom"
      :modal="false"
      header-height="170px"
      theme="red"
      textColor="yellow"
      closeIcon="Flash"
    >
      <template #header
        >Очень длинный контент, переданный в &lt;template #header>. Lorem ipsum dolor sit amet, consectetur adipisicing
        elit. Aliquid atque aut enim ex inventore maiores, odio porro provident totam ullam? Accusamus aliquid at
        blanditiis dolorum error iusto odit quibusdam quidem.</template
      >
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab doloremque eligendi est, fuga neque possimus sed?
      Consectetur enim impedit laboriosam minima molestiae omnis pariatur quasi quos sunt tenetur. Beatae, pariatur?
      <template #footer> Контент в &lt;template #footer></template>
    </Drawer>

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
