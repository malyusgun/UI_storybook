<script setup lang="ts">
import type { IKnobProps } from '@interfaces/componentsProps';
import { computed } from 'vue';
import { convertThemeToColor } from '@helpers/common';

const props = withDefaults(defineProps<IKnobProps>(), {
  min: 0,
  max: 2,
  negativeTheme: 'black',
  showLabel: true,
});
const value = defineModel('value');

const degreesTotal = computed(() => 360 - 90);
const length = computed(() => props.max - props.min);
const textColor = computed(() => convertThemeToColor(props.theme, props.darknessTheme));
const background = computed(() => {
  const color = convertThemeToColor(
    props.negativeTheme ?? (props.theme === 'white' ? 'black' : props.theme === 'black' ? 'white' : props.theme),
    (!props.negativeTheme && props.theme === 'black') || props.negativeTheme === 'white'
      ? '500'
      : props.darknessNegativeTheme,
  );
  return `radial-gradient(circle at center, transparent 50%, ${color} 50%)`;
});
const conicGradient = computed(() => {
  return `conic-gradient(red ${(225 + (1 / length.value) * degreesTotal.value) % 360}deg, transparent 225deg)`;
});
</script>

<template>
  {{ (225 + (1 / length) * degreesTotal) % 360 }}
  {{ length }}
  {{ conicGradient }}
  <section class="container">
    <div class="circle" :style="`width: 100px; height: 100px`">
      <div class="circle selected" :style="`width: 100px; height: 100px`"></div>

      <span v-if="showLabel" class="count">{{ value }}</span>
    </div>
  </section>
</template>

<style scoped>
.container {
  position: relative;
}
.circle {
  overflow: hidden;
  border-radius: 50%;
  background: v-bind(background);
  clip-path: polygon(0 0, 0 100%, 50% 50%, 50% 50%, 100% 100%, 100% 0);
}
.selected {
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: v-bind(conicGradient);
}
.count {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
