<script setup lang="ts">
import type { IPopupProps } from '../../common/interfaces/componentsProps';
import { computed, type Ref, ref, watch } from 'vue';
import { convertThemeToColor, convertThemeToSecondaryColor } from '../../common/helpers/common';
import type { CustomWindow } from '../../common/interfaces/common';

const props = withDefaults(defineProps<IPopupProps>(), {
  parentSelector: 'body',
  theme: 'white',
  border: 'black',
  maxWidth: '300px',
  maxHeight: '100px',
  padding: '5px',
  darknessTheme: '500',
});
const active = defineModel<boolean>() as Ref<boolean>;
const themeColor = computed(() => convertThemeToColor(props.theme, props.darknessTheme));
const secondaryColor = computed(() => convertThemeToSecondaryColor(props.theme, props.darknessTheme));

const top = ref();
const left = ref();
const isOnContainerClick = ref();

const popup = ref();
const parent = computed(() => props.parentSelector);
const container: Ref = ref(document.querySelector(props.parentSelector));
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
      if (props.buttonMenuPosition) {
        const clientRect = container.value?.getBoundingClientRect();
        const position = props.buttonMenuPosition;
        const scrollY = window.scrollY;

        if (!position) {
          top.value = scrollY + (props.top || clientRect.top);
          left.value = scrollY + (props.left || clientRect.left);
        } else {
          top.value =
            position && position === 'bottom'
              ? scrollY + clientRect.top - popup.value.clientHeight - 5
              : scrollY + clientRect.top + clientRect.height + 5;
          left.value = props.left || clientRect.left;
        }
      }

      container.value.addEventListener('pointerdown', (event: MouseEvent) => {
        const e = event as PointerEvent;
        if (e.button === 2 || (props.buttonMenuPosition && e.button === 0)) {
          isOnContainerClick.value = true;

          if (!props.buttonMenuPosition) {
            top.value = e.pageY;
            left.value = e.pageX;
          }

          if (!active.value && !props.buttonMenuPosition && !(window as CustomWindow).blockPopupActions)
            active.value = true;
          e.stopPropagation();
        }
      });
      container.value.addEventListener('contextmenu', (e: MouseEvent) => {
        if (isOnContainerClick.value) e.preventDefault();
      });
    }

    document.addEventListener('pointerdown', (e: MouseEvent) => {
      if (!props.buttonMenuPosition && e.button === 0 && !(window as CustomWindow).blockPopupActions)
        active.value = false;
    });
  },
  { immediate: true },
);
</script>

<template>
  <section
    ref="popup"
    oncontextmenu="return false"
    id="popup"
    @pointerdown.stop=""
    :style="`top: ${top}px; left: ${left}px; opacity: ${active ? 1 : 0}; pointer-events: ${active ? 'auto' : 'none'}; padding: ${padding}; background-color: ${themeColor};
  border: 1px solid ${secondaryColor};`"
  >
    <div :style="`max-width: ${maxWidth}; max-height: ${maxHeight}; overflow: auto`">
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
  border-radius: 5px;
}
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: v-bind(secondaryColor);
}
</style>
