<script setup lang="ts">
interface Props {
  color?: string;
  size?: string | number;
}
defineProps<Props>();
</script>

<template>
  <svg
    :width="`${size ?? 40}px`"
    :height="`${size ?? 40}px`"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4 16L13 16" :stroke="color ?? '#000000'" stroke-width="1.5" stroke-linecap="round" />
    <path d="M6 11H13" :stroke="color ?? '#000000'" stroke-width="1.5" stroke-linecap="round" />
    <path d="M8 6L13 6" :stroke="color ?? '#000000'" stroke-width="1.5" stroke-linecap="round" />
    <path
      d="M17 4L17 20L20 16"
      :stroke="color ?? '#000000'"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<style scoped></style>
