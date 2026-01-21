<script setup lang="ts">
import ComponentDoc from '@/preview/ComponentDoc.vue';
import ComponentProps from '@/preview/ComponentProps.vue';
import MenuDial from './MenuDial.vue';

const keys = ['items', 'size?', 'theme?', 'iconColor?', 'darknessTheme?', 'darknessIconColor?', 'direction?'];
const values = ['IMDItemProps[]', 'TSize', 'TThemeColor', 'TThemeColor', 'TDarkness', 'TDarkness', 'TDirection'];

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
    name="MenuDial"
    text="Компонент ввода цифр. Принимает множество настроек, относящихся к принимаемым значениям ('regex' и 'numbersOnly') и внешнему ввиду компонента."
    is-horizontal-states
  >
    <MenuDial
      :items="[{ label: 'First' }, { label: 'Second' }]"
      size="small"
      @pointerenter="
        onPointerEnter(
          '#firstMenuDial',
          `size='small'
:items='[{ label: 'First' }, { label: 'Second' }]`,
        )
      "
      @pointerleave="isPopupActive = false"
      id="firstMenuDial"
    />

    <MenuDial
      :items="[{ label: 'First' }, { label: 'Second' }]"
      gap="40px"
      inputs-gap="5px"
      scheme="4by3"
      dashed
      numbers-only
      @pointerenter="
        onPointerEnter(
          '#secondMenuDial',
          `size='large'
gap='40px'
inputsGap='5px'
scheme='4by3'
dashed
numbersOnly`,
        )
      "
      @pointerleave="isPopupActive = false"
      id="secondMenuDial"
    />

    <MenuDial
      scheme="1-2-3-4"
      :regex="/^[0-9-+=]+$/"
      size="large"
      bottomOnly
      textColor="green"
      darknessTextColor="700"
      @pointerenter="
        onPointerEnter(
          '#thirdMenuDial',
          `scheme='1-2-3-4'
:regex='/^[0-9-+=]+$/'
size='huge'
bottomOnly
textColor='green'
darknessTextColor='700'`,
        )
      "
      @pointerleave="isPopupActive = false"
      id="thirdMenuDial"
    />

    <MenuDial
      size="huge"
      @pointerenter="
        onPointerEnter(
          '#fourthMenuDial',
          `scheme='1-2-3-4'
:regex='/^[0-9-+=]+$/'
size='huge'
bottomOnly
textColor='green'
darknessTextColor='700'`,
        )
      "
      @pointerleave="isPopupActive = false"
      id="fourthMenuDial"
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
