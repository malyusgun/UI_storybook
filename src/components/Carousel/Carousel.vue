<script setup lang="ts">
import type { ICarouselProps } from '../../common/interfaces/componentsProps';
import CarouselButtonContainer from './CarouselButtonContainer.vue';
import { computed, ref } from 'vue';
import { convertThemeToColor, convertThemeToTextColor, getValueFromSize } from '../../common/helpers/common';
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

const itemsLength = computed(() => props.itemsProps?.length ?? 3);
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
        v-for="item of Array(itemsLength - 1).keys()"
        :key="item"
        :width="buttonSize"
        borderRadius="50%"
        :textColor="textColor"
        :color="color"
        @click="current = item + 1"
        ><div class="button" :style="`border-width: ${size === 'large' || size === 'huge' ? '2px' : '1px'}`"></div
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
  left: 50%;
  transform: translate(-50%, 120%);
  display: flex;
  gap: 10px;
}
.button {
  background-color: v-bind(color);
  border: solid black;
  border-radius: 50%;
  cursor: pointer;
  width: v-bind(buttonSize);
  height: v-bind(buttonSize);
  :hover {
    filter: brightness(50%);
  }
}
</style>
