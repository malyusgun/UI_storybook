<script setup lang="ts">
import type { IRatingProps } from '@interfaces/componentsProps';
import { computed, type Ref, ref, watch } from 'vue';
import { iconsSet } from '@/common/constants/icons';
import StarFilledIcon from '@icons/Mono/StarFilledIcon.vue';
import { convertThemeToColor } from '@helpers/common';

const props = withDefaults(defineProps<IRatingProps>(), {
  count: 5,
  gap: '5px',
  size: 'normal',
  theme: 'black',
  darknessTheme: '500',
});

const value = defineModel({
  default: 0,
}) as Ref<number>;
const emit = defineEmits(['update']);

if (props.value) {
  value.value = props.value;
}
watch(value, () => emit('update', value));

const onHoverIndex = ref();

const themeColor = computed(() => convertThemeToColor(props.theme, props.darknessTheme));
const offColor = computed(() => (props.offTheme ? convertThemeToColor(props.offTheme, props.darknessTheme) : null));
const themeColorOnHover = computed(() => convertThemeToColor(props.offTheme ?? props.theme, '200'));
const iconSize = computed(() => {
  const size = props.size;
  if (size === 'normal') return '20px';
  if (size === 'large') return '30px';
  if (size === 'huge') return '40px';
  return '10px';
});
const onActiveClick = (index: number) => {
  if (value.value > index) {
    value.value = index;
    return;
  }
  value.value = 0;
};
</script>

<template>
  <ul class="list" :style="`gap: ${gap}`">
    <li v-for="index of Array(count).keys()" :key="index" class="item iconSize">
      <div v-show="value < index + 1 && !$slots.offIcon" class="iconSize iconContainer">
        <component
          class="icon absoluteIcon"
          :is="iconsSet['Star']"
          :color="offColor ?? themeColor"
          @pointerenter="onHoverIndex = index"
          @pointerleave="onHoverIndex = null"
          :size="iconSize"
        />
        <Transition>
          <component
            class="absoluteIcon"
            v-show="onHoverIndex === index"
            :is="iconsSet['Star']"
            :color="themeColorOnHover"
            @pointerenter="onHoverIndex = index"
            @pointerleave="onHoverIndex = null"
            @click="value = index + 1"
            :size="iconSize"
          />
        </Transition>
      </div>
      <div v-show="value < index + 1" @click="value = index + 1">
        <slot name="offIcon" :size="iconSize"></slot>
      </div>
      <StarFilledIcon
        v-show="value >= index + 1 && !$slots.onIcon"
        :color="themeColor"
        :size="iconSize"
        class="absoluteIcon"
        @click="onActiveClick(index + 1)"
      />
      <div class="iconSize" v-show="value >= index + 1" @click="onActiveClick(index + 1)">
        <slot name="onIcon" :size="iconSize"></slot>
      </div>
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
}
.icon {
  opacity: 1;
  transition: opacity 0.15s ease-in-out;
  :hover {
    opacity: 0;
  }
}
.absoluteIcon {
  position: absolute;
  top: 0;
  left: 0;
}
.iconSize {
  width: v-bind(iconSize);
  height: v-bind(iconSize);
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
