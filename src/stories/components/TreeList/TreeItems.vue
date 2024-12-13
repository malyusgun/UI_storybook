<script setup lang="ts">
import { iconsSet } from '@/common/constants/icons';
import TriangleIcon from '@stories/icons/Mono/TriangleIcon.vue';
import type { ITreeItem } from '@interfaces/components';
import type { TThemeColor } from '@interfaces/common';
import { convert500ThemeToColor } from '@helpers/colors';

defineProps<{
  state: {
    isOpen: boolean;
    label: string;
  }[];
  items: ITreeItem[];
  textColor: TThemeColor;
}>();
const emit = defineEmits(['toggleIsOpen', 'onClick']);
</script>

<template>
  <ul>
    <li
      v-for="item of items"
      :key="item.label"
      :class="[
        'item',
        {
          pl27: !item.children,
          openContent: state.find(
            (itemState) => itemState.label === item.label && itemState.isOpen,
          ),
        },
      ]"
    >
      <article>
        <section
          :class="[
            'textContainer',
            {
              pointer: item.children,
            },
          ]"
          @click="emit('toggleIsOpen', item)"
        >
          <TriangleIcon
            v-if="item.children"
            :class="[
              'openButton',
              {
                openButtonOpened: state.find(
                  (itemState) => itemState.label === item.label && itemState.isOpen,
                ),
              },
            ]"
            :color="
              item.color && item.isTriangleToColor ? convert500ThemeToColor(item.color) : textColor
            "
            size="17"
          />
          <component
            :is="iconsSet[item.iconBefore]"
            v-if="item.iconBefore"
            :color="convert500ThemeToColor(item.iconColor)"
            style="min-width: 17px"
            size="17"
          />
          <a
            :href="item.link"
            :target="item.linkBlank ? '_blank' : '_self'"
            :class="[
              'label',
              {
                bold: item.textStyle === 'bold',
                italic: item.textStyle === 'italic',
              },
            ]"
            :style="`color: ${item.color ? convert500ThemeToColor(item.color) : textColor}`"
            @click="emit('onClick', item.link)"
            >{{ item.label }}</a
          >
          <component
            :is="iconsSet[item.iconAfter]"
            v-if="item.iconAfter"
            :color="convert500ThemeToColor(item.iconColor)"
            style="min-width: 17px"
            size="17"
          />
        </section>
        <section class="children">
          <TreeItems
            :items="item.children"
            :state="state"
            :textColor="textColor"
            @toggleIsOpen="emit('toggleIsOpen', $event)"
          />
        </section>
      </article>
    </li>
  </ul>
</template>

<style scoped>
.item {
  width: 100%;
  transition: all 0.4s ease;
  background-color: v-bind(themeColor);
}
.label {
  display: inline-block;
  position: relative;
  padding: 4px 5px;
  background-color: v-bind(themeColor);
  word-break: break-word;
}
.openButton {
  margin-right: 10px;
  min-width: 17px;
  transition: transform 0.3s ease;
}
.openButtonOpened {
  transform: rotate(180deg);
}
.children {
  width: 100%;
  padding-left: 15px;
  display: grid;
  grid-template-rows: 0fr;
  transition:
    all 0.3s ease-in,
    grid-template-rows 0.3s ease-out;
}
.children > ul {
  overflow: hidden;
}
.openContent > article > .children {
  grid-template-rows: 1fr;
  opacity: 1;
}
.textContainer {
  position: relative;
  display: flex;
}
.pointer {
  cursor: pointer;
}
.pl27 {
  padding-left: 27px;
}
.bold {
  font-weight: bold;
}
.italic {
  font-style: italic;
}
</style>
