<script setup lang="ts">
import ButtonDoc from '@components/Button/ButtonDoc.vue';
import DividerDoc from '@components/Divider/DividerDoc.vue';
import CarouselDoc from '@components/Carousel/CarouselDoc.vue';
import CheckboxDoc from '@components/Checkbox/CheckboxDoc.vue';
import ColorPickerDoc from '@components/ColorPicker/ColorPickerDoc.vue';
import Popup from '@components/Popup/Popup.vue';
import { ref } from 'vue';
import DrawerDoc from '@components/Drawer/DrawerDoc.vue';
import InputDivDoc from '@components/InputDiv/InputDivDoc.vue';
import KnobDoc from '@components/Knob/KnobDoc.vue';
import MenuDialDoc from '@components/MenuDial/MenuDialDoc.vue';

const isPopupActive = ref(false);
const popupParentSelector = ref();
const popupContent = ref('');
</script>

<template>
  <div>
    <Popup
      v-model="isPopupActive"
      :parentSelector="popupParentSelector"
      buttonMenuPosition="top"
      theme="blue"
      darkness-theme="700"
      maxWidth="600px"
      maxHeight="600px"
    >
      <pre>{{ popupContent }}</pre>
    </Popup>

    <ButtonDoc
      v-model:isPopupActive="isPopupActive"
      v-model:popupParentSelector="popupParentSelector"
      v-model:popupContent="popupContent"
    />
    <CarouselDoc
      v-model:isPopupActive="isPopupActive"
      v-model:popupParentSelector="popupParentSelector"
      v-model:popupContent="popupContent"
    />
    <CheckboxDoc
      v-model:isPopupActive="isPopupActive"
      v-model:popupParentSelector="popupParentSelector"
      v-model:popupContent="popupContent"
    />
    <ColorPickerDoc
      v-model:isPopupActive="isPopupActive"
      v-model:popupParentSelector="popupParentSelector"
      v-model:popupContent="popupContent"
    />
    <DividerDoc
      v-model:isPopupActive="isPopupActive"
      v-model:popupParentSelector="popupParentSelector"
      v-model:popupContent="popupContent"
    />
    <DrawerDoc
      v-model:isPopupActive="isPopupActive"
      v-model:popupParentSelector="popupParentSelector"
      v-model:popupContent="popupContent"
    />
    <InputDivDoc
      v-model:isPopupActive="isPopupActive"
      v-model:popupParentSelector="popupParentSelector"
      v-model:popupContent="popupContent"
    />
    <KnobDoc
      v-model:isPopupActive="isPopupActive"
      v-model:popupParentSelector="popupParentSelector"
      v-model:popupContent="popupContent"
    />
    <MenuDialDoc
      v-model:isPopupActive="isPopupActive"
      v-model:popupParentSelector="popupParentSelector"
      v-model:popupContent="popupContent"
    />
  </div>
</template>

<style scoped></style>
