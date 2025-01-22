<script setup lang="ts">
defineProps<{
  active?: boolean;
  disable?: boolean;
  textColor: string;
  color: string;
}>();
</script>

<template>
  <div
    :class="[
      'item',
      {
        disable,
      },
    ]"
  >
    <div
      :class="[
        'bg',
        {
          active,
          disableBg: disable,
        },
      ]"
    ></div>
    <slot />
  </div>
</template>

<style>
.item {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  line-height: 1.2;
  color: v-bind(textColor);
}
.item::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  z-index: -1;
  background-color: v-bind(color);
}
.item:hover > .bg:not(.active) {
  background-color: v-bind(textColor);
  opacity: 0.1;
}
.item:active > .bg:not(.active) {
  opacity: 0.2;
}
.bg {
  width: 120%;
  height: 120%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  z-index: -1;
  border-radius: 50%;
  background-color: transparent;
  opacity: 0;
  transition: all 0.2s ease;
}
.item > .active {
  background-color: v-bind(textColor) !important;
  opacity: 1;
}
.active + * {
  color: v-bind(color);
}
.disable {
  cursor: auto;
  pointer-events: none;
}
.disableBg {
  background-color: white !important;
}
</style>
