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
      d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM12 20.9932C7.03321 20.9932 3.00683 16.9668 3.00683 12C3.00683 7.37122 6.50383 3.55921 11 3.0618V11.5858C11 12.1162 11.2107 12.6249 11.5858 13L17.6128 19.027C16.0744 20.2574 14.1231 20.9932 12 20.9932ZM19.027 17.6128L14.7556 13.3414C14.6296 13.2154 14.7189 13 14.8971 13H20.9382C20.7464 14.734 20.0616 16.3193 19.027 17.6128ZM20.9382 11H13.5C13.2239 11 13 10.7761 13 10.5V3.0618C17.1678 3.52289 20.4771 6.83216 20.9382 11Z"
      :fill="color ?? '#000000'"
    />
  </svg>
</template>

<style scoped></style>
