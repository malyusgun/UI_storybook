<script setup lang="ts">
import { computed, watch } from 'vue';
import type { IMDProps } from '@interfaces/componentsProps';
import { convert500ThemeToColor } from '@helpers/colors';
import PlusIcon from '@stories/icons/Mono/PlusIcon.vue';

const props = withDefaults(defineProps<IMDProps>(), {
  theme: 'white',
  size: 'medium',
  direction: 'right',
});
const active = defineModel('active');

const themeColor = computed(() => convert500ThemeToColor(props.theme));
const textColor = computed(() => {
  if (!props.theme) return '#000000';
  if (props.theme === 'white') return '#000000';
  return '#ffffff';
});
const elementsSize = computed(() => {
  switch (props.size) {
    case 'small':
      return 30;
    case 'medium':
      return 40;
    case 'large':
      return 55;
    case 'huge':
      return 70;
  }
  return 40;
});
const menuListStyles = computed(() => {
  switch (props.direction) {
    case 'right':
      return `transform: translateY(-${elementsSize.value / 2}px) translateX(${active.value ? elementsSize.value + 10 : 0}px)`;
    case 'left':
      return `flex-direction: row-reverse; transform: translateY(-${elementsSize.value / 2}px) ${active.value ? `translateX(calc(-100% - 10px))` : ''}`;
    case 'top':
      return `transform: translateY(-${active.value ? (0.5 + props.items.length) * elementsSize.value + 10 : elementsSize.value / 2}px)`;
    case 'bottom':
      return `transform: translateY(${active.value ? 20 : 0}px)`;
  }
  return `transform: translateY(-${elementsSize.value / 2}px) translateX(${active.value ? elementsSize.value + 10 : 0}px)`;
});
const onClick = () => {
  active.value = false;
};
watch(active, () => {
  if (active.value) {
    setTimeout(() => {
      document.addEventListener('click', onClick);
    }, 0);
  } else {
    document.removeEventListener('click', onClick);
  }
});
</script>

<template>
  <section class="menuContainer">
    <button
      :style="`border: ${theme === 'white' ? '2px solid black' : ''}; background-color: ${themeColor ?? 'white'}; width: ${elementsSize}px; height: ${elementsSize}px; transform: ${active ? 'rotate(135deg)' : ''};`"
      class="menuButton"
      @click.prevent="active = !active"
    >
      <slot name="buttonIcon" />
      <PlusIcon v-if="!$slots.buttonIcon" :size="elementsSize - 10" :color="textColor" />
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
        :style="`height: ${elementsSize}px; background-color: ${convert500ThemeToColor(item.theme ?? 'white')};
        color: ${!item.theme || item.theme === 'white' ? 'black' : 'white'}; border-color: ${!item.theme || item.theme === 'white' ? 'black' : 'white'}`"
        class="menuElement"
        @click.prevent="() => (item.onClick ? item.onClick() : false)"
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
.menuListColumn {
  flex-direction: column;
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
  border: 1px solid white;
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
