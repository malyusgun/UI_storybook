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
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby="sortDownIconTitle"
    :stroke="color ?? '#000000'"
    stroke-width="2.4"
    stroke-linecap="round"
    stroke-linejoin="round"
    fill="none"
    :color="color ?? '#000000'"
  >
    <path d="M11 14H16" />
    <path d="M11 9H19" />
    <path d="M11 4H22" />
    <path d="M9 18L5 22L1 18" />
    <path d="M5 2V20" />
  </svg>
</template>

<style scoped></style>
