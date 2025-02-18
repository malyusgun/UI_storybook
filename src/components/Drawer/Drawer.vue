<script setup lang="ts">
import { computed, type Ref, watch } from 'vue';
import { iconsSet } from '../../common/constants/icons';
import type { IDrawerProps } from '../../common/interfaces/componentsProps';
import {
  convertThemeToColor,
  convertThemeToSecondaryColor,
  convertThemeToTextColor,
} from '../../common/helpers/common';
import type { CustomWindow } from '../../common/interfaces/common';

const props = withDefaults(defineProps<IDrawerProps>(), {
  position: 'left',
  width: 400,
  modal: true,
  dismissible: true,
  theme: 'white',
  darknessTheme: '500',
  closeIcon: 'Cross',
  headerDivider: false,
  footerDivider: false,
});
const body = document.querySelector('body')!;
const emit = defineEmits(['onClose']);
const visible = defineModel<boolean>('visible', {
  set(value) {
    if (!value) {
      (window as CustomWindow).blockPopupActions = false;
      body.style.overflow = 'auto';
      body.style.paddingRight = '0';
      emit('onClose');
    }
    return value;
  },
}) as Ref<boolean>;
watch(visible, () => {
  if (visible.value) {
    (window as CustomWindow).blockPopupActions = true;
    body.style.overflow = 'hidden';
    body.style.paddingRight = '14px';
  }
});
const themeColor = computed(() => convertThemeToColor(props.theme, props.darknessTheme));
const secondaryColor = computed(() => convertThemeToSecondaryColor(props.theme, props.darknessTheme));
const color = computed(() =>
  props.textColor
    ? convertThemeToColor(props.textColor, props.darknessTextColor)
    : convertThemeToTextColor(props.theme, props.darknessTheme),
);
const drawerWidth = computed(() => {
  if (+props.width < 200) return '200px';
  return `${props.width}px`;
});
</script>
<template>
  <article>
    <section
      v-if="modal"
      :class="[
        'drawerBackground',
        {
          drawerBackgroundOpened: visible,
        },
      ]"
      @pointerdown="() => (dismissible ? (visible = false) : '')"
    ></section>
    <section
      :style="`color: ${color}; background-color: ${themeColor}`"
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
        <button class="buttonClose" @click.prevent="visible = false">
          <component :is="iconsSet[closeIcon]" :color="color" />
        </button>
      </header>
      <div v-if="headerDivider" class="divider divider-header"></div>
      <div class="main">
        <slot />
      </div>
      <div v-if="$slots.footer">
        <div v-if="footerDivider" class="divider"></div>
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
  z-index: 200;
  opacity: 1;
}
.drawer {
  width: v-bind(drawerWidth);
  position: fixed;
  z-index: 201;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  transition: transform ease-out 0.2s;
  border-right: 2px solid v-bind(secondaryColor);
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
  min-height: 37px;
  height: 37px;
  overflow: auto;
}
.main {
  flex: 1 1 auto;
  overflow: auto;
  margin: 10px;
  padding-right: 10px;
}
.drawerFooter {
  padding: 10px 10px 0 10px;
  overflow: auto;
}
.divider {
  height: 2px;
  background-color: v-bind(secondaryColor);
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
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: v-bind(secondaryColor);
}
</style>
