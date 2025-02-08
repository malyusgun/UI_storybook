<script setup lang="ts">
import type { ICropperProps } from '@interfaces/componentsProps';
import { computed, ref, watch } from 'vue';
import Button from '@components/Button/Button.vue';
import { convertThemeToTextColor } from '@helpers/common';
import SaveIcon from '@icons/Mono/SaveIcon.vue';
import { calcContainerRect } from '@/postponed/Cropper/helpers';
import CropperSelectedArea from '@/postponed/Cropper/CropperSelectedArea.vue';

const props = withDefaults(defineProps<ICropperProps>(), {
  width: 300,
  height: 300,
  menuPosition: 'top',
  theme: 'black',
  darknessTheme: '500',
});

const emit = defineEmits(['onSave']);

const canvas = ref();
const image = ref();
const layerX = ref(0);
const layerY = ref(0);
const activeSides = ref<string[]>(['top', 'left']);

const isMoving = ref<boolean>(false);
const top = ref('0px');
const left = ref('0px');
const selectedWidth = ref(props.width + 'px');
const selectedHeight = ref(props.height + 'px');

const ctx = computed(() => canvas.value && canvas.value.getContext('2d'));
const imageSource = computed(() => props.src ?? props.file);
const width = computed(() => props.width);
const height = computed(() => props.height);
const color = computed(() => convertThemeToTextColor(props.theme, props.darknessTheme));
const container = computed(() => calcContainerRect());
const url = computed(() => `url(${props.src})`);
const backgroundWidth = computed(() => props.width + 'px');
const backgroundHeight = computed(() => props.height + 'px');

watch(
  [imageSource, ctx, width, height],
  () => {
    if (!imageSource.value) return;

    image.value = new Image();
    image.value.crossOrigin = 'anonymous';
    image.value.src = props.src ?? URL.createObjectURL(props.file!);

    image.value.onload = () => {
      canvas.value.width = width.value ?? 0;
      canvas.value.height = height.value ?? 0;
      ctx.value?.drawImage(image.value, 0, 0, width.value ?? 0, height.value ?? 0);
    };
  },
  { immediate: true },
);

const onBorderMove = (event: PointerEvent) => {
  if (!isMoving.value) return;

  if (
    activeSides.value.includes('top') &&
    !(event.clientY - layerY.value < (container.value?.top ?? 0)) &&
    !(event.clientY + 38 - layerY.value > (container.value?.top ?? 0) + height.value)
  ) {
    const newTop = event.clientY - (container.value?.top ?? 0) - layerY.value;
    selectedHeight.value = +selectedHeight.value.slice(0, -2) - (newTop - +top.value.slice(0, -2)) + 'px';
    top.value = newTop + 'px';
  }
  if (
    activeSides.value.includes('left') &&
    !(event.clientX - layerX.value < (container.value?.left ?? 0)) &&
    !(event.clientX + 38 - layerX.value > (container.value?.left ?? 0) + width.value)
  ) {
    const newLeft = event.clientX - (container.value?.left ?? 0) - layerX.value;
    selectedWidth.value = +selectedWidth.value.slice(0, -2) - (newLeft - +left.value.slice(0, -2)) + 'px';
    left.value = newLeft + 'px';
  }
  if (
    activeSides.value.includes('bottom') &&
    !(event.clientY - layerY.value < (container.value?.top ?? 0)) &&
    !(event.clientY + 38 - layerY.value > (container.value?.top ?? 0) + height.value)
  ) {
    const newHeight = -+top.value.slice(0, -2) + event.clientY - (container.value?.top ?? 0) + 38 - layerY.value;
    selectedHeight.value = newHeight + 'px';
  }
  if (
    activeSides.value.includes('right') &&
    !(event.clientX - layerX.value < (container.value?.left ?? 0)) &&
    !(event.clientX + 38 - layerX.value > (container.value?.left ?? 0) + width.value)
  ) {
    const newWidth = -+left.value.slice(0, -2) + event.clientX - (container.value?.left ?? 0) + 38 - layerX.value;
    selectedWidth.value = newWidth + 'px';
  }
};

const onPointerUp = () => {
  isMoving.value = false;
  document.removeEventListener('pointermove', onBorderMove);
  document.removeEventListener('pointerup', onPointerUp);
};

const onPointerDown = (event: PointerEvent, newSides: string[]) => {
  document.addEventListener('pointermove', onBorderMove);
  document.addEventListener('pointerup', onPointerUp);
  activeSides.value = newSides;
  layerX.value = event.layerX;
  layerY.value = event.layerY;
  isMoving.value = true;
};

const resetSelected = () => {
  top.value = '0px';
  left.value = '0px';
  selectedWidth.value = width.value + 'px';
  selectedHeight.value = height.value + 'px';
};

// TODO не получается корректно получить ссылку на изображение. Тестировалось в Playground - всегда получал
// TODO ...либо полностью чёрное, либо полностью белое изображение
const saveImage = () => {
  ctx.value.fillStyle = 'rgb(200,0,0)';
  ctx.value.fillRect(40, 60, 20, 20);
  ctx.value.clearRect(0, 0, width.value, height.value);
  ctx.value.drawImage(image.value, left.value, top.value, selectedWidth.value, selectedHeight.value);
  const canvasEl = document.querySelector('#cropper-canvas')!;
  canvas.value.toBlob((blob: Blob) => {
    console.log('canvasEl: ', canvasEl);
    console.log('URL.createObjectURL(blob): ', URL.createObjectURL(blob));
    console.log('blob: ', blob);
    const file = new File([blob], 'fileName.png');
    console.log('file: ', file);
    console.log('url: ', URL.createObjectURL(blob));
    console.log('toDataURL: ', canvas.value.toDataURL());
    emit('onSave', canvas.value.toDataURL());
    // emit('onSave', canvas.value.toDataURL('image/jpeg'));
  }, 'image/jpeg');
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
    <div id="canvas-container" v-show="src || file">
      <canvas ref="canvas" id="cropper-canvas"></canvas>
      <CropperSelectedArea
        :backgroundWidth="backgroundWidth"
        :backgroundHeight="backgroundHeight"
        :url="url"
        :selectedWidth="selectedWidth"
        :selectedHeight="selectedHeight"
        :top="top"
        :left="left"
        @onPointerDown="onPointerDown"
      />
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
      <Button @click="resetSelected" :theme="theme" :darknessTheme="darknessTheme" label="Reset" />
      <Button @click="saveImage" :theme="theme" :darknessTheme="darknessTheme" label="Save">
        <SaveIcon :color="color" size="16" />
      </Button>
    </div>
  </section>
</template>

<style scoped>
#canvas-container {
  position: relative;
  line-height: 0;
  filter: brightness(70%);
}
#cropper-canvas {
  border: 1px solid black;
}
.container {
  display: flex;
  align-items: center;
  width: max-content;
  padding: 1px;
}
.buttons {
  display: flex;
  align-items: center;
  gap: 20px;
}
.flexVertical {
  flex-direction: column;
}
.order1 {
  order: -1;
}
</style>
