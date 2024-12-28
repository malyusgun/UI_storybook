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
    viewBox="0 0 24.00 24.00"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby="sortUpIconTitle"
    :stroke="color ?? '#000000'"
    stroke-width="2.4"
    stroke-linecap="round"
    stroke-linejoin="round"
    fill="none"
    :color="color ?? '#000000'"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0" />

    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="1" />

    <g id="SVGRepo_iconCarrier">
      <path d="M11 10H16" />
      <path d="M11 15H19" />
      <path d="M11 20H22" />
      <path d="M1 6L5 2L9 6" />
      <path d="M5 22L5 4" />
    </g>
  </svg>
</template>

<style scoped></style>
