<script setup lang="ts">
import type { ITableProps } from '@interfaces/componentsProps';
import { computed } from 'vue';
import { convertThemeToColor, convertThemeToSecondaryColor, convertThemeToTextColor } from '@helpers/common';
import type { ITableItem } from '@interfaces/componentsProp';

const props = withDefaults(defineProps<ITableProps>(), {
  gap: '5px',
  theme: 'white',
  darknessTheme: '500',
  fontSize: '16px',
});
const gap = computed(() => props.gap);
// const emit = defineEmits(['']);
const data = defineModel('data') as ITableItem[][];
// watch(, () => {});
const themeColor = computed(() => convertThemeToColor(props.theme, props.darknessTheme));
const color = computed(() =>
  props.textColor
    ? convertThemeToColor(props.textColor, props.darknessTextColor)
    : convertThemeToTextColor(props.theme, props.darknessTheme),
);
const secondaryColor = computed(() => convertThemeToSecondaryColor(props.theme, props.darknessTheme));
const darkCellColor = computed(() => convertThemeToSecondaryColor(props.theme, String(+props.darknessTheme + 300)));
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
            v-for="column of columns"
            :key="column.name"
            class="columnHeader"
            style="padding: 5px 0 5px 5px"
          >
            <div class="columnFlex">
              {{ column.name }}
              <div></div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) of data" :key="index">
          <td
            :class="{
              leftBorder: showAllLines,
              darkRow: stripedRows && index % 2,
            }"
            v-for="item of row"
            :key="item.value"
            style="padding: 5px"
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
  gap: v-bind(gap);
  font-weight: bold;
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
