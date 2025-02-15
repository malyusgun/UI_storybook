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
    viewBox="3 3 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M9.8774 3c-1.101 0-1.9579 0-2.6453.0562-.6979.057-1.265.1744-1.7751.4343-.8467.4314-1.5351 1.1198-1.9665 1.9665-.2599.5101-.3773 1.0772-.4343 1.7751C3 7.9195 3 9 3 10V9.9v2.1c0 .2761.2239.5.5.5s.5-.2239.5-.5V9.9c0-1.1284.0004-1.9446.0528-2.5865.052-.6361.1526-1.0569.3287-1.4025.3355-.6585.871-1.194 1.5295-1.5295.3456-.1761.7664-.2767 1.4025-.3287C7.9554 4.0004 8.7716 4 9.9 4h2.1c.2761 0 .5-.2239.5-.5s-.2239-.5-.5-.5H9.9 9.8774Z"
      :fill="color ?? '#000000'"
    />
  </svg>
</template>

<style scoped></style>
