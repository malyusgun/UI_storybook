<script setup lang="ts">
interface Props {
  color?: string;
  size?: string | number;
}
defineProps<Props>();
</script>

<template>
  <svg
    id="left-arrow"
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
      x1="23"
      y1="12"
      x2="2"
      y2="12"
      :stroke="color ?? 'currentColor'"
      style="fill: none; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2"
    ></line>
    <polyline
      id="primary-2"
      data-name="primary"
      points="6 7 1 12 6 17"
      :stroke="color ?? 'currentColor'"
      style="fill: none; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2"
    ></polyline>
  </svg>
</template>

<style scoped></style>
