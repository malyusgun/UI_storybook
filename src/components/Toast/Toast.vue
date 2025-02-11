<script setup lang="ts">
import type { IToastProps } from '@interfaces/componentsProps';
import { computed, onBeforeUnmount, onMounted, ref, type Ref, watch } from 'vue';
import { convertThemeToColor, getValueFromSize } from '@helpers/common';
import type { TToastType } from '@interfaces/componentsProp';
import { iconsSet } from '@/common/constants/icons';
import CrossIcon from '@icons/Mono/CrossIcon.vue';
import type { TThemeColor } from '@interfaces/common';

const props = withDefaults(defineProps<IToastProps>(), {
  type: 'success',
  size: 'normal',
  width: '300px',
  position: 'topRight',
  duration: 5,
});

const typeToTheme: Record<TToastType, TThemeColor> = {
  success: 'green',
  info: 'blue',
  warn: 'yellow',
  error: 'red',
};

const typeToHeader: Record<TToastType, string> = {
  success: 'Success Message',
  info: 'Info Message',
  warn: 'Warn Message',
  error: 'Error Message',
};

const typeToIcon: Record<TToastType, string> = {
  success: 'CheckMark',
  info: 'Info',
  warn: 'Warning',
  error: 'CrossRound',
};

const active = defineModel() as Ref<boolean>;

let toastsContainer = document.querySelector(`.toasts-container.${props.position}`);
if (!toastsContainer) {
  toastsContainer = document.createElement('div');
  toastsContainer.classList.add('toasts-container');
  toastsContainer.classList.add(`${props.position}`);
  document.body.appendChild(toastsContainer);
}

const toast = ref();
watch(toast, () => {
  if (toast.value) {
    toastsContainer?.appendChild(toast.value);
  }
});
const activeToastsCount = ref(0);
let observer = null;

const updateCount = () => {
  activeToastsCount.value = document.querySelectorAll(`.toast-container.${props.position}.active`).length;
};
const initObserver = () => {
  const config = { attributeOldValue: true, attributes: true, characterData: true, childList: true, subtree: true };
  observer = new MutationObserver(() => {
    console.log('update type: ', props.type);
    updateCount();
  });
  observer.observe(toastsContainer, config);
};

onMounted(() => {
  updateCount();
  initObserver();
});
onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect();
  }
});

const themeColor = computed<TThemeColor>(() => props.theme ?? typeToTheme[props.type]);
const header = computed<string>(() => props.header ?? typeToHeader[props.type]);
const icon = computed(() => props.icon ?? typeToIcon[props.type]);

const color = computed(() =>
  convertThemeToColor(
    themeColor.value === 'white' ? 'black' : themeColor.value === 'black' ? 'white' : themeColor.value,
    '400',
  ),
);
const whiteOrBlack = computed(() => (themeColor.value === 'white' ? 'black' : 'white'));
const backgroundColor = computed(() =>
  convertThemeToColor(themeColor.value, themeColor.value === 'white' || themeColor.value === 'black' ? '500' : '800'),
);
const borderColor = computed(() => convertThemeToColor(themeColor.value, '500'));
const fontSize = computed(() => getValueFromSize(props.size, ['12px', '16px', '20px', '24px']));
const padding = computed(
  () => getValueFromSize(props.size, ['7px 10px', '10px 15px', '14px 20px', '20px 30px']) as string,
);
const gap = computed(() =>
  props.size === 'normal' ? '10px' : props.size === 'large' || props.size === 'huge' ? '15px' : '5px',
);
const iconSize = computed(() => fontSize.value.slice(0, -2));
const textMargin = computed(() => {
  return +iconSize.value + +gap.value.slice(0, -2) + 'px';
});
const positionParts = computed(() => {
  const result = [];
  if (props.position.length < 7) return [props.position];

  const position = props.position.toLowerCase();
  if (position.includes('top')) result.push('top');
  if (position.includes('bottom')) result.push('bottom');
  if (position.includes('left')) result.push('left');
  if (position.includes('right')) result.push('right');

  return result;
});
const styles = computed(() => {
  if (props.static) return '';
  if (positionParts.value.length === 1) {
    const position = positionParts.value[0];
    if (position === 'left' || position === 'right')
      return `${position}: -100%; top: 50%; transform: translateY(-50%);`;
    return `${position}: -100%; left: 50%; transform: translateX(-50%);`;
  }
  return `${positionParts.value[0]}: -100%; ${positionParts.value[1]}: 20px`;
});

const calcActiveStyles = () => {
  const activeToasts = document.querySelectorAll(`.toast-container.${props.position}.active`);
  let activeToastsHeight = 0;
  for (const toast of activeToasts) {
    activeToastsHeight += toast.offsetHeight;
  }

  const offset = activeToastsHeight + 20 * activeToasts.length + 20 + 'px';
  console.log('activeToasts: ', `${positionParts.value[0]}: ${offset}`);

  if (positionParts.value.length === 1) return `${positionParts.value[0]}: ${offset}`;
  return `${positionParts.value[0]}: ${offset}; ${positionParts.value[1]}: 20px`;
};
const closeToast = () => (active.value = false);

let timeout: number;
const key = Math.random();

if (props.duration) {
  watch(active, () => {
    if (active.value) {
      timeout = setTimeout(() => (active.value = false), (props.duration as number) * 1000);
      toastsContainer?.setAttribute('key', String(key));
    } else {
      clearTimeout(timeout);
      toastsContainer?.removeAttribute('key');
    }
  });
}
watch(activeToastsCount, () => {
  console.log(activeToastsCount.value);
  calcActiveStyles();
});
</script>

<template>
  <section
    ref="toast"
    :class="[
      `toast-container ${position}`,
      {
        active,
      },
    ]"
    :style="`position: ${static ? 'relative' : 'fixed'};
    ${styles};
    ${active ? calcActiveStyles() : null}`"
  >
    <h3 class="toast-header" :style="`font-size: calc(${fontSize} + 4px)`">
      <component :is="iconsSet[icon]" :color="color" :size="iconSize" />
      <span class="toast-header-text">{{ header }}</span>
    </h3>
    <p class="toast-text">{{ text ?? `This is a toast about ${type}` }}</p>
    <CrossIcon
      @click="closeToast"
      class="toast-close_button"
      :style="`top: ${padding.split(' ')[0]}; right: ${padding.split(' ')[1]}`"
      :color="color"
      :size="iconSize"
    />
  </section>
</template>

<style scoped>
.toast-container {
  z-index: 9999;
  padding: v-bind(padding);
  border: 1px solid v-bind(borderColor);
  border-radius: 7px;
  width: v-bind(width);
  transition: all 0.4s ease-in-out;
  ::before {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    background-color: v-bind(backgroundColor);
    width: 100%;
    height: 100%;
    opacity: 0.55;
    border-radius: 6px;
  }
}
.toast-header {
  display: flex;
  gap: v-bind(gap);
  color: v-bind(color);
  margin-bottom: 5px;
}
.toast-header-text {
  font-weight: 500;
}
.toast-text {
  margin-left: v-bind(textMargin);
  color: v-bind(whiteOrBlack);
  font-size: v-bind(fontSize);
}
.toast-close_button {
  background-color: transparent;
  position: absolute;
  cursor: pointer;
  display: block;
}
</style>
