<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { ITreeItem } from '@interfaces/componentsProp';
import TreeItems from '@stories/components/TreeList/TreeItems.vue';
import type { ITLProps } from '@interfaces/componentsProps';
import { convertThemeToColor } from '@helpers/common';

interface IStateItem {
  isOpen: boolean;
  label: string;
}

const props = withDefaults(defineProps<ITLProps>(), {
  theme: 'white',
  maxWidth: 300,
  darknessTheme: 500,
});
const emit = defineEmits(['onClick']);
const items = computed(() => props.items);
const themeColor = computed(() => convertThemeToColor(props.theme, props.darknessTheme));
const textColor = computed(() => {
  if (props.theme === 'white' || (props.darknessTheme <= 600 && props.theme !== 'black'))
    return '#000000';
  return '#ffffff';
});

const state = ref<IStateItem[]>([]);
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
const toggleIsOpen = (item: ITreeItem) => {
  if (item.isLinkClicked) {
    item.isLinkClicked = false;
    return;
  }
  state.value.map((itemState) => {
    if (itemState.label === item.label) itemState.isOpen = !itemState.isOpen;
  });
};
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
      :themeColor="themeColor"
      @toggleIsOpen="toggleIsOpen"
      @onClick="emit('onClick')"
    />
  </div>
</template>

<style scoped></style>
