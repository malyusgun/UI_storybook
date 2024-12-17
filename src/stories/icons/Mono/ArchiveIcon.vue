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
      d="M8 10C7.44772 10 7 10.4477 7 11C7 11.5523 7.44772 12 8 12H16C16.5523 12 17 11.5523 17 11C17 10.4477 16.5523 10 16 10H8Z"
      :fill="color ?? '#000000'"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M23 4C23 2.34315 21.6569 1 20 1H4C2.34315 1 1 2.34315 1 4V5C1 6.30622 1.83481 7.41746 3 7.82929V20C3 21.6569 4.34315 23 6 23H18C19.6569 23 21 21.6569 21 20V7.82929C22.1652 7.41746 23 6.30622 23 5V4ZM20 6H4C3.44772 6 3 5.55228 3 5V4C3 3.44772 3.44772 3 4 3H20C20.5523 3 21 3.44772 21 4V5C21 5.55228 20.5523 6 20 6ZM5 20V8H19V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20Z"
      :fill="color ?? '#000000'"
    />
  </svg>
</template>

<style scoped></style>
