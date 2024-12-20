<script setup lang="ts">
import type { ITableProps } from '@interfaces/componentsProps';
import { computed } from 'vue';
import { convertThemeToColor, convertThemeToSecondaryColor, convertThemeToTextColor } from '@helpers/common';

const props = withDefaults(defineProps<ITableProps>(), {
  gap: '5px',
  theme: 'white',
  darknessTheme: 500,
  fontSize: '16px',
});
const gap = computed(() => props.gap);
// const emit = defineEmits(['']);
const data = defineModel('data');
// watch(, () => {});
const themeColor = computed(() => convertThemeToColor(props.theme, props.darknessTheme));
const color = computed(() =>
  props.textColor
    ? convertThemeToColor(props.textColor, props.darknessTextColor)
    : convertThemeToTextColor(props.theme, props.darknessTheme),
);
const borderColor = computed(() => convertThemeToSecondaryColor(props.theme, props.darknessTheme));
</script>

<template>
  <table
    :style="`background-color: ${themeColor}; color: ${color}`"
    :class="{
      tableLines: showAllLines,
    }"
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
  background-color: v-bind(borderColor);
}
.columnFlex {
  display: flex;
  gap: v-bind(gap);
  font-weight: bold;
}
.tableLines {
  border-top: 1px solid v-bind(borderColor);
  border-right: 1px solid v-bind(borderColor);
}
.leftBorder {
  border-left: 1px solid v-bind(borderColor);
}
</style>
