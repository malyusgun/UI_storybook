<script setup lang="ts"></script>

<template>
  <div class="item">
    <div class="bg"></div>
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
}
.item:hover > .bg {
  opacity: 1;
}
.item:active > .bg {
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.2) !important;
}
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.1);
  opacity: 0;
  transition: all 0.15s ease;
}
</style>
