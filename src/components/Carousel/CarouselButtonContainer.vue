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
  width: v-bind(width);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: v-bind(color);
  border-radius: v-bind(borderRadius);
}
.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1.2;
  color: v-bind(textColor);
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
  border-radius: v-bind(borderRadius);
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
