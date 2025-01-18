<script setup lang="ts">
import ArrowDoubleLeftShortIcon from '@icons/Mono/ArrowDoubleLeftShortIcon.vue';
import ArrowLeftShortIcon from '@icons/Mono/ArrowLeftShortIcon.vue';
import type { IPaginatorProps } from '@interfaces/componentsProps';
import PaginatorItem from '@components/Paginator/PaginatorItem.vue';
import { computed, ref } from 'vue';

const props = withDefaults(defineProps<IPaginatorProps>(), {
  total: 10,
  size: 'normal',
  theme: 'black',
  darknessTheme: '500',
});

const current = ref<number | undefined>(props.value);

const items = computed(() => {
  if (!current.value) return [1, 2, 3, 4, 5];
  const start = Math.floor(current.value / 5);
  return [start + 1, start + 2, start + 3, start + 4, start + 5];
});
const iconSize = computed(() => {
  const size = props.size;
  if (size === 'normal') return '20';
  if (size === 'large') return '25';
  if (size === 'huge') return '30';
  return '15';
});
const itemSize = computed(() => `${+iconSize.value * 1.5}px`);
</script>

<template>
  <section class="container">
    <PaginatorItem class="paginatorItem">
      <ArrowDoubleLeftShortIcon :size="iconSize" />
    </PaginatorItem>
    <PaginatorItem class="paginatorItem">
      <ArrowLeftShortIcon :size="iconSize" />
    </PaginatorItem>
    <PaginatorItem v-for="item of items" :key="item" class="paginatorItem">
      {{ item }}
    </PaginatorItem>
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
}
</style>
