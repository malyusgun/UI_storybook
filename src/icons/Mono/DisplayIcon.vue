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
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M23 4C23 2.34315 21.6569 1 20 1H4C2.34315 1 1 2.34315 1 4V15C1 16.6569 2.34315 18 4 18H11V21H6C5.44772 21 5 21.4477 5 22C5 22.5523 5.44772 23 6 23H18C18.5523 23 19 22.5523 19 22C19 21.4477 18.5523 21 18 21H13V18H20C21.6569 18 23 16.6569 23 15V4ZM21 4C21 3.44772 20.5523 3 20 3H4C3.44772 3 3 3.44772 3 4V15C3 15.5523 3.44772 16 4 16H20C20.5523 16 21 15.5523 21 15V4Z"
      :fill="color ?? '#000000'"
    />
  </svg>
</template>

<style scoped></style>
