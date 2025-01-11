<script setup lang="ts">
interface Props {
  color?: string;
  size?: string | number;
}
defineProps<Props>();
</script>

<template>
  <svg
    :width="size ?? '40px'"
    :height="size ?? '40px'"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 300 300"
    shape-rendering="geometricPrecision"
    text-rendering="geometricPrecision"
  >
    <line
      x1="-63.725864"
      y1="-43.107899"
      x2="62.725865"
      y2="43.107899"
      transform="matrix(1.066014 0 0 1.167066 83.13335 150)"
      fill="none"
      :stroke="color ?? '#000000'"
      stroke-width="30"
      stroke-linecap="round"
    />
    <line
      x1="-62.725864"
      y1="-43.107899"
      x2="62.725865"
      y2="43.107899"
      transform="matrix(-1.068571 0 0 1.167066 217.02704 150)"
      fill="none"
      :stroke="color ?? '#000000'"
      stroke-width="30"
      stroke-linecap="round"
    />
  </svg>
</template>

<style scoped></style>
