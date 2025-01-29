<script setup lang="ts">
import type { ICarouselProps } from '@interfaces/componentsProps';
import CarouselArrowContainer from '@components/Carousel/CarouselArrowContainer.vue';
import { computed, ref } from 'vue';
import { convertThemeToColor, convertThemeToTextColor } from '@helpers/common';
import ArrowLeftShortIcon from '@icons/Mono/ArrowLeftShortIcon.vue';
import ArrowRightShortIcon from '@icons/Mono/ArrowRightShortIcon.vue';

const props = withDefaults(defineProps<ICarouselProps>(), {
  itemsProps: () => [],
  size: 'normal',
});

const current = ref(1);

const itemsLength = computed(() => Math.ceil(props.itemsProps.length / props.perView));
const color = computed(() => convertThemeToColor(props.theme, props.darknessTheme));
const textColor = computed(() => convertThemeToTextColor(props.theme, props.darknessTheme));
const isStartDisabled = computed(() => current.value === 1);
const isEndDisabled = computed(() => current.value === itemsLength.value);
const iconSize = computed(() => {
  const size = props.size;
  if (size === 'normal') return '10';
  if (size === 'large') return '15';
  if (size === 'huge') return '18';
  return '7';
});
</script>

<template>
  <section :style="`width: ${width}; min-height: 100px`" class="carouselContainer">
    <CarouselArrowContainer :textColor="textColor" :color="color" :disable="isStartDisabled">
      <ArrowLeftShortIcon :color="isStartDisabled ? '#aaa' : textColor" :size="iconSize" />
    </CarouselArrowContainer>
    <slot />
    <CarouselArrowContainer :textColor="textColor" :color="color" :disable="isEndDisabled">
      <ArrowRightShortIcon :color="isEndDisabled ? '#aaa' : textColor" :size="iconSize" />
    </CarouselArrowContainer>
  </section>
</template>

<style scoped>
.carouselContainer {
  display: flex;
}
</style>
