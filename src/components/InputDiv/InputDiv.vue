<script setup lang="ts">
import type { IInputDivProps } from '@interfaces/componentsProps';
import { computed } from 'vue';
import { convertThemeToColor, convertThemeToTextColor, getValueFromSize } from '@helpers/common';

const props = withDefaults(defineProps<IInputDivProps>(), {
  scheme: '4by1',
  size: 'normal',
  theme: 'white',
});

const inputPartsBy = computed(() => {
  if (!props.scheme.includes('by')) return null;
  const splat = props.scheme.split('by');
  const by = splat[1];
  const result = [];
  for (let i = 0; i < +splat[0]; i++) {
    result.push(Array(by).keys());
  }
  return result;
});
const inputPartsDash = computed(() => {
  if (!props.scheme.includes('-')) return null;
  return props.scheme.split('-').map((item) => Array(item).keys());
});

const themeColor = computed(() => convertThemeToColor(props.theme, props.darknessTheme));
const color = computed(() =>
  props.textColor
    ? convertThemeToColor(props.textColor, props.darknessTextColor)
    : convertThemeToTextColor(props.theme, props.darknessTheme),
);
const sizeCoefficient = computed(() => getValueFromSize(props.size, [0.75, 1, 2, 3]));
</script>

<template>
  <section class="inputDiv-container">
    {{ inputPartsBy }}
    {{ inputPartsDash }}
    <div v-show="inputPartsBy" class="list">
      <div v-for="item of inputPartsBy" :key="item" class="item"><input type="text" class="input" /></div>
    </div>
    <div v-show="inputPartsDash" class="list">
      <div v-for="item of inputPartsDash" :key="item" class="item"><input type="text" class="input" /></div>
    </div>
  </section>
</template>

<style scoped>
.list {
  display: flex;
  gap: 20px;
}
.input {
  border: 1px solid black;
}
</style>
