<script setup lang="ts">
import ArrowDoubleLeftShortIcon from '@icons/Mono/ArrowDoubleLeftShortIcon.vue';
import ArrowDoubleRightShortIcon from '@icons/Mono/ArrowDoubleRightShortIcon.vue';
import ArrowLeftShortIcon from '@icons/Mono/ArrowLeftShortIcon.vue';
import ArrowRightShortIcon from '@icons/Mono/ArrowRightShortIcon.vue';
import type { IPaginatorProps } from '@interfaces/componentsProps';
import PaginatorItem from '@components/Paginator/PaginatorItem.vue';
import { computed, ref, type Ref } from 'vue';
import Select from '@components/Select/Select.vue';
import type { ISelectOption } from '@interfaces/componentsProp';

const props = withDefaults(defineProps<IPaginatorProps>(), {
  total: 10,
  size: 'normal',
  theme: 'black',
  darknessTheme: '500',
  itemsPerPage: 1,
});

const current = defineModel({
  default: 1,
}) as Ref<number>;

const perPage = ref(props.itemsPerPage);

const itemsLength = computed(() => Math.floor(props.total / perPage.value));
const selectOptions = computed(() =>
  !props.itemsPerPageOptions ? [{ value: '1' }] : props.itemsPerPageOptions.map((item) => ({ value: String(item) })),
) as unknown as ISelectOption[];
const isStartDisabled = computed(() => current.value === 1);
const isEndDisabled = computed(() => current.value === itemsLength.value);
const items = computed(() => {
  if (!current.value) return [1, 2, 3, 4, 5];
  const center = current.value;
  const length = itemsLength.value;
  if (center - 2 < 2) return [1, 2, 3, 4, 5];
  if (center + 2 > length) return [length - 5, length - 4, length - 3, length - 1, length];
  return [center - 2, center - 1, center, center + 1, center + 2];
});
const iconSize = computed(() => {
  const size = props.size;
  if (size === 'normal') return '10';
  if (size === 'large') return '25';
  if (size === 'huge') return '30';
  return '15';
});
const fontSize = computed(() => {
  const size = props.size;
  if (size === 'normal') return '16px';
  if (size === 'large') return '26px';
  if (size === 'huge') return '32px';
  return '36px';
});
const itemSize = computed(() => `${+iconSize.value * 2.5}px`);
</script>

<template>
  <section class="container">
    <PaginatorItem @click="current = 1" :disable="isStartDisabled" class="paginatorItem">
      <ArrowDoubleLeftShortIcon :color="isStartDisabled ? '#aaa' : 'black'" :size="iconSize" />
    </PaginatorItem>
    <PaginatorItem @click="current--" :disable="isStartDisabled" class="paginatorItem">
      <ArrowLeftShortIcon :color="isStartDisabled ? '#aaa' : 'black'" :size="iconSize" />
    </PaginatorItem>
    <PaginatorItem
      v-for="item of items"
      :key="item"
      @click="current = item"
      :active="current === item"
      class="paginatorItem"
    >
      <span class="digital">{{ item }}</span>
    </PaginatorItem>
    <PaginatorItem @click="isEndDisabled ? '' : current++" :disable="isEndDisabled" class="paginatorItem">
      <ArrowRightShortIcon :color="isEndDisabled ? '#aaa' : 'black'" :size="iconSize" />
    </PaginatorItem>
    <PaginatorItem @click="isEndDisabled ? '' : (current = total)" :disable="isEndDisabled" class="paginatorItem">
      <ArrowDoubleRightShortIcon :color="isEndDisabled ? '#aaa' : 'black'" :size="iconSize" />
    </PaginatorItem>
    <Select v-if="itemsPerPageOptions" v-model="perPage" :options="selectOptions"></Select>
  </section>
</template>

<style scoped>
.container {
  display: flex;
  gap: 5px;
}
.paginatorItem {
  width: v-bind(itemSize);
  height: v-bind(itemSize);
  user-select: none;
}
.digital {
  font-size: v-bind(fontSize);
  font-weight: bold;
}
</style>
