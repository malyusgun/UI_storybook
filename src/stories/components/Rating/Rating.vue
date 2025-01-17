<script setup lang="ts">
import type { IRatingProps } from '@interfaces/componentsProps';
import { ref } from 'vue';
import { iconsSet } from '@/common/constants/icons';

const props = withDefaults(defineProps<IRatingProps>(), {
  count: 5,
});

const value = defineModel();
const onHoverIndex = ref();

// const textColor = computed(() => {});
</script>

<template>
  {{ value }}
  <ul class="list">
    <li v-for="index of Array(count).keys()" :key="index" class="item">
      <component
        class="icon"
        :is="iconsSet[icon ?? 'Star']"
        color="black"
        @pointerenter="onHoverIndex = index"
        @pointerleave="onHoverIndex = null"
      />
      <Transition>
        <component
          class="hoverIcon"
          v-show="onHoverIndex === index"
          :is="iconsSet[icon ?? 'Star']"
          color="gray"
          @pointerenter="onHoverIndex = index"
          @pointerleave="onHoverIndex = null"
          @click="value = index + 1"
      /></Transition>
    </li>
  </ul>
</template>

<style scoped>
.list {
  display: flex;
}
.item {
  position: relative;
  cursor: pointer;
  transition: all 1s ease-in-out;
}
.icon {
  opacity: 1;
  transition: opacity 0.15s ease-in-out;
  :hover {
    opacity: 0;
  }
}
.hoverIcon {
  position: absolute;
  top: 0;
  left: 0;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.15s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
