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
      d="M12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11Z"
      :fill="color ?? '#000000'"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M5 4C5 2.34315 6.34315 1 8 1H16C17.6569 1 19 2.34315 19 4V5.33333C19 5.98244 18.7895 6.61404 18.4 7.13333L16 10.3333V20C16 21.6569 14.6569 23 13 23H11C9.34315 23 8 21.6569 8 20V10.3333L5.6 7.13333C5.21053 6.61404 5 5.98244 5 5.33333V4ZM8 3C7.44772 3 7 3.44772 7 4H17C17 3.44772 16.5523 3 16 3H8ZM9.6 9.13333L7.25 6H16.75L14.4 9.13333C14.1404 9.47952 14 9.90059 14 10.3333V20C14 20.5523 13.5523 21 13 21H11C10.4477 21 10 20.5523 10 20V10.3333C10 9.90059 9.85964 9.47952 9.6 9.13333Z"
      :fill="color ?? '#000000'"
    />
  </svg>
</template>

<style scoped></style>
