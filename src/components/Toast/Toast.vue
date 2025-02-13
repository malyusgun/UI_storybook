<script setup lang="ts">
import type { IToastProps } from '@interfaces/componentsProps';
import { computed, ref, type Ref, watch } from 'vue';
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

let toastsContainer: HTMLElement = document.querySelector(`.toasts-container.${props.position}`) as HTMLElement;

const toast = ref<HTMLElement>() as Ref<HTMLElement>;
const isToastInContainer = ref<boolean>(false);

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
  () => active.value && (getValueFromSize(props.size, ['7px 10px', '10px 15px', '14px 20px', '20px 30px']) as string),
);
const gap = computed(() =>
  props.size === 'normal' ? '10px' : props.size === 'large' || props.size === 'huge' ? '15px' : '5px',
);
const iconSize = computed(() => fontSize.value.slice(0, -2));
const textMargin = computed(() => {
  return +iconSize.value + +gap.value.slice(0, -2) + 'px';
});
const windowHeight = computed(() => '-' + document.body.clientHeight + 'px');
const positionParts = computed<string[]>(() => {
  const result = [];
  if (props.position.length < 7) return [props.position];

  const position = props.position.toLowerCase();
  if (position.includes('top')) result.push('top');
  if (position.includes('bottom')) result.push('bottom');
  if (position.includes('left')) result.push('left');
  if (position.includes('right')) result.push('right');

  return result;
});
const topOrBottom = computed(() => props.position[0]);

const initContainer = () => {
  if (!toastsContainer) {
    toastsContainer = document.createElement('div');
    toastsContainer.classList.add('toasts-container');
    toastsContainer.classList.add(`${props.position}`);
    toastsContainer.style.position = 'fixed';
    toastsContainer.style.zIndex = '9999';
    toastsContainer.style.display = 'flex';
    toastsContainer.style.gap = '20px';
    toastsContainer.style.flexDirection = positionParts.value.find((i) => i === 'bottom') ? 'column-reverse' : 'column';
    toastsContainer.style.transition = 'all 0.5s ease-in-out';
    const calcStyles = () => {
      if (positionParts.value.length === 1) {
        const position = positionParts.value[0];
        // if (position === 'left' || position === 'right')
        //   return `${position}: -100%; top: 50%; transform: translateY(-50%)`;
        return `${position}: -100%; left: 50%; transform: translateX(-50%)`;
      }
      return `${positionParts.value[0]}: -100%; ${positionParts.value[1]}: 20px`;
    };
    for (const item of calcStyles().split('; ')) {
      const splatItem = item.split(':') as ('top' | 'bottom' | '')[];
      if (splatItem[0] === '') break;
      toastsContainer.style[splatItem[0]] = splatItem[1];
    }
    document.body.appendChild(toastsContainer);
  }
};
watch(
  () => props.position,
  () => {
    initContainer();
  },
  {
    immediate: true,
  },
);
const closeToast = () => (active.value = false);

let timeout: number;

watch(active, () => {
  if (active.value) {
    toast.value.classList.add('active');
    isToastInContainer.value = true;

    toastsContainer?.appendChild(toast.value);
    toastsContainer.style[positionParts.value[0] as 'top' | 'bottom'] = '20px';
    timeout = setTimeout(() => (active.value = false), (props.duration as number) * 1000);
  } else if (props.duration) {
    toast.value.classList.remove('active');
    setTimeout(() => {
      if (toastsContainer.children.length < 2) {
        toastsContainer.style[positionParts.value[0] as 'top' | 'bottom'] = '-100%';
      }
      toastsContainer?.removeChild(toast.value);
      isToastInContainer.value = false;
    }, 100);
    clearTimeout(timeout);
  }
});
</script>

<template>
  <section
    ref="toast"
    :class="[
      `toast-container ${position}`,
      {
        relative: isToastInContainer,
        absolute: !isToastInContainer,
        top: position.includes('top'),
        bottom: position.includes('bottom'),
        left: position.includes('left'),
        right: position.includes('right'),
        active,
        topOrBottom,
        oneAxis: positionParts.length === 1,
      },
    ]"
  >
    <h3 class="toast-header" :style="`font-size: calc(${fontSize} + 4px)`">
      <component :is="iconsSet[icon]" :color="color" :size="iconSize" />
      <span class="toast-header-text">{{ header }}</span>
    </h3>
    <p class="toast-text">{{ text ?? `This is a toast about ${type}` }}</p>
    <CrossIcon
      @click="closeToast"
      class="toast-close_button"
      :style="`top: ${padding && padding.split(' ')[0]}; right: ${padding && padding.split(' ')[1]}`"
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
  transition:
    all 0.2s ease-in-out,
    max-height 0.2s ease-in-out,
    padding 0.2s ease-in-out,
    margin 0.2s ease-in-out;
  width: v-bind(width);
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
.top {
  top: v-bind(windowHeight);
  transform: translateY(-500px);
  max-height: 0;
}
.bottom {
  bottom: v-bind(windowHeight);
  transform: translateY(500px);
  max-height: 0;
}
.active.top {
  top: 0;
  transform: translateY(0);
  max-height: 1000px;
}
.active.bottom {
  bottom: 0;
  transform: translateY(0);
  max-height: 1000px;
}
.oneAxis {
  left: 50%;
  transform: translateX(-50%);
}
.oneAxis.top {
  transform: translate(-50%, -500px) !important;
  max-height: 0;
}
.oneAxis.bottom {
  transform: translate(-50%, 500px) !important;
  max-height: 0;
}
.oneAxis.active.top {
  transform: translate(-50%, 0) !important;
  max-height: 1000px;
}
.oneAxis.active.bottom {
  transform: translate(-50%, 0) !important;
  max-height: 1000px;
}
.relative {
  position: relative;
}
.absolute {
  position: absolute;
}
</style>
