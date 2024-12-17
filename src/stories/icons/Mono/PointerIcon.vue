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
      d="M11 2C11 1.44772 11.4477 1 12 1C12.5523 1 13 1.44772 13 2V3H17.9477C18.6289 3 19.2898 3.23184 19.8217 3.65739L22.0478 5.43826C23.0486 6.23891 23.0486 7.76109 22.0478 8.56174L19.8217 10.3426C19.2898 10.7682 18.6289 11 17.9477 11H13V22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22V11H5C3.34315 11 2 9.65685 2 8V6C2 4.34315 3.34315 3 5 3H11V2ZM5 5H17.9477C18.1747 5 18.395 5.07728 18.5724 5.21913L20.3104 6.60957C20.5606 6.80973 20.5606 7.19027 20.3104 7.39043L18.5724 8.78087C18.395 8.92272 18.1747 9 17.9477 9H5C4.44772 9 4 8.55228 4 8V6C4 5.44772 4.44772 5 5 5Z"
      :fill="color ?? '#000000'"
    />
  </svg>
</template>

<style scoped></style>
