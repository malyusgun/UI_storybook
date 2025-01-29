<script setup lang="ts">
defineProps<{
  disable?: boolean;
  textColor: string;
  color: string;
}>();
</script>

<template>
  <div class="arrowContainer">
    <div
      :class="[
        'icon',
        {
          disable,
        },
      ]"
    >
      <div
        :class="[
          'bg',
          {
            disableBg: disable,
          },
        ]"
      ></div>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.arrowContainer {
  width: 50px;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  line-height: 1.2;
  color: v-bind(textColor);
}
.icon::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  z-index: -1;
  background-color: v-bind(color);
}
.icon:hover > .bg {
  background-color: v-bind(textColor);
  opacity: 0.1;
}
.icon:active > .bg {
  opacity: 0.2;
}
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  z-index: 5;
  border-radius: 50%;
  background-color: transparent;
  opacity: 0;
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
