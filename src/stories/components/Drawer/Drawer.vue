<script setup lang="ts">
import { computed } from 'vue';
import { iconsSet } from '@/common/constants/icons';
import { convert500ThemeToColor, convert300ThemeToColor } from '@helpers/colors';
import type { TIcons, TThemeColor } from '@interfaces/common';

const props = withDefaults(
  defineProps<{
    position: 'left' | 'right' | 'top' | 'bottom';
    width?: string | number;
    theme?: TThemeColor;
    closeIcon?: TIcons;
    isHeaderDivider?: boolean;
    isFooterDivider?: boolean;
  }>(),
  {
    position: 'left',
    visible: false,
    width: 400,
    theme: 'white',
    closeIcon: 'CrossIcon',
    isHeaderDivider: false,
    isFooterDivider: false,
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
  if (+props.width < 200) return '200px';
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
          drawerLeft: position === 'left',
          drawerRight: position === 'right',
          drawerTop: position === 'top',
          drawerBottom: position === 'bottom',
          drawerOpened: visible,
          drawerVertical: position === 'top' || position === 'bottom',
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
      <div v-if="isHeaderDivider" class="divider divider-header"></div>
      <div class="main">
        <slot />
      </div>
      <div v-if="$slots.footer">
        <div v-if="isFooterDivider" class="divider"></div>
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
  z-index: 31;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  transition: transform ease-out 0.2s;
  border-right: 2px solid gray;
}
.drawerVertical {
  width: 100vw !important;
  height: v-bind(drawerWidth) !important;
}
.drawerOpened {
  transform: translateX(0) !important;
}
.drawerLeft {
  transform: translateX(-100%);
  top: 0;
  left: 0;
}
.drawerRight {
  transform: translateX(100%);
  top: 0;
  right: 0;
}
.drawerTop {
  transform: translateY(-100%);
  top: 0;
  left: 0;
}
.drawerBottom {
  transform: translateY(100%);
  bottom: 0;
  left: 0;
}
.drawerHeader {
  font-weight: bold;
  font-size: 32px;
  width: calc(100% - 30px);
  margin-bottom: 10px;
  height: 37px;
  overflow: auto;
}
.main {
  flex: 1 1 auto;
  overflow: auto;
  margin: 10px;
}
.drawerFooter {
  padding: 10px 10px 0 10px;
  overflow: auto;
}
.divider {
  height: 2px;
  background-color: v-bind(scrollColor);
}
.divider-header {
  position: absolute;
  left: 20px;
  top: 65px;
  width: calc(100% - 40px);
}
.buttonClose {
  position: absolute;
  top: 25px;
  right: 20px;
  width: 30px;
  display: flex;
  align-items: center;
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
