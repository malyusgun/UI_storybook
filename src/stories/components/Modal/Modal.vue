<script setup lang="ts">
import { computed } from 'vue';
import { convert300ThemeToColor, convert500ThemeToColor } from '@helpers/colors';
import type { IModalProps } from '@interfaces/componentsProps';
import { iconsSet } from '@/common/constants/icons';

const props = withDefaults(defineProps<IModalProps>(), {
  visible: false,
  dismissible: false,
  theme: 'white',
  width: '30%',
  height: '30%',
  headerDivider: false,
  closeIcon: 'CrossIcon',
});
const emit = defineEmits(['onClose']);
const visible = defineModel('visible', {
  set(value) {
    if (!value) {
      emit('onClose');
    }
    return value;
  },
});
const themeColor = computed(() => convert500ThemeToColor(props.theme));
const scrollColor = computed(() => convert300ThemeToColor(props.theme));
const textColor = computed(() => {
  if (!props.theme) return '#000000';
  if (props.theme === 'white') return '#000000';
  return '#ffffff';
});
const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && visible.value) visible.value = false;
};
document.addEventListener('keydown', onKeydown);
</script>

<template>
  <article>
    <section
      :class="[
        'modalBackground',
        {
          openedModalBackground: visible,
        },
      ]"
      @click.prevent="() => (dismissible ? (visible = false) : false)"
    ></section>
    <section
      :style="`color: ${textColor}; background-color: ${themeColor}; width: ${width}; height: ${height}`"
      :class="[
        'modal',
        {
          openedModal: visible,
          modalToCenter: !position,
          top: position === 'top',
          toTop: position === 'topLeft' || position === 'topRight',
          bottom: position === 'bottom',
          toBottom: position === 'bottomLeft' || position === 'bottomRight',
          left: position === 'left',
          toLeft: position === 'topLeft' || position === 'bottomLeft',
          right: position === 'right',
          toRight: position === 'topRight' || position === 'bottomRight',
        },
      ]"
    >
      <header class="modalHeader">
        <div class="headerContent">
          <slot name="header" />
        </div>
        <button class="buttonClose" @click.prevent="visible = false">
          <component :is="iconsSet[closeIcon]" :color="textColor" />
        </button>
        <div v-if="headerDivider" class="divider"></div>
      </header>
      <div class="main">
        <slot />
      </div>
    </section>
  </article>
</template>

<style scoped>
.modalBackground {
  position: fixed;
  top: -100%;
  left: -100%;
  width: 200vw;
  height: 200vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -50;
  opacity: 0;
}
.openedModalBackground {
  z-index: 60;
  opacity: 1;
}
.modal {
  position: absolute;
  z-index: -50;
  min-width: 250px;
  min-height: 100px;
  padding: 20px;
  border: 2px solid gray;
  border-radius: 15px;
  opacity: 0;
  transform: scale(0.5);
  transition: all ease-in-out 0.2s;
  user-select: none;
}
.modalToCenter {
  top: 50%;
  left: 50%;
  translate: -50% -50%;
}
.openedModal {
  user-select: auto;
  z-index: 9999;
  opacity: 1;
  transform: scale(1);
}
.modalHeader {
  font-size: 1.5rem;
  min-height: 1.5rem;
  text-align: center;
  padding-right: 40px;
  margin-bottom: 20px;
}
.headerContent {
  font-weight: bold;
  overflow: auto;
  white-space: nowrap;
}
.main {
  padding-right: 5px;
  height: calc(100% - 45px);
  overflow: auto;
}
.buttonClose {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 30px;
  cursor: pointer;
}
.divider {
  height: 2px;
  background-color: v-bind(scrollColor);
  position: absolute;
  left: 20px;
  top: 60px;
  width: calc(100% - 40px);
}
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: v-bind(scrollColor);
}
.toTop {
  top: 10px !important;
}
.toBottom {
  bottom: 10px !important;
}
.toLeft {
  left: 10px !important;
}
.toRight {
  right: 10px !important;
}
.top {
  top: 10px !important;
  left: 50%;
  translate: -50% 0;
}
.bottom {
  bottom: 10px !important;
  left: 50%;
  translate: -50% 0;
}
.left {
  top: 50%;
  translate: 0 -50%;
  left: 10px !important;
}
.right {
  top: 50%;
  translate: 0 -50%;
  right: 10px !important;
}
</style>
