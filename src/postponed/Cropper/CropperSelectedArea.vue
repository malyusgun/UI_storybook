<script setup lang="ts">
import CornerRightBottomIcon from '@icons/Mono/CornerRightBottomIcon.vue';
import CornerRightTopIcon from '@icons/Mono/CornerRightTopIcon.vue';
import CornerLeftTopIcon from '@icons/Mono/CornerLeftTopIcon.vue';
import CornerLeftBottomIcon from '@icons/Mono/CornerLeftBottomIcon.vue';
import { computed } from 'vue';

interface IProps {
  backgroundWidth: string;
  backgroundHeight: string;
  url: string;
  top: string;
  left: string;
  selectedWidth: string;
  selectedHeight: string;
}
const props = defineProps<IProps>();
const emit = defineEmits(['onPointerDown']);

const backgroundTop = computed(() => 1 - +props.top.slice(0, -2) + 'px');
const backgroundLeft = computed(() => 1 - +props.left.slice(0, -2) + 'px');
</script>

<template>
  <div class="selected-area" :style="`width: ${selectedWidth}; height: ${selectedHeight}`">
    <div class="selected-background"></div>
    <button
      @pointerdown="emit('onPointerDown', $event, ['left', 'top'])"
      class="crop-border left top"
      style="cursor: se-resize"
    >
      <CornerLeftTopIcon color="white" />
    </button>
    <button
      @pointerdown="emit('onPointerDown', $event, ['top'])"
      class="crop-border top center"
      :style="`left: ${+selectedWidth.slice(0, -2) / 2 - 20 + 'px'}; cursor: s-resize`"
    >
      <hr style="width: 36px; height: 3px; background-color: white" />
    </button>
    <button
      @pointerdown="emit('onPointerDown', $event, ['right', 'top'])"
      class="crop-border right top"
      style="cursor: sw-resize"
    >
      <CornerRightTopIcon color="white" />
    </button>
    <button
      @pointerdown="emit('onPointerDown', $event, ['right'])"
      class="crop-border right center"
      :style="`top: ${+selectedHeight.slice(0, -2) / 2 - 20 + 'px'}; cursor: w-resize`"
    >
      <div style="width: 3px; height: 36px; margin-left: auto; background-color: white" />
    </button>
    <button
      @pointerdown="emit('onPointerDown', $event, ['right', 'bottom'])"
      class="crop-border right bottom"
      style="cursor: nw-resize"
    >
      <CornerRightBottomIcon color="white" />
    </button>
    <button
      @pointerdown="emit('onPointerDown', $event, ['bottom'])"
      class="crop-border bottom center"
      :style="`left: ${+selectedWidth.slice(0, -2) / 2 - 20 + 'px'}; cursor: n-resize`"
    >
      <hr style="width: 36px; height: 3px; background-color: white" />
    </button>
    <button
      @pointerdown="emit('onPointerDown', $event, ['left', 'bottom'])"
      class="crop-border left bottom"
      style="cursor: ne-resize"
    >
      <CornerLeftBottomIcon color="white" />
    </button>
    <button
      @pointerdown="emit('onPointerDown', $event, ['left'])"
      class="crop-border left center"
      :style="`top: ${+selectedHeight.slice(0, -2) / 2 - 20 + 'px'}; cursor: w-resize`"
    >
      <div style="width: 3px; height: 36px; background-color: white" />
    </button>
  </div>
</template>

<style scoped>
.selected-area {
  position: absolute;
  top: v-bind(top);
  left: v-bind(left);
  z-index: 5;
  filter: brightness(145%);
  background-repeat: no-repeat;
  background-size: contain;
  overflow: hidden;
}
.selected-background {
  position: absolute;
  top: v-bind(backgroundTop);
  left: v-bind(backgroundLeft);
  width: v-bind(backgroundWidth);
  height: v-bind(backgroundHeight);
  background-image: v-bind(url);
  background-repeat: no-repeat;
  background-size: v-bind(backgroundWidth) v-bind(backgroundHeight);
  overflow: hidden;
}
.crop-border {
  position: absolute;
  z-index: 50;
  width: 40px;
  height: 40px;
  border: 1px dashed white;
  opacity: 0.6;
  transition: opacity 0.1s ease;
}
.crop-border:hover {
  opacity: 0.8;
}
.crop-border:active {
  opacity: 1;
}
.left {
  left: 0;
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
.center {
  display: flex;
}
.crop-border.top.center {
  align-items: start;
}
.crop-border.bottom.center {
  align-items: end;
}
</style>
