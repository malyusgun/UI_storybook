<script setup lang="ts">
import type { ITableProps } from '@interfaces/componentsProps';
import { computed, type Ref, ref } from 'vue';
import { convertThemeToColor, convertThemeToSecondaryColor, convertThemeToTextColor } from '@helpers/common';
import { calcAdditionalHeight, calcGap, calcRows } from '@components/Table/helpers';
import TableHeader from '@components/Table/components/TableHeader.vue';
import TableCell from '@components/Table/components/TableCell.vue';
import Paginator from '@components/Paginator/Paginator.vue';
import ToggleSwitch from '@components/ToggleSwitch/ToggleSwitch.vue';

const props = withDefaults(defineProps<ITableProps>(), {
  size: 'normal',
  theme: 'white',
  darknessTheme: '500',
  fontSize: '16px',
  editable: false,
});
const data = defineModel() as Ref<unknown[][]>;
const emit = defineEmits(['updateData']);

const table = ref();
const currentPage = ref<number>(1);
const itemsPerPage = ref<number>(10);
const isEditMode = ref<boolean>(props.editable);

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
    currentPage.value,
    itemsPerPage.value,
    sortStateActive.value,
    props.multipleSort,
    indexColumnToFilter.value,
    props.columns[sortStateActive.value?.[0] ?? -1]?.type ?? 'text',
    filterValue.value,
    isRegisterSensitive.value,
  ),
);
const types = computed(() => props.columns.map((column) => column.type));
const paginatorContainerHeight = computed(() => (props.paginator || props.editable ? '50px' : '0'));
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
        :isEditMode="isEditMode"
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
            !isEditMode ||
            (noEditingSettings?.rows && noEditingSettings?.rows.find((i) => data?.[i]?.join('') === row.join(''))),
        }"
      >
        <td
          v-for="(item, columnIndex) of row"
          :key="columnIndex"
          @click="
            handlers ? handlers.find((i) => i.cell?.[0] === rowIndex && i.cell?.[1] === columnIndex)?.handler?.() : null
          "
          :class="{
            leftBorder: showAllLines,
            darkRow: stripedRows && !(rowIndex % 2),
            noEdit: !isEditMode || (noEditingSettings?.columns && ~noEditingSettings.columns?.indexOf(columnIndex)),
            pointer: handlers && handlers?.find((i) => i.cell?.[0] === rowIndex && i.cell?.[1] === columnIndex),
          }"
          :style="`padding: calc(${initGap} / 2 + ${additionalHeightFromSize}) ${initGap}`"
        >
          <TableCell
            :item="item"
            :types="types"
            :column="columns[columnIndex]"
            :rowIndex="rowIndex"
            :columnIndex="columnIndex"
            :center="center"
            :isEditMode="isEditMode"
            :noEditingSettings="noEditingSettings?.cells"
            :fontSize="fontSize"
            :initGap="initGap"
            :knobWidth="knobWidth"
            :noEdit="
              handlers ? !!handlers?.find((i) => i.cell?.[0] === rowIndex && i.cell?.[1] === columnIndex) : false
            "
            :theme="theme"
            @updateData="updateData"
          />
        </td>
      </tr>
    </tbody>
  </table>
  <div class="paginatorContainer">
    <section v-if="editable" class="editMenu">
      <p class="editText">Edit mode:</p>
      <ToggleSwitch v-model="isEditMode" negativeTheme="red" />
    </section>
    <Paginator
      v-show="paginator"
      v-model:current="currentPage"
      v-model:itemsPerPage="itemsPerPage"
      :theme="theme"
      :total="data.length"
      :itemsPerPageOptions="[2, 5]"
      v-bind="paginatorOptions"
      class="paginator"
    />
  </div>
</template>

<style scoped>
.table {
  border-collapse: collapse;
  position: relative;
  * {
    font-size: v-bind(fontSize);
  }
}
.table::after {
  content: '';
  position: absolute;
  top: 100%;
  z-index: -1;
  width: 100%;
  height: v-bind(paginatorContainerHeight);
  background-color: v-bind(themeColor);
}
.editMenu {
  display: flex;
  align-items: center;
  gap: 10px;
  width: max-content;
  padding: 10px;
}
.editText {
  color: v-bind(color);
}
.paginatorContainer {
  height: 50px;
  display: flex;
  align-items: center;
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
  height: 100%;
  margin: 0 auto;
}
.cellCenter {
  justify-content: center;
  align-items: center;
}
.paginator {
  margin: 0 auto;
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
