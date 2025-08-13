<script setup lang="ts">
import ComponentDoc from '@/preview/ComponentDoc.vue';
import ComponentProps from '@/preview/ComponentProps.vue';
import Divider from './Divider.vue';

const keys = ['height?', 'type?', 'color?', 'darknessColor?'];
const values = ['number', 'TBorder', 'TThemeColor', 'TDarkness'];
</script>

<template>
  <ComponentDoc
    name="Divider"
    text="Горизонтальная линия для разделения контента на странице / в информационном блоке. Принимает цвет, его тусклость, высоту и тип: сплошная, тире или точки."
  >
    <Divider color="white" />
    <Divider :height="2" color="green" />
    <Divider :height="4" color="red" type="dashed" />
    <Divider :height="8" color="blue" darknessColor="800" type="dotted" />
    <template #props>
      <ComponentProps :keys="keys" :values="values" />
    </template>
  </ComponentDoc>
</template>

<style scoped></style>
