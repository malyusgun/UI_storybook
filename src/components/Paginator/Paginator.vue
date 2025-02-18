<script setup lang="ts">
import ArrowDoubleLeftShortIcon from '../../icons/Mono/ArrowDoubleLeftShortIcon.vue';
import ArrowDoubleRightShortIcon from '../../icons/Mono/ArrowDoubleRightShortIcon.vue';
import ArrowLeftShortIcon from '../../icons/Mono/ArrowLeftShortIcon.vue';
import ArrowRightShortIcon from '../../icons/Mono/ArrowRightShortIcon.vue';
import type { IPaginatorProps } from '@interfaces/componentsProps';
import PaginatorItem from './PaginatorItem.vue';
import { computed, type Ref, watch } from 'vue';
import Select from '../Select/Select.vue';
import type { ISelectOption } from '@interfaces/componentsProp';
import { convertThemeToColor, convertThemeToTextColor, getValueFromSize } from '../../common/helpers/common';

const props = withDefaults(defineProps<IPaginatorProps>(), {
  total: 10,
  size: 'normal',
  theme: 'white',
  darknessTheme: '500',
});

const current = defineModel('current', {
  default: 1,
}) as Ref<number>;

const itemsPerPage = defineModel('itemsPerPage', {
  default: 1,
}) as Ref<number>;

if (props.itemsPerPageOptions) {
  itemsPerPage.value = props.itemsPerPageOptions[0];
}

const itemsLength = computed(() => Math.ceil(props.total / itemsPerPage.value));
const initArray = computed(() => Array.from({ length: itemsLength.value }, (_, i) => i + 1));
const selectOptions = computed(() =>
  !props.itemsPerPageOptions ? [{ value: '1' }] : props.itemsPerPageOptions.map((item) => ({ value: String(item) })),
) as unknown as ISelectOption[];
const isStartDisabled = computed(() => current.value === 1);
const isEndDisabled = computed(() => current.value === itemsLength.value);
const items = computed(() => {
  const length = itemsLength.value;
  const itemsPerView = Math.min(length, 5);
  const cur = current.value;
  if (cur - 2 < 2) return initArray.value.slice(0, itemsPerView + 1);
  if (cur + 2 > length) return initArray.value.slice(-itemsPerView);
  if (itemsPerView === 5) return [cur - 2, cur - 1, cur, cur + 1, cur + 2];
  return initArray.value;
});
const iconSize = computed(() => getValueFromSize(props.size, ['7', '10', '15', '18']));
const fontSize = computed(() => getValueFromSize(props.size, ['12px', '16px', '26px', '32px']));
const itemSize = computed(() => `${+iconSize.value * 2.5}px`);
const color = computed(() => convertThemeToColor(props.theme, props.darknessTheme));
const textColor = computed(() => convertThemeToTextColor(props.theme, props.darknessTheme));

watch(itemsPerPage, (cur, prev) => {
  if (cur > prev) current.value = Math.round((current.value * prev) / cur);
  else current.value = Math.ceil((prev * (current.value - 1) + +cur) / cur);
});
</script>

<template>
  <section class="container">
    <PaginatorItem
      @click="current = 1"
      :textColor="textColor"
      :color="color"
      :disable="isStartDisabled"
      class="paginatorItem"
    >
      <ArrowDoubleLeftShortIcon :color="isStartDisabled ? '#aaa' : textColor" :size="iconSize" />
    </PaginatorItem>
    <PaginatorItem
      @click="current--"
      :textColor="textColor"
      :color="color"
      :disable="isStartDisabled"
      class="paginatorItem"
    >
      <ArrowLeftShortIcon :color="isStartDisabled ? '#aaa' : textColor" :size="iconSize" />
    </PaginatorItem>
    <PaginatorItem
      v-for="item of items"
      :key="item"
      @click="current = item"
      :textColor="textColor"
      :color="color"
      :active="current === item"
      class="paginatorItem"
    >
      <span class="digital">{{ item }}</span>
    </PaginatorItem>
    <PaginatorItem
      @click="isEndDisabled ? '' : current++"
      :textColor="textColor"
      :color="color"
      :disable="isEndDisabled"
      class="paginatorItem"
    >
      <ArrowRightShortIcon :color="isEndDisabled ? '#aaa' : textColor" :size="iconSize" />
    </PaginatorItem>
    <PaginatorItem
      @click="isEndDisabled ? '' : (current = itemsLength)"
      :textColor="textColor"
      :color="color"
      :disable="isEndDisabled"
      class="paginatorItem"
    >
      <ArrowDoubleRightShortIcon :color="isEndDisabled ? '#aaa' : textColor" :size="iconSize" />
    </PaginatorItem>
    <Select
      v-if="itemsPerPageOptions"
      v-model="itemsPerPage"
      :theme="theme"
      :darknessTheme="darknessTheme"
      :size="size"
      width="max-width"
      no-highlight
      :font-size="fontSize"
      :options="selectOptions"
    ></Select>
  </section>
</template>

<style scoped>
.container {
  display: flex;
  gap: calc(v-bind(fontSize) * 0.25);
  align-items: center;
  width: max-content;
  height: calc(v-bind(itemSize) * 1.2);
}
.paginatorItem {
  width: v-bind(itemSize);
  height: v-bind(itemSize);
  user-select: none;
}
.digital {
  font-size: v-bind(fontSize);
  font-weight: bold;
  position: relative;
  z-index: 100;
}
</style>
