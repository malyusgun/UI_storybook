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
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10.3161 15c-1.6515 0-2.9368 0-3.968-.0843-1.0469-.0855-1.8975-.2616-2.6626-.6515C2.4154 13.6171 1.3829 12.5846.7358 11.3145.3459 10.5494.1698 9.6987.0843 8.6518 0 7.6207 0 6.3354 0 4.6839V4.65 1.438C.01 1.03.23.7.8.7s.78.341.78.769V4.65c0 1.6926.0006 2.9169.0792 3.8798.078.9542.2289 1.5854.493 2.1038.5032.9877 1.3065 1.791 2.2942 2.2942.5184.2641 1.1496.4151 2.1038.493C7.4331 13.4994 8.6574 13.5 10.35 13.5H13.259c.4142 0 .75.3358.75.75s-.3358.75-.973.731H10.35 10.3161Z"
      :fill="color ?? '#000000'"
    />
  </svg>
</template>

<style scoped></style>
