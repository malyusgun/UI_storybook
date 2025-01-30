<script setup lang="ts">
defineProps<{
  disable?: boolean;
  textColor: string;
  color: string;
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
  >
    <div
      :class="[
        'bg',
        {
          disableBg: disable,
        },
      ]"
    ></div>
    <div class="icon">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.arrowContainer {
  position: relative;
  min-width: 50px;
  min-height: 100%;
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
  color: v-bind(textColor);
}
.arrowContainer:hover > .bg {
  background-color: v-bind(textColor);
  opacity: 0.1;
}
.arrowContainer:active > .bg {
  opacity: 0.2;
}
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 10px;
  z-index: 5;
  opacity: 0;
  border-radius: 5px;
  background-color: transparent;
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
