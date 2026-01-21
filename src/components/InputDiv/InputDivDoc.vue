<script setup lang="ts">
import ComponentDoc from '@/preview/ComponentDoc.vue';
import ComponentProps from '@/preview/ComponentProps.vue';
import InputDiv from './InputDiv.vue';

const keys = [
  'scheme?',
  'size?',
  'gap?',
  'inputsGap?',
  'secret?',
  'dashed?',
  'numbersOnly?',
  'regex?',
  'bottomOnly?',
  'theme?',
  'darknessTheme?',
  'textColor?',
  'darknessTextColor?',
];
const values = [
  'TInputDivScheme',
  'TSize',
  'string',
  'string',
  'boolean',
  'boolean',
  'boolean',
  'RegExp',
  'boolean',
  'TThemeColor',
  'TDarkness',
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
  <ComponentDoc
    name="InputDiv"
    text="Компонент ввода цифр. Принимает множество настроек, относящихся к принимаемым значениям ('regex' и 'numbersOnly') и внешнему ввиду компонента."
  >
    <InputDiv />

    <InputDiv
      size="small"
      gap="5px"
      secret
      theme="sky"
      darkness-theme="200"
      @pointerenter="
        onPointerEnter(
          '#firstInputDiv',
          `size='small'
gap='5px'
secret
theme='sky'
darknessTheme='200'`,
        )
      "
      @pointerleave="isPopupActive = false"
      id="firstInputDiv"
    />

    <InputDiv
      size="large"
      gap="40px"
      inputs-gap="5px"
      scheme="4by3"
      dashed
      numbers-only
      @pointerenter="
        onPointerEnter(
          '#secondInputDiv',
          `size='large'
gap='40px'
inputsGap='5px'
scheme='4by3'
dashed
numbersOnly`,
        )
      "
      @pointerleave="isPopupActive = false"
      id="secondInputDiv"
    />

    <InputDiv
      scheme="1-2-3-4"
      :regex="/^[0-9-+=]+$/"
      size="huge"
      bottomOnly
      textColor="green"
      darknessTextColor="700"
      @pointerenter="
        onPointerEnter(
          '#thirdInputDiv',
          `scheme='1-2-3-4'
:regex='/^[0-9-+=]+$/'
size='huge'
bottomOnly
textColor='green'
darknessTextColor='700'`,
        )
      "
      @pointerleave="isPopupActive = false"
      id="thirdInputDiv"
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
