<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { ITreeItem } from '@interfaces/components';
import type { TThemeColor } from '@interfaces/common';
import { convert500ThemeToColor } from '@helpers/colors';
import TreeItems from '@stories/components/TreeList/TreeItems.vue';

const props = withDefaults(
  defineProps<{
    items?: ITreeItem[];
    maxWidth?: number;
    expand?: boolean;
    theme?: TThemeColor;
  }>(),
  {
    theme: 'white',
    maxWidth: 300,
  },
);
const emit = defineEmits(['onClick']);
const items = computed(() => props.items);
const themeColor = computed(() => convert500ThemeToColor(props.theme));
const textColor = computed(() => {
  if (!props.theme) return '#000000';
  if (props.theme === 'white') return '#000000';
  return '#ffffff';
});

const state = ref([]);
const setItemChildrenToState = (items: ITreeItem[]) => {
  for (const item of items) {
    state.value.push({
      isOpen: props?.expand,
      label: item.label,
    });
    if (item.children) {
      setItemChildrenToState(item.children);
    }
  }
};
const setInitialState = () => {
  if (!props?.items) return;
  setItemChildrenToState(props.items);
};
watch(
  [items],
  () => {
    if (items.value) setInitialState();
  },
  {
    immediate: true,
  },
);
const toggleIsOpen = (item) =>
  state.value.map((itemState) => {
    if (itemState.label === item.label) itemState.isOpen = !itemState.isOpen;
  });
</script>

<template>
  <div
    :style="`background-color: ${themeColor ?? 'white'}; max-width: ${maxWidth}px; padding: 15px 25px 15px 15px`"
    class="tree"
  >
    <TreeItems
      :items="items"
      :state="state"
      :textColor="textColor"
      @toggleIsOpen="toggleIsOpen"
      @onClick="emit('onClick')"
    />
  </div>
</template>

<style scoped></style>
