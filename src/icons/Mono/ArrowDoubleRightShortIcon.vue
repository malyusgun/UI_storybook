<script setup lang="ts">
interface Props {
  color?: string;
  size?: string | number;
}
defineProps<Props>();
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="`${size ?? 40}px`"
    :height="`${size ?? 40}px`"
    viewBox="0 0 532.153 532.153"
    xml:space="preserve"
  >
    <line
      x1="180"
      y1="-100"
      x2="385"
      y2="100"
      transform="matrix(1.066014 0 0 1.167066 83.13335 150)"
      fill="none"
      :stroke="color ?? '#000000'"
      stroke-width="50"
      stroke-linecap="round"
    />
    <line
      x1="385"
      y1="100"
      x2="180"
      y2="300"
      transform="matrix(1.066014 0 0 1.167066 83.13335 150)"
      fill="none"
      :stroke="color ?? '#000000'"
      stroke-width="50"
      stroke-linecap="round"
    />
    <line
      x1="0"
      y1="-100"
      x2="205"
      y2="100"
      transform="matrix(1.066014 0 0 1.167066 83.13335 150)"
      fill="none"
      :stroke="color ?? '#000000'"
      stroke-width="50"
      stroke-linecap="round"
    />
    <line
      x1="205"
      y1="100"
      x2="0"
      y2="300"
      transform="matrix(1.066014 0 0 1.167066 83.13335 150)"
      fill="none"
      :stroke="color ?? '#000000'"
      stroke-width="50"
      stroke-linecap="round"
    />
  </svg>
</template>

<style scoped></style>
