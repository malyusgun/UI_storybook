<script setup lang="ts">
import type { ICarouselProps } from '@interfaces/componentsProps';
import CarouselArrowContainer from '@components/Carousel/CarouselArrowContainer.vue';
import { computed, ref } from 'vue';
import { convertThemeToColor, convertThemeToTextColor } from '@helpers/common';
import ArrowLeftShortIcon from '@icons/Mono/ArrowLeftShortIcon.vue';
import ArrowRightShortIcon from '@icons/Mono/ArrowRightShortIcon.vue';
import { defaultProps, getNewValue } from './helpers';

const props = withDefaults(defineProps<ICarouselProps>(), {
  size: 'normal',
  innerWidth: '300px',
  perView: 1,
  perScroll: 1,
  theme: 'white',
  darknessTheme: '500',
});

const current = ref(1);

const itemsLength = computed(() => props.itemsProps?.length ?? 3);
const color = computed(() => convertThemeToColor(props.theme, props.darknessTheme));
const textColor = computed(() => convertThemeToTextColor(props.theme, props.darknessTheme));
const isStartDisabled = computed(() => (props.circular ? false : current.value === 1 || itemsLength.value <= 1));
const isEndDisabled = computed(() =>
  props.circular ? false : current.value === Math.ceil(itemsLength.value / props.perView) || !itemsLength.value,
);
const iconSize = computed(() => {
  const size = props.size;
  if (size === 'normal') return '10';
  if (size === 'large') return '15';
  if (size === 'huge') return '18';
  return '7';
});
const itemWidth = computed(() => `calc(${props.innerWidth} / ${props.perView}`);
const translate = computed(() => `translateX(calc(-${props.innerWidth} / ${props.perView} * ${current.value - 1}))`);
</script>

<template>
  <section class="carouselContainer">
    <CarouselArrowContainer
      @click="!isStartDisabled ? (current = getNewValue('-', current, itemsLength, perScroll, perView)) : null"
      :textColor="textColor"
      :color="color"
      :disable="isStartDisabled"
    >
      <ArrowLeftShortIcon :color="isStartDisabled ? '#aaa' : textColor" :size="iconSize" />
    </CarouselArrowContainer>
    <div class="content">
      <ul class="list">
        <li v-for="item of Array(itemsLength).keys()" :key="item" class="item">
          <slot v-bind="itemsProps?.[item]" :key="current - 1" />
          <div v-if="!$slots.default && !itemsProps">
            <h2 style="text-align: center; margin-bottom: 10px">{{ defaultProps[item].header }}</h2>
            <p>
              {{ defaultProps[item].text }}
            </p>
          </div>
          <div v-else-if="!$slots.default">
            <h2 style="text-align: center; margin-bottom: 10px">{{ itemsProps[item].header }}</h2>
            <p>
              {{ itemsProps[item].text }}
            </p>
          </div>
        </li>
      </ul>
    </div>
    <CarouselArrowContainer
      @click="!isEndDisabled ? (current = getNewValue('+', current, itemsLength, perScroll, perView)) : null"
      :textColor="textColor"
      :color="color"
      :disable="isEndDisabled"
    >
      <ArrowRightShortIcon :color="isEndDisabled ? '#aaa' : textColor" :size="iconSize" />
    </CarouselArrowContainer>
    <ul class="buttons">
      <li
        v-for="item of Array(itemsLength).keys()"
        :key="item"
        class="button"
        :style="`width: ${iconSize}px; height: ${iconSize}px`"
      ></li>
    </ul>
  </section>
</template>

<style scoped>
.carouselContainer {
  display: flex;
  min-height: 100px;
  position: relative;
}
.content {
  max-width: v-bind(innerWidth);
  overflow: hidden;
}
.list {
  display: flex;
  transform: v-bind(translate);
  transition: transform 0.3s ease-out;
}
.item {
  min-width: v-bind(itemWidth);
}
.buttons {
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translateX(-50%);
}
.button {
  background-color: v-bind(color);
}
</style>
