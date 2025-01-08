<script setup lang="ts">
import type { ITableProps } from '@interfaces/componentsProps';
import { computed, ref, watch } from 'vue';
import { convertThemeToColor, convertThemeToSecondaryColor, convertThemeToTextColor } from '@helpers/common';
import type { ITableItem } from '@interfaces/componentsProp';
import FilterIcon from '@stories/icons/Mono/FilterIcon.vue';
import SortDownIcon from '@stories/icons/Mono/SortDownIcon.vue';
import SortUpIcon from '@stories/icons/Mono/SortUpIcon.vue';
import SortVerticalIcon from '@stories/icons/Mono/SortVerticalIcon.vue';
import { calcColumnPadding, calcRows } from '@stories/components/Table/helpers';
import Popup from '@stories/components/Popup/Popup.vue';
import Button from '@stories/components/Button/Button.vue';
import CheckMarkIcon from '@stories/icons/Mono/CheckMarkIcon.vue';
import CrossIcon from '@stories/icons/Mono/CrossIcon.vue';

const props = withDefaults(defineProps<ITableProps>(), {
  theme: 'white',
  darknessTheme: '500',
  fontSize: '16px',
});
const data = defineModel<ITableItem[][]>('data');

const columns = ref(props.columns);
const sortStateActive = ref<[number, string] | []>([]);
const isFilterPopup = ref<boolean>(false);
const columnToFilter = ref<number>(0);
const filterValue = ref<string>('');

watch(props.columns, () => (columns.value = props.columns));

const initGap = computed(
  () =>
    props.gap ??
    (!props.fontSize || isNaN(+props.fontSize.slice(0, -3))
      ? '5px'
      : parseInt(props.fontSize) < 20
        ? '5px'
        : parseInt(props.fontSize) < 36
          ? '10px'
          : '15px'),
);
const iconSize = computed(() => {
  const twoLetters = props.fontSize.slice(0, -2);
  const threeLetters = props.fontSize.slice(0, -3);
  return !twoLetters || isNaN(+twoLetters) ? (!threeLetters || isNaN(+threeLetters) ? '16' : threeLetters) : twoLetters;
});
const themeColor = computed(() => convertThemeToColor(props.theme, props.darknessTheme));
const color = computed(() =>
  props.textColor
    ? convertThemeToColor(props.textColor, props.darknessTextColor)
    : convertThemeToTextColor(props.theme, props.darknessTheme),
);
const secondaryColor = computed(() => convertThemeToSecondaryColor(props.theme, props.darknessTheme));
const darkCellColor = computed(() => convertThemeToSecondaryColor(props.theme, String(+props.darknessTheme + 300)));

// ['', 'up', 'none', '', 'none', ...]
const sortState = computed<string[]>(() => {
  const result = [];
  for (const column of columns.value) {
    result.push(column.sortable ? (column.initSort ?? 'none') : '');
  }
  return result;
});

const rows = computed<ITableItem[][]>(() =>
  calcRows(data.value!, sortStateActive.value, props.multipleSort, columnToFilter.value, filterValue.value),
);

const changeColumnSortMode = (index: number) => {
  const cur = sortState.value[index];
  const newValue = cur === 'none' ? 'down' : cur === 'down' ? 'up' : 'none';
  if (cur === 'up') {
    sortStateActive.value = [];
  } else {
    sortStateActive.value[0] = index;
    sortStateActive.value[1] = newValue;
  }
  if (!props.multipleSort) columns.value.forEach((column) => (column.initSort = 'none'));
  columns.value[index].initSort = newValue;
};
const setFilter = (column: number) => {
  if (columnToFilter.value === column || !isFilterPopup.value) {
    isFilterPopup.value = !isFilterPopup.value;
  }
  if (columnToFilter.value !== column) {
    columnToFilter.value = column;
  }
};
const calcLeft = (selector: string) => {
  const el = document.querySelector(selector);
  const table = document.querySelector('#table')!;
  if (!el) return 0;
  return el.getBoundingClientRect().left - table.getBoundingClientRect().left + +iconSize.value;
};
const cancelFilter = () => {
  filterValue.value = '';
  isFilterPopup.value = false;
};
</script>

<template>
  <div>
    <table
      :class="{
        tableLines: showAllLines,
      }"
      :style="`background-color: ${themeColor}; color: ${color}`"
      id="table"
    >
      <thead>
        <tr>
          <th
            :class="{
              leftBorder: showAllLines,
            }"
            v-for="(column, index) of columns"
            :key="column.name"
            class="columnHeader"
            :style="`padding: calc(${initGap} / 2) ${initGap}`"
          >
            <div
              :style="`justify-content: ${center ? 'center' : 'start'}; gap: ${center ? '0' : initGap}; padding: ${calcColumnPadding(column, props.center, initGap)}`"
              class="columnFlex"
            >
              <div class="columnHeader-container">
                <h3>
                  {{ column.name }}
                </h3>
                <button
                  v-if="column.sortable"
                  @click.prevent="changeColumnSortMode(index)"
                  style="min-width: 20px; min-height: 20px"
                >
                  <SortVerticalIcon v-show="sortState[index] === 'none'" :color="color" :size="iconSize" />
                  <SortDownIcon v-show="sortState[index] === 'down'" :color="color" :size="iconSize" />
                  <SortUpIcon v-show="sortState[index] === 'up'" :color="color" :size="iconSize" />
                </button>
                <button
                  v-if="column.filterable"
                  @pointerdown="setFilter(index)"
                  :id="`filter${column.name}`"
                  style="position: relative"
                >
                  <FilterIcon :color="color" :size="iconSize" />
                </button>
              </div>
              <div v-if="!center"></div>
            </div>
          </th>
          <Popup
            v-model:active="isFilterPopup"
            :parentSelector="`#filter${columnToFilter}`"
            buttonMenu
            :theme="theme"
            :top="+iconSize + 10"
            :left="calcLeft(`#filter${columnToFilter}`)"
          >
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
              <Button iconOnly size="small" theme="red" @click.prevent="cancelFilter">
                <CrossIcon color="white" size="20" />
              </Button>
            </section>
          </Popup>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) of rows" :key="index">
          <td
            :class="{
              leftBorder: showAllLines,
              darkRow: stripedRows && index % 2,
            }"
            v-for="item of row"
            :key="item.value"
            :style="`padding: calc(${initGap} / 2) ${initGap}; text-align: ${center ? 'center' : 'start'}`"
          >
            {{ item.value }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table {
  border-collapse: collapse;
}
table * {
  font-size: v-bind(fontSize);
}
tr {
  position: relative;
}
tr::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: v-bind(secondaryColor);
}
.columnFlex {
  display: flex;
  font-weight: bold;
}
.columnHeader-container {
  display: flex;
  align-items: center;
  gap: 10px;
}
.tableLines {
  border-top: 1px solid v-bind(secondaryColor);
  border-right: 1px solid v-bind(secondaryColor);
}
.leftBorder {
  border-left: 1px solid v-bind(secondaryColor);
}
.darkRow {
  background-color: v-bind(darkCellColor);
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
</style>
