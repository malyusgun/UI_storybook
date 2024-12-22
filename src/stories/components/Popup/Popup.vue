<script setup lang="ts">
import type { IPopupProps } from '@interfaces/componentsProps';
import { computed, ref } from 'vue';
import { convertThemeToColor, convertThemeToSecondaryColor } from '@helpers/common';

const props = withDefaults(defineProps<IPopupProps>(), {
  parentSelector: 'body',
  theme: 'white',
  border: 'black',
  maxWidth: '300px',
  maxHeight: '100px',
  padding: '5px',
  darknessTheme: '500',
});
const active = defineModel<boolean>('active');
const themeColor = computed(() => convertThemeToColor(props.theme, props.darknessTheme));
const secondaryColor = computed(() => convertThemeToSecondaryColor(props.theme, props.darknessTheme));

const top = ref();
const left = ref();
const isContainer = ref();

const container = document.querySelector(props.parentSelector);
if (container) {
  container.addEventListener('pointerdown', (event: Event) => {
    const e = event as PointerEvent;
    if (e.button === 2) {
      isContainer.value = true;
      if (!active.value) active.value = true;
      top.value = e.clientY;
      left.value = e.clientX;
      e.stopPropagation();
    }
  });
  container.addEventListener('contextmenu', (e) => {
    if (isContainer.value) e.preventDefault();
  });
}

document.addEventListener('pointerdown', (e) => {
  if (e.button === 0) active.value = false;
});
</script>

<template>
  <section
    oncontextmenu="return false"
    id="popup"
    @pointerdown.stop=""
    :style="`top: ${top}px; left: ${left}px; opacity: ${active ? 1 : 0}; pointer-events: ${active ? 'auto' : 'none'}; padding: ${padding}`"
  >
    <div :style="`max-width: ${maxWidth}; max-height: ${maxHeight}; overflow: auto; padding-right: 5px`">
      <slot />
      <p v-if="!$slots.default" style="background-color: black; color: white; padding: 10px">Popup</p>
    </div>
  </section>
</template>

<style scoped>
#popup {
  position: fixed;
  transition: opacity 0.2s ease-in-out;
  background-color: v-bind(themeColor);
  border: 1px solid v-bind(secondaryColor);
  border-radius: 5px;
}
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: v-bind(secondaryColor);
}
</style>
