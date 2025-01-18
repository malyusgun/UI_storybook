<script setup lang="ts">
import type { ITableProps } from '@interfaces/componentsProps';
import { computed, ref, watch } from 'vue';
import { convertThemeToColor, convertThemeToSecondaryColor, convertThemeToTextColor } from '@helpers/common';
import type { ITableItem } from '@interfaces/componentsProp';
import { calcAdditionalHeight, calcGap, calcRows } from '@stories/components/Table/helpers';
import TableHeader from '@stories/components/Table/TableHeader.vue';

const props = withDefaults(defineProps<ITableProps>(), {
  size: 'normal',
  theme: 'white',
  darknessTheme: '500',
  fontSize: '16px',
});
const data = defineModel<ITableItem[][]>({
  required: false,
});

const columns = ref(props.columns);
const sortStateActive = ref<[number, string] | []>([]);
const columnToFilter = ref<number>(0);
const isFilterPopup = ref<boolean>(false);
const filterValue = ref<string>('');
const isRegisterSensitive = ref<boolean>(false);

watch(props.columns, () => (columns.value = props.columns));

const initGap = computed(() => calcGap(props.gap ?? '5px', props.fontSize));
const additionalHeightFromSize = computed(() => calcAdditionalHeight(props.size, props.fontSize));
const themeColor = computed(() => convertThemeToColor(props.theme, props.darknessTheme));
const color = computed(() =>
  props.textColor
    ? convertThemeToColor(props.textColor, props.darknessTextColor)
    : convertThemeToTextColor(props.theme, props.darknessTheme),
);
const secondaryColor = computed<string>(() => convertThemeToSecondaryColor(props.theme, props.darknessTheme));
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
  calcRows(
    data.value!,
    sortStateActive.value,
    props.multipleSort,
    columnToFilter.value,
    props.columns[columnToFilter.value ?? 0].type ?? 'text',
    filterValue.value,
    isRegisterSensitive.value,
  ),
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
    filterValue.value = '';
    columnToFilter.value = column;
  }
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
        <TableHeader
          v-model:filterValue="filterValue"
          v-model:isFilterPopup="isFilterPopup"
          v-model:isRegisterSensitive="isRegisterSensitive"
          :columns="columns"
          :sortState="sortState"
          :columnToFilter="columnToFilter"
          :initGap="initGap"
          :additionalHeightFromSize="additionalHeightFromSize"
          :theme="theme"
          :themeColor="themeColor"
          :secondaryColor="secondaryColor"
          :color="color"
          :showAllLines="!!showAllLines"
          :center="!!center"
          :fontSize="fontSize"
          @changeColumnSortMode="changeColumnSortMode"
          @setFilter="setFilter"
          @cancelFilter="cancelFilter"
        />
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
            :style="`padding: calc(${initGap} / 2 + ${additionalHeightFromSize}) ${initGap}; text-align: ${center ? 'center' : 'start'}`"
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
</style>
