<script setup lang="ts">
import FilterIcon from '@icons/Mono/FilterIcon.vue';
import SortDownIcon from '@icons/Mono/SortDownIcon.vue';
import SortUpIcon from '@icons/Mono/SortUpIcon.vue';
import SortVerticalIcon from '@icons/Mono/SortVerticalIcon.vue';
import { calcColumnPadding } from '@components/Table/helpers';
import Popup from '@components/Popup/Popup.vue';
import Button from '@components/Button/Button.vue';
import CheckMarkIcon from '@icons/Mono/CheckMarkIcon.vue';
import CrossIcon from '@icons/Mono/CrossIcon.vue';
import type { TThemeColor } from '@interfaces/common';
import type { ITableColumn, TTableColumnType } from '@interfaces/componentsProp';
import { computed } from 'vue';

interface Props {
  table: Element;
  columns: ITableColumn[];
  sortState: string[];
  indexColumnToFilter: number;
  types: (TTableColumnType | undefined)[];
  initGap: string;
  additionalHeightFromSize: string;
  theme: TThemeColor;
  themeColor: string;
  secondaryColor: string;
  color: string;
  showAllLines: boolean;
  center: boolean;
  fontSize: string;
  isEditMode: boolean;
}
const props = defineProps<Props>();
const emit = defineEmits(['changeColumnSortMode', 'setFilter', 'cancelFilter']);
const filterValue = defineModel<string>('filterValue');
const isFilterPopup = defineModel<boolean, string, boolean, boolean>('isFilterPopup');
const isRegisterSensitive = defineModel<boolean, string, boolean, boolean>('isRegisterSensitive');

const iconSize = computed(() => {
  const twoLetters = props.fontSize.slice(0, -2);
  const threeLetters = props.fontSize.slice(0, -3);
  return !twoLetters || isNaN(+twoLetters) ? (!threeLetters || isNaN(+threeLetters) ? '16' : threeLetters) : twoLetters;
});

const calcLeft = (selector: string) => {
  const el = document.querySelector(selector);
  if (!el) return 0;
  return el.getBoundingClientRect().left - props.table.getBoundingClientRect().left + +iconSize.value;
};
const isColumnTypeText = computed(() => props.columns[props.indexColumnToFilter].type === 'text');
</script>

<template>
  <tr>
    <th
      v-for="(column, index) of columns"
      :key="column.name"
      :style="`position: relative; padding: calc(${initGap} / 2 + ${additionalHeightFromSize}) ${initGap}`"
      :class="[
        `column`,
        {
          leftBorder: showAllLines,
        },
      ]"
    >
      <div
        :style="`justify-content: ${center ? 'center' : 'start'}; gap: ${center ? '0' : initGap}; padding: ${calcColumnPadding(column, center, initGap)}`"
        class="columnFlex"
      >
        <div class="columnHeader-container">
          <h3>
            {{ column.name }}
          </h3>
          <div v-show="column.sortable && isEditMode" :style="`width: ${fontSize}; height: ${fontSize}`"></div>
          <button
            v-show="column.sortable && !isEditMode"
            @click.prevent="emit('changeColumnSortMode', index)"
            :style="`min-width: ${fontSize}; min-height: ${fontSize}; max-height: ${fontSize}`"
          >
            <SortVerticalIcon v-show="sortState[index] === 'none'" :color="color" :size="iconSize" />
            <SortDownIcon v-show="sortState[index] === 'down'" :color="color" :size="iconSize" />
            <SortUpIcon v-show="sortState[index] === 'up'" :color="color" :size="iconSize" />
          </button>
          <button
            v-if="column.filterable && ~['text', 'number'].indexOf(column.type as string)"
            @pointerdown="emit('setFilter', index)"
            :id="`filter${index}`"
            :style="`position: relative; width: ${fontSize}; max-height: ${fontSize}`"
          >
            <FilterIcon :color="color" :size="iconSize" />
          </button>
        </div>
        <div v-if="!center"></div>
      </div>
    </th>
    <Popup
      v-model="isFilterPopup"
      :parentSelector="`#filter${indexColumnToFilter}`"
      buttonMenu
      :theme="theme"
      :top="+iconSize + 10"
      :left="calcLeft(`#filter${indexColumnToFilter}`)"
      maxHeight="200px"
    >
      <article style="padding: 2px">
        <input
          v-model="filterValue"
          type="text"
          class="filterInput"
          :style="`background-color: ${themeColor}; color: ${color}`"
        />
        <section class="filterButtons">
          <Button iconOnly size="small" theme="green" @click.prevent="isFilterPopup = false">
            <CheckMarkIcon color="white" size="20" />
          </Button>
          <Button
            v-show="isColumnTypeText"
            iconOnly
            size="small"
            theme="sky"
            @click.prevent="isRegisterSensitive = !isRegisterSensitive"
          >
            <div style="width: 50px; font-size: 20px">{{ isRegisterSensitive ? 'A\u{2260}a' : 'A = a' }}</div>
          </Button>
          <Button iconOnly size="small" theme="red" @click.prevent="emit('cancelFilter')">
            <CrossIcon color="white" size="20" />
          </Button>
        </section>
      </article>
    </Popup>
  </tr>
</template>

<style scoped>
.columnFlex {
  display: flex;
  font-weight: bold;
}
.columnHeader-container {
  display: flex;
  align-items: center;
  padding: 5px 0;
  gap: 10px;
  > h3 {
    user-select: none;
    white-space: nowrap;
  }
}
.filterInput {
  width: 150px;
  padding: 5px;
  margin-bottom: 5px;
  border: 2px solid #64748b;
  border-radius: 5px;
}
.filterButtons {
  display: flex;
  justify-content: space-between;
}
.leftBorder {
  border-left: 1px solid v-bind(secondaryColor);
}
</style>
