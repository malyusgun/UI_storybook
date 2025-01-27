<script setup lang="ts">
import type { ITableProps } from '@interfaces/componentsProps';
import { computed, type Ref, ref } from 'vue';
import { convertThemeToColor, convertThemeToSecondaryColor, convertThemeToTextColor } from '@helpers/common';
import { calcAdditionalHeight, calcGap, calcRows } from '@components/Table/helpers';
import TableHeader from '@components/Table/components/TableHeader.vue';
import TableCell from '@components/Table/components/TableCell.vue';

const props = withDefaults(defineProps<ITableProps>(), {
  size: 'normal',
  theme: 'white',
  darknessTheme: '500',
  fontSize: '16px',
  editable: false,
});
const data = defineModel<unknown[][]>();
const emit = defineEmits(['updateData']);

const table = ref();
const columns = ref(props.columns);
const sortStateActive = ref<[number, string] | []>([]);
const indexColumnToFilter = ref<number>(0);
const isFilterPopup = ref<boolean>(false);
const filterValue = ref<string>('');
const isRegisterSensitive = ref<boolean>(false);

if (props.data) {
  data.value = props.data;
}
if (props.columns) {
  columns.value = props.columns;
}

const columnToSortIndex = props.columns.findIndex((column) => column.initSort && column.initSort !== 'none');
if (~columnToSortIndex) sortStateActive.value = [columnToSortIndex, props.columns[columnToSortIndex].initSort!];

const initGap = computed(() => calcGap(props.gap ?? '5px', props.fontSize));
const additionalHeightFromSize = computed(() => calcAdditionalHeight(props.size, props.fontSize));
// ['', 'up', 'none', '', 'none', ...]
const sortState = computed<string[]>(() => {
  const result = [];
  for (const column of columns.value) {
    result.push(column.sortable ? (column.initSort ?? 'none') : '');
  }
  return result;
});
const rows = computed<unknown[][]>(() =>
  calcRows(
    data.value,
    sortStateActive.value,
    props.multipleSort,
    indexColumnToFilter.value,
    props.columns[sortStateActive.value?.[0] ?? -1]?.type ?? 'text',
    filterValue.value,
    isRegisterSensitive.value,
  ),
);
const types = computed(() => props.columns.map((column) => column.type));

const themeColor = computed(() => convertThemeToColor(props.theme, props.darknessTheme));
const color = computed(() =>
  props.textColor
    ? convertThemeToColor(props.textColor, props.darknessTextColor)
    : convertThemeToTextColor(props.theme, props.darknessTheme),
);
const secondaryColor = computed<string>(() => convertThemeToSecondaryColor(props.theme, props.darknessTheme));
const darkCellColor = computed(() => convertThemeToSecondaryColor(props.theme, String(+props.darknessTheme + 300)));
const knobWidth = computed(() => {
  if (!isNaN(+props.fontSize[props.fontSize.length - 3]))
    return +props.fontSize.slice(0, -2) * 2.5 + props.fontSize.slice(-2);
  return +props.fontSize.slice(0, -3) * 2.5 + props.fontSize.slice(-3);
});

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
  if (indexColumnToFilter.value === column || !isFilterPopup.value) {
    isFilterPopup.value = !isFilterPopup.value;
  }
  if (indexColumnToFilter.value !== column) {
    filterValue.value = '';
    indexColumnToFilter.value = column;
  }
};
const cancelFilter = () => {
  filterValue.value = '';
  isFilterPopup.value = false;
};
const updateData = (newValue: Ref<unknown>, rowIndex: number, columnIndex: number) => {
  if (data.value?.[rowIndex]?.[columnIndex] !== undefined) {
    data.value[rowIndex][columnIndex] = newValue.value ?? newValue;
    emit('updateData', data.value);
  }
};
</script>

<template>
  <div>
    <table
      :class="{
        tableLines: showAllLines,
      }"
      :style="`background-color: ${themeColor}; color: ${color}`"
      class="table"
      ref="table"
    >
      <thead>
        <TableHeader
          v-model:filterValue="filterValue"
          v-model:isFilterPopup="isFilterPopup"
          v-model:isRegisterSensitive="isRegisterSensitive"
          :table="table"
          :columns="columns"
          :sortState="sortState"
          :indexColumnToFilter="indexColumnToFilter"
          :types="types"
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
        <tr
          v-for="(row, rowIndex) of rows"
          :key="rowIndex"
          :class="{
            noEdit:
              !editable ||
              (noEditingSettings?.rows && noEditingSettings?.rows.find((i) => data?.[i]?.join('') === row.join(''))),
          }"
        >
          <td
            v-for="(item, columnIndex) of row"
            :key="columnIndex"
            @click="handlers?.find((i) => i.cell?.[0] === rowIndex && i.cell?.[1] === columnIndex)?.handler"
            :class="{
              leftBorder: showAllLines,
              darkRow: stripedRows && rowIndex % 2,
              noEdit: !editable || (noEditingSettings?.columns && ~noEditingSettings.columns?.indexOf(columnIndex)),
              pointer: handlers?.find((i) => i.cell?.[0] === rowIndex && i.cell?.[1] === columnIndex),
            }"
            :style="`padding: calc(${initGap} / 2 + ${additionalHeightFromSize}) ${initGap}`"
          >
            <TableCell
              :item="item"
              :types="types"
              :columns="columns"
              :rowIndex="rowIndex"
              :columnIndex="columnIndex"
              :center="center"
              :editable="editable"
              :noEditingSettings="noEditingSettings?.cells"
              :fontSize="fontSize"
              :knobWidth="knobWidth"
              :noEdit="!!handlers?.find((i) => i.cell?.[0] === rowIndex && i.cell?.[1] === columnIndex)"
              @updateData="updateData"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table {
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
.cell {
  display: flex;
  width: 100%;
  height: 100%;
}
.cellCenter {
  justify-content: center;
  align-items: center;
}
.leftBorder {
  border-left: 1px solid v-bind(secondaryColor);
}
.darkRow {
  background-color: v-bind(darkCellColor);
}
.noEdit {
  pointer-events: none;
}
.pointer {
  cursor: pointer;
}
</style>
