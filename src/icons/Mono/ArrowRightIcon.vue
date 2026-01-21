<script setup lang="ts">
interface Props {
  color?: string;
  size?: string | number;
}
defineProps<Props>();
</script>

<template>
  <svg
    id="right-arrow"
    :fill="color ?? 'currentColor'"
    :width="size ?? '40px'"
    :height="size ?? '40px'"
    viewBox="0 0 24 24"
    data-name="Flat Line"
    xmlns="http://www.w3.org/2000/svg"
    class="icon flat-line"
  >
    <line
      id="primary"
      x1="1"
      y1="12"
      x2="23"
      y2="12"
      :stroke="color ?? 'currentColor'"
      style="fill: none; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2"
    ></line>
    <polyline
      id="primary-2"
      data-name="primary"
      points="18 17 23 12 18 7"
      :stroke="color ?? 'currentColor'"
      style="fill: none; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2"
    ></polyline>
  </svg>
</template>

<style scoped></style>
