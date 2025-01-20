<script setup lang="ts">
defineProps<{
  active?: boolean;
  disable?: boolean;
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
}
.item:hover > .bg {
  opacity: 1;
}
.item:active > .bg {
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.2);
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
  background-color: rgba(0, 0, 0, 0.1);
  opacity: 0;
  transition: all 0.2s ease;
}
.item > .active {
  background-color: black !important;
  opacity: 1;
}
.active + * {
  color: white;
}
.disable {
  cursor: auto;
  pointer-events: none;
}
.disableBg {
  background-color: white !important;
}
</style>
