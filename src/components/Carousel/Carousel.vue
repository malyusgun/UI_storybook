<script setup lang="ts">
import type { ICarouselProps } from '@interfaces/componentsProps';
import CarouselButtonContainer from './CarouselButtonContainer.vue';
import { computed, ref } from 'vue';
import { convertThemeToColor, convertThemeToTextColor, getValueFromSize } from '@helpers/common';
import ArrowLeftShortIcon from '../../icons/Mono/ArrowLeftShortIcon.vue';
import ArrowRightShortIcon from '../../icons/Mono/ArrowRightShortIcon.vue';
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

const itemsLength = computed(() => props.items?.length ?? 3);
const color = computed(() => convertThemeToColor(props.theme, props.darknessTheme));
const textColor = computed(() => convertThemeToTextColor(props.theme, props.darknessTheme));
const isStartDisabled = computed(() => (props.circular ? false : current.value === 1 || itemsLength.value <= 1));
const isEndDisabled = computed(() =>
  props.circular ? false : current.value === Math.ceil(itemsLength.value / props.perView) || !itemsLength.value,
);
const sizeCoefficient = computed(() => getValueFromSize(props.size, [0.75, 1, 2, 3]));
const iconSize = computed(() => 10 * sizeCoefficient.value);
const itemWidth = computed(() => `calc(${props.innerWidth} / ${props.perView}`);
const buttonSize = computed(() =>
  getValueFromSize(props.size, [
    9 * sizeCoefficient.value + 'px',
    12 * sizeCoefficient.value + 'px',
    12 * sizeCoefficient.value + 'px',
    15 * sizeCoefficient.value + 'px',
  ]),
);
const translate = computed(() => `translateX(calc(-${props.innerWidth} / ${props.perView} * ${current.value - 1}))`);
</script>

<template>
  <section class="carouselContainer">
    <CarouselButtonContainer
      @click="!isStartDisabled ? (current = getNewValue('-', current, itemsLength, perScroll, perView)) : null"
      :width="50 * sizeCoefficient + 'px'"
      :borderRadius="5 * sizeCoefficient + 'px'"
      :textColor="textColor"
      :color="!isStartDisabled ? color : '#aaa'"
      :disable="isStartDisabled"
    >
      <ArrowLeftShortIcon :size="iconSize" />
    </CarouselButtonContainer>
    <div class="content" :style="`max-width: ${innerWidth}`">
      <ul v-if="$slots.default && items" class="list" :style="`transform: ${translate};`">
        <li
          v-for="(item, index) of items"
          :key="index"
          class="item"
          :style="`padding: ${padding ?? 0}; min-width: ${itemWidth}`"
        >
          <slot v-bind="item" :key="current - 1" />
        </li>
      </ul>
      <ul v-if="!$slots.default && !items" class="list" :style="`transform: ${translate};`">
        <li
          v-for="itemIndex of Array(itemsLength).keys()"
          :key="itemIndex"
          class="item"
          :style="`padding: ${padding ?? 0}; min-width: ${itemWidth}`"
        >
          <h2 style="text-align: center; margin-bottom: 10px">{{ defaultProps[itemIndex].header }}</h2>
          <p>
            {{ defaultProps[itemIndex].text }}
          </p>
        </li>
      </ul>
      <ul v-if="!$slots.default && items" class="list" :style="`transform: ${translate};`">
        <li
          v-for="(item, index) of items"
          :key="index"
          class="item"
          :style="`padding: ${padding ?? 0}; min-width: ${itemWidth}`"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <CarouselButtonContainer
      @click="!isEndDisabled ? (current = getNewValue('+', current, itemsLength, perScroll, perView)) : null"
      :width="50 * sizeCoefficient + 'px'"
      :borderRadius="5 * sizeCoefficient + 'px'"
      :textColor="textColor"
      :color="!isEndDisabled ? color : '#aaa'"
      :disable="isEndDisabled"
    >
      <ArrowRightShortIcon :size="iconSize" />
    </CarouselButtonContainer>
    <div class="buttons" v-if="buttonsBelow">
      <CarouselButtonContainer
        v-for="itemIndex of Array(itemsLength - 1).keys()"
        :key="itemIndex"
        :width="buttonSize"
        borderRadius="50%"
        :textColor="textColor"
        :color="color"
        @click="current = itemIndex + 1"
        ><div
          class="button"
          :style="`border-width: ${size === 'large' || size === 'huge' ? '2px' : '1px'}; width: ${buttonSize}; height: ${buttonSize};background-color: ${color};`"
        ></div
      ></CarouselButtonContainer>
    </div>
  </section>
</template>

<style scoped>
.carouselContainer {
  display: flex;
  min-height: 100px;
  width: max-content;
  position: relative;
}
.content {
  overflow: hidden;
}
.list {
  display: flex;
  transition: transform 0.3s ease-out;
}
.buttons {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 120%);
  display: flex;
  gap: 10px;
}
.button {
  border: solid black;
  border-radius: 50%;
  cursor: pointer;
  :hover {
    filter: brightness(50%);
  }
}
</style>
