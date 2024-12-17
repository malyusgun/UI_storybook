<script setup lang="ts">
interface Props {
  color?: string;
  size?: string | number;
}
defineProps<Props>();
</script>

<template>
  <svg
    :fill="color ?? '#000000'"
    :width="`${size ?? 40}px`"
    :height="`${size ?? 40}px`"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M23 13H1v-2h22z" />
    <path fill="none" d="M0 0h24v24H0z" />
  </svg>
</template>

<style scoped></style>
