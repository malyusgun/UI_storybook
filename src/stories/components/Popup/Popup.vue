<script setup lang="ts">
import type { IPopupProps } from '@interfaces/componentsProps';
import { computed, type Ref, ref, watch } from 'vue';
import { convertThemeToColor, convertThemeToSecondaryColor } from '@helpers/common';
import type { CustomWindow } from '@interfaces/common';

const props = withDefaults(defineProps<IPopupProps>(), {
  parentSelector: 'body',
  theme: 'white',
  border: 'black',
  maxWidth: '300px',
  maxHeight: '100px',
  padding: '5px',
  darknessTheme: '500',
});
const active = defineModel<boolean>('active') as Ref<boolean>;
const themeColor = computed(() => convertThemeToColor(props.theme, props.darknessTheme));
const secondaryColor = computed(() => convertThemeToSecondaryColor(props.theme, props.darknessTheme));

const top = ref();
const left = ref();
const isOnContainerClick = ref();

const parent = computed(() => props.parentSelector);
const container = ref(document.querySelector(props.parentSelector));
if (!container.value) {
  setTimeout(() => {
    container.value = document.querySelector(props.parentSelector);
  }, 0);
}
watch(parent, () => (container.value = document.querySelector(props.parentSelector)));
watch(
  container,
  () => {
    if (container.value) {
      if (props.buttonMenu) {
        const clientRect = container.value?.getBoundingClientRect();
        top.value = props.top ?? clientRect.top;
        left.value = props.left ?? clientRect.left;
        console.log('left: ', left.value);
      }

      container.value.addEventListener('pointerdown', (event: Event) => {
        const e = event as PointerEvent;
        if (e.button === 2 || (props.buttonMenu && e.button === 0)) {
          isOnContainerClick.value = true;
          if (!props.buttonMenu) {
            top.value = e.pageY;
            left.value = e.pageX;
          }
          if (!active.value && !props.buttonMenu && !(window as CustomWindow).blockPopupActions) active.value = true;
          e.stopPropagation();
        }
      });
      container.value.addEventListener('contextmenu', (e) => {
        if (isOnContainerClick.value) e.preventDefault();
      });
    }

    document.addEventListener('pointerdown', (e) => {
      if (!props.buttonMenu && e.button === 0 && !(window as CustomWindow).blockPopupActions) active.value = false;
    });
  },
  { immediate: true },
);
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
  position: absolute;
  z-index: 9999;
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
