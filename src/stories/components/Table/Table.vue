<script setup lang="ts">
import type { ITableProps } from '@interfaces/componentsProps';
import { computed, ref, watch } from 'vue';
import { convertThemeToColor, convertThemeToSecondaryColor, convertThemeToTextColor } from '@helpers/common';
import type { ITableItem } from '@interfaces/componentsProp';
import FilterIcon from '@stories/icons/Mono/FilterIcon.vue';
import SortDownIcon from '@stories/icons/Mono/SortDownIcon.vue';
import SortUpIcon from '@stories/icons/Mono/SortUpIcon.vue';
import SortVerticalIcon from '@stories/icons/Mono/SortVerticalIcon.vue';

const props = withDefaults(defineProps<ITableProps>(), {
  gap: '5px',
  theme: 'white',
  darknessTheme: '500',
  fontSize: '16px',
});
const columns = ref(props.columns);
watch(props.columns, () => (columns.value = props.columns));
const gap = computed(() => props.gap);
const data = defineModel<ITableItem[][]>('data');
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

const sortStateActive = ref([]);
const rows = computed<ITableItem[][]>(() => {
  // ['up', 'down', ...]
  const rows = [...data.value];
  if (!sortStateActive.value.length) return rows;

  if (props.multipleSort) {
    // let indexColumn = sortState.value.findIndex((state) => state && state !== 'none');
    // let lastColumnIndexSorted = indexColumn;
    // console.log('indexColumn: ', indexColumn);
    // for (const sortItem of sortStateActive.value) {
    //   rows.sort((a, b) =>
    //     sortItem.split('$')[1] === 'down'
    //       ? a[indexColumn].value.localeCompare(b[indexColumn].value)
    //       : b[indexColumn].value.localeCompare(a[indexColumn].value),
    //   );
    //   indexColumn = sortState.value.findIndex(
    //     (state, index) => state && state !== 'none' && index !== lastColumnIndexSorted,
    //   );
    //   lastColumnIndexSorted = indexColumn;
    // }
    // return rows;
  } else {
    const index = sortStateActive.value[0];
    const value = sortStateActive.value[1];
    return rows.sort((a, b) =>
      value === 'down' ? a[index].value.localeCompare(b[index].value) : b[index].value.localeCompare(a[index].value),
    );
  }
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
</script>

<template>
  <div>
    <table
      :class="{
        tableLines: showAllLines,
      }"
      :style="`background-color: ${themeColor}; color: ${color}`"
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
            style="padding: 5px 0 5px 5px"
          >
            <div
              :style="`justify-content: ${center ? 'center' : 'start'}; padding: ${center ? `0px calc(${gap} / 2 + ${column.padding ?? '0px'} / 2)` : `0 ${column.padding ?? '0px'} 0 0`}`"
              :class="[
                'columnFlex',
                {
                  columnGap: !center,
                },
              ]"
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
                  <SortVerticalIcon
                    v-show="sortState[index] === 'none'"
                    :color="textColor"
                    :size="isNaN(+fontSize.slice(0, -2)) ? fontSize.slice(0, -3) : fontSize.slice(0, -2)"
                  />
                  <SortDownIcon
                    v-show="sortState[index] === 'down'"
                    :color="textColor"
                    :size="isNaN(+fontSize.slice(0, -2)) ? fontSize.slice(0, -3) : fontSize.slice(0, -2)"
                  />
                  <SortUpIcon
                    v-show="sortState[index] === 'up'"
                    :color="textColor"
                    :size="isNaN(+fontSize.slice(0, -2)) ? fontSize.slice(0, -3) : fontSize.slice(0, -2)"
                  />
                </button>
                <button v-if="column.filterable" @click.prevent="">
                  <FilterIcon
                    :color="textColor"
                    :size="isNaN(+fontSize.slice(0, -2)) ? fontSize.slice(0, -3) : fontSize.slice(0, -2)"
                  />
                </button>
              </div>
              <div v-if="!center"></div>
            </div>
          </th>
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
            :style="`padding: 5px; text-align: ${center ? 'center' : 'start'}`"
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
.columnGap {
  gap: v-bind(gap);
}
.columnHeader-container {
  display: flex;
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
</style>
