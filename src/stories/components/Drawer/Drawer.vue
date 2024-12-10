<script setup lang="ts">
import { convert500ThemeToColor, convert300ThemeToColor } from '@helpers/colors';
import type { TThemeColor } from '@interfaces/common';
import { computed } from 'vue';
import { iconsSet } from '@helpers/icons';

const props = withDefaults(
  defineProps<{
    width?: string | number;
    theme?: TThemeColor;
    closeIcon?: string;
  }>(),
  {
    visible: false,
    width: 400,
    theme: 'white',
    closeIcon: 'CrossCircleIcon',
  },
);
const emit = defineEmits(['onClose']);
const visible = defineModel<boolean>('visible');

const themeColor = computed(() => convert500ThemeToColor(props.theme));
const scrollColor = computed(() => convert300ThemeToColor(props.theme));
const textColor = computed(() => {
  if (!props.theme || props.theme === 'white') return 'black';
  return 'white';
});
const drawerWidth = computed(() => {
  if (+props.width < 100) return '100px';
  return `${props.width}px`;
});
</script>

<template>
  <article>
    <section
      :class="[
        'drawerBackground',
        {
          drawerBackgroundOpened: visible,
        },
      ]"
      @click.prevent="visible = false"
    ></section>
    <section
      :style="`color: ${textColor}; background-color: ${themeColor}`"
      :class="[
        'drawer',
        {
          drawerOpened: visible,
        },
      ]"
    >
      <header class="drawerHeader">
        <slot name="header" />
        <button
          class="buttonClose"
          @click.prevent="
            () => {
              visible = false;
              emit('onClose');
            }
          "
        >
          <component :is="iconsSet[closeIcon]" :color="textColor" />
        </button>
      </header>
      <div class="main">
        <slot />
      </div>
      <div v-if="$slots.footer">
        <div class="divider"></div>
        <footer class="drawerFooter">
          <slot name="footer" />
        </footer>
      </div>
    </section>
  </article>
</template>

<style scoped>
.drawerBackground {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all ease-out 0.2s;
  z-index: -50;
  opacity: 0;
}
.drawerBackgroundOpened {
  z-index: 30;
  opacity: 1;
}
.drawer {
  width: v-bind(drawerWidth);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 31;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  transform: translateX(-100%);
  transition: transform ease-out 0.2s;
  border-right: 2px solid gray;
}
.drawerOpened {
  transform: translateX(0);
}
.drawerHeader {
  font-weight: bold;
  font-size: 2rem;
  padding-right: 50px;
  margin-bottom: 10px;
  min-height: 1rem;
  overflow: auto;
}
.main {
  flex: 1 1 auto;
  overflow: auto;
  padding: 10px;
}
.drawerFooter {
  overflow: auto;
  padding: 10px 10px 0 10px;
}
.divider {
  height: 2px;
  background-color: v-bind(scrollColor);
}
.buttonClose {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 30px;
}
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: v-bind(scrollColor);
}
</style>
