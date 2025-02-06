<script setup lang="ts">
import type { ICropperProps } from '@interfaces/componentsProps';
import { computed, ref, watch } from 'vue';
import Button from '@components/Button/Button.vue';
import { convertThemeToTextColor } from '@helpers/common';
import SaveIcon from '@icons/Mono/SaveIcon.vue';
import CornerLeftTopIcon from '@icons/Mono/CornerLeftTopIcon.vue';

const props = withDefaults(defineProps<ICropperProps>(), {
  width: 300,
  height: 300,
  menuPosition: 'top',
  theme: 'black',
  darknessTheme: '500',
});

const canvas = ref();

const ctx = computed(() => canvas.value && canvas.value.getContext('2d'));
const imageSource = computed(() => props.src ?? props.file);
const width = computed(() => props.width);
const height = computed(() => props.height);
const color = computed(() => convertThemeToTextColor(props.theme, props.darknessTheme));

watch(
  [imageSource, ctx, width, height],
  () => {
    if (!imageSource.value) return;

    const img = new Image();
    img.src = props.src ?? URL.createObjectURL(props.file);

    img.onload = () => {
      canvas.value.width = width.value ?? 0;
      canvas.value.height = height.value ?? 0;
      ctx.value?.drawImage(img, 0, 0, width.value ?? 0, height.value ?? 0);
    };
  },
  { immediate: true },
);
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
    <div class="canvas-container">
      <canvas ref="canvas" id="cropper-canvas"> </canvas>
      <div class="crop-border left top">
        <CornerLeftTopIcon size="16" />
      </div>
      <div class="crop-border right top"></div>
      <div class="crop-border left bottom"></div>
      <div class="crop-border right bottom"></div>
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
.canvas-container {
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
  width: 20px;
  height: 20px;
  background-color: gray;
}
.top {
  top: 0;
}
.right {
  right: 0;
}
.bottom {
  bottom: 0;
}
.flexVertical {
  flex-direction: column;
}
.order1 {
  order: -1;
}
</style>
