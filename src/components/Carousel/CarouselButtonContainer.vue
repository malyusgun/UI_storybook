<script setup lang="ts">
defineProps<{
  disable?: boolean;
  textColor: string;
  color: string;
  width: string;
  borderRadius: string;
}>();
</script>

<template>
  <div
    :class="[
      'arrowContainer',
      {
        disable,
      },
    ]"
    :style="`width: ${width}; background-color: ${color}; border-radius: ${borderRadius};`"
  >
    <div
      :class="[
        'bg',
        {
          disableBg: disable,
        },
      ]"
      :style="`border-radius: ${borderRadius}`"
    ></div>
    <div class="icon" :style="`color: ${textColor};`">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.arrowContainer {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1.2;
}
.arrowContainer:hover > .bg {
  opacity: 0.1;
}
.arrowContainer:active > .bg {
  opacity: 0.2;
}
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0;
  background-color: black;
  transition: all 0.2s ease;
}
.disable {
  cursor: auto;
  pointer-events: none;
}
.disableBg {
  background-color: white !important;
}
</style>
