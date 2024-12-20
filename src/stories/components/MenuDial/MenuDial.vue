<script setup lang="ts">
import { computed } from 'vue';
import type { IMDProps } from '@interfaces/componentsProps';
import PlusIcon from '@stories/icons/Mono/PlusIcon.vue';
import { convertThemeToSecondaryColor, convertThemeToColor, convertThemeToTextColor } from '@helpers/common';
import type { IMDItemProps } from '@interfaces/componentsProp';

const props = withDefaults(defineProps<IMDProps>(), {
  theme: 'white',
  darknessTheme: '500',
  size: 'normal',
  direction: 'right',
});
const active = defineModel('active');

const themeColor = computed(() => convertThemeToColor(props.theme, props.darknessTheme));
const color = computed(() =>
  props.iconColor
    ? convertThemeToColor(props.iconColor, props.darknessIconColor)
    : convertThemeToTextColor(props.theme, props.darknessTheme),
);
const borderColor = computed(() => convertThemeToSecondaryColor(props.theme, props.darknessTheme));
const elementsSize = computed(() => {
  switch (props.size) {
    case 'small':
      return 30;
    case 'large':
      return 55;
    case 'huge':
      return 70;
  }
  return 40;
});
const menuListStyles = computed(() => {
  switch (props.direction) {
    case 'left':
      return `flex-direction: row-reverse; transform: translateY(-${elementsSize.value / 2}px) ${active.value ? `translateX(calc(-100% - 10px))` : 'translateX(calc(-100% + 60px))'}`;
    case 'up':
      return `flex-direction: column-reverse; transform: translateY(-${active.value ? (0.5 + props.items.length) * elementsSize.value + 15 : 1.5 * elementsSize.value}px) translateX(calc(-50% + ${elementsSize.value / 2}px))`;
    case 'down':
      return `flex-direction: column; transform: translateY(${active.value ? elementsSize.value / 1.75 : -20}px) translateX(calc(-50% + ${elementsSize.value / 2}px))`;
  }
  return `transform: translateY(-${elementsSize.value / 2}px) translateX(${active.value ? elementsSize.value + 10 : -20}px)`;
});
// const circleStylesItems = computed(() => {
//   if (props.direction !== 'circle') {
//     return '';
//   }
//   const styles = [];
//   let deg = 0;
//   const itemsCount = props.items.length;
//   const degToItem = Math.round(360 / itemsCount);
//   for (let i = 0; i < itemsCount; i++) {
//     styles.push(`transform: rotate(${deg}deg) rotate(${-deg}deg)`);
//     deg += degToItem;
//   }
//   console.log(styles);
//   return styles;
// });
const openLink = (url: string, isBlank: boolean | undefined) => window.open(url, isBlank ? '_blank' : '_self');
const calcItemColor = (item: IMDItemProps) => {
  return item.color
    ? convertThemeToColor(item.color, item.darknessColor)
    : item.theme === 'white' || +((item.darknessTheme ?? '500') <= 600 && item.theme !== 'black')
      ? 'black'
      : 'white';
};
</script>

<template>
  <section class="menuContainer">
    <button
      :style="`border: 2px solid ${borderColor}; background-color: ${themeColor ?? 'white'}; width: ${elementsSize}px; height: ${elementsSize}px; transform: ${active ? 'rotate(135deg)' : ''};`"
      class="menuButton"
      @click.prevent="active = !active"
    >
      <slot name="buttonIcon" />
      <PlusIcon v-if="!$slots.buttonIcon" :size="elementsSize - 10" :color="color" />
    </button>
    <ul
      :class="[
        'menuList',
        {
          menuListColumn: direction === 'up' || direction === 'down',
          menuListOpened: active,
        },
      ]"
      :style="menuListStyles"
    >
      <li
        v-for="(item, index) of items"
        :key="item.label"
        :style="`height: ${elementsSize}px; background-color: ${convertThemeToColor(item.theme ?? 'white', item.darknessTheme ?? '500')};
        color: ${calcItemColor(item)}; border-color: ${borderColor};`"
        class="menuElement"
        @click="
          () => {
            if (item.link) openLink(item.link, item.linkBlank);
            if (item.onClick) item.onClick();
          }
        "
      >
        <slot :name="`${index + 1}IconBefore`" />
        <p
          style="padding: 5px"
          :class="[
            '',
            {
              bold: item.textStyle === 'bold',
              italic: item.textStyle === 'italic',
            },
          ]"
        >
          {{ item.label }}
        </p>
        <slot :name="`${index + 1}IconAfter`" />
      </li>
    </ul>
  </section>
</template>

<style scoped>
.menuContainer {
  position: relative;
}
.menuButton {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  transition: 0.2s ease-in-out;
}
.menuButton:hover {
  filter: brightness(90%);
}
.menuButton:active {
  filter: brightness(75%);
}
.menuList {
  display: flex;
  pointer-events: none;
  gap: 10px;
  position: absolute;
  top: 50%;
  left: 0;
  opacity: 0;
  transition: 0.2s ease-in-out;
}
.menuListOpened {
  pointer-events: auto;
  opacity: 1;
}
.menuElement {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border: 1px solid v-bind(borderColor);
  border-radius: 5px;
  user-select: none;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}
.menuElement:hover {
  filter: brightness(90%);
}
.menuElement:active {
  filter: brightness(75%);
}
</style>
