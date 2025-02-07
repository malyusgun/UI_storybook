<script setup lang="ts">
import type { ICropperProps } from '@interfaces/componentsProps';
import { computed, ref, watch } from 'vue';
import Button from '@components/Button/Button.vue';
import { convertThemeToTextColor } from '@helpers/common';
import SaveIcon from '@icons/Mono/SaveIcon.vue';
import CornerLeftTopIcon from '@icons/Mono/CornerLeftTopIcon.vue';
import CornerRightTopIcon from '@icons/Mono/CornerRightTopIcon.vue';
import CornerLeftBottomIcon from '@icons/Mono/CornerLeftBottomIcon.vue';
import CornerRightBottomIcon from '@icons/Mono/CornerRightBottomIcon.vue';
import { calcContainerRect, onBorderMove } from '@components/Cropper/helpers';

const props = withDefaults(defineProps<ICropperProps>(), {
  width: 300,
  height: 300,
  menuPosition: 'top',
  theme: 'black',
  darknessTheme: '500',
});

const canvas = ref();
const layerX = ref(0);
const layerY = ref(0);
const activeSides = ref<[string, string]>(['top', 'left']);

const isMoving = ref<boolean>(false);
const top = ref('0');
const left = ref('0');
const right = ref('0');
const bottom = ref('0');

const ctx = computed(() => canvas.value && canvas.value.getContext('2d'));
const imageSource = computed(() => props.src ?? props.file);
const width = computed(() => props.width);
const height = computed(() => props.height);
const color = computed(() => convertThemeToTextColor(props.theme, props.darknessTheme));
const container = computed(() => calcContainerRect());

watch(
  [imageSource, ctx, width, height],
  () => {
    if (!imageSource.value) return;

    const img = new Image();
    img.src = props.src ?? URL.createObjectURL(props.file!);

    img.onload = () => {
      canvas.value.width = width.value ?? 0;
      canvas.value.height = height.value ?? 0;
      ctx.value?.drawImage(img, 0, 0, width.value ?? 0, height.value ?? 0);
    };
  },
  { immediate: true },
);

const onPointerDown = (event: PointerEvent, newSides: [string, string]) => {
  activeSides.value = newSides;
  layerX.value = event.layerX;
  layerY.value = event.layerY;
  isMoving.value = true;
};

// TODO почему то в самом начале переноса элемент смещается на 1-2 пикселя вниз. Пофиксить
const onBorderMove = (event: PointerEvent) => {
  if (!isMoving.value) return;
  if (event.clientY + 39 - layerY.value > container.value?.top + height.value) {
    console.log('out?');
    isMoving.value = false;
  }
  if (activeSides.value.includes('top')) {
    const newTop = event.clientY - container.value?.top - layerY.value;
    top.value = newTop + 'px';
  }
  if (activeSides.value.includes('left')) {
    const newLeft = event.clientX - container.value?.left - layerX.value;
    left.value = newLeft + 'px';
  }
  if (activeSides.value.includes('bottom')) {
    const newBottom = height.value - event.clientY + container.value?.top - 40 + layerY.value;
    bottom.value = newBottom + 'px';
  }
  if (activeSides.value.includes('right')) {
    const newRight = width.value - event.clientX + container.value?.left - 40 + layerX.value;
    right.value = newRight + 'px';
  }
};
</script>

<template>
  <section
    :class="[
      'container',
      {
        flexVertical: menuPosition === 'top' || menuPosition === 'bottom',
      },
    ]"
  >
    <div id="canvas-container" @pointermove="onBorderMove" @pointerup="isMoving = false">
      <canvas ref="canvas" id="cropper-canvas"></canvas>
      <button @pointerdown="onPointerDown($event, ['left', 'top'])" class="crop-border left top">
        <CornerLeftTopIcon color="white" />
      </button>
      <button @pointerdown="onPointerDown($event, ['right', 'top'])" class="crop-border right top">
        <CornerRightTopIcon color="white" />
      </button>
      <button @pointerdown="onPointerDown($event, ['right', 'bottom'])" class="crop-border right bottom">
        <CornerRightBottomIcon color="white" />
      </button>
      <button @pointerdown="onPointerDown($event, ['left', 'bottom'])" class="crop-border left bottom">
        <CornerLeftBottomIcon color="white" />
      </button>
    </div>
    <div
      v-show="imageSource"
      :class="[
        'buttons',
        {
          order1: menuPosition === 'top' || menuPosition === 'left',
          flexVertical: menuPosition === 'right' || menuPosition === 'left',
        },
      ]"
    >
      <Button :theme="theme" :darknessTheme="darknessTheme" label="Reset" />
      <Button :theme="theme" :darknessTheme="darknessTheme" label="Save">
        <SaveIcon :color="color" size="16" />
      </Button>
    </div>
  </section>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  width: max-content;
}
#canvas-container {
  position: relative;
  line-height: 0;
}
#cropper-canvas {
  border: 1px solid black;
}
.buttons {
  display: flex;
  align-items: center;
  gap: 20px;
}
.crop-border {
  position: absolute;
  z-index: 50;
  width: 40px;
  height: 40px;
  border: 2px dashed white;
  opacity: 0.6;
  transition: opacity 0.1s ease;
  cursor: pointer;
}
.crop-border:hover {
  opacity: 0.8;
}
.crop-border:active {
  opacity: 1;
}
.left {
  left: v-bind(left);
}
.top {
  top: v-bind(top);
}
.right {
  right: v-bind(right);
}
.bottom {
  bottom: v-bind(bottom);
}
.flexVertical {
  flex-direction: column;
}
.order1 {
  order: -1;
}
</style>
