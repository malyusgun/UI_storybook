<script setup lang="ts">
import { filterCheckboxProps, filterSelectProps } from '@components/Table/helpers';
import type { ITableColumn, TTableColumnType } from '@interfaces/componentsProp';
import Checkbox from '@components/Checkbox/Checkbox.vue';
import Select from '@components/Select/Select.vue';
import Rating from '@components/Rating/Rating.vue';
import ProgressBar from '@components/ProgressBar/ProgressBar.vue';
import Knob from '@components/Knob/Knob.vue';

interface IProps {
  item: unknown;
  types: (TTableColumnType | undefined)[];
  columns: ITableColumn[];
  rowIndex: number;
  columnIndex: number;
  center: boolean | undefined;
  editable: boolean;
  fontSize: string;
  knobWidth: string;
  noEditingSettings: [number, number][] | undefined;
  noEdit: boolean;
}
defineProps<IProps>();
defineEmits(['updateData']);
</script>

<template>
  <div
    :class="[
      'cell',
      {
        cellCenter: center,
        noEdit:
          noEdit ||
          !editable ||
          noEditingSettings?.find((i: [number, number]) => i[0] === rowIndex && i[1] === columnIndex),
      },
    ]"
  >
    <input
      v-if="~['text', 'number'].indexOf(types[columnIndex] ?? '')"
      :value="item"
      @input="(event) => $emit('updateData', event.target, rowIndex, columnIndex)"
      :id="`${rowIndex}-${columnIndex}`"
      :type="types[columnIndex]"
      :style="`display: inline; width: 100%; text-align: ${center ? 'center' : 'auto'}`"
    />
    <Checkbox
      v-else-if="types[columnIndex] === 'checkbox'"
      v-bind="filterCheckboxProps(columns[columnIndex].options)"
      :active="item as boolean"
      @update="$emit('updateData', $event, rowIndex, columnIndex)"
    />
    <Select
      v-else-if="types[columnIndex] === 'select'"
      noBorder
      noSelectedBackground
      v-bind="filterSelectProps(columns[columnIndex].options)"
      width="150px"
      :selected="item as string"
      @update="$emit('updateData', $event, rowIndex, columnIndex)"
    />
    <Rating
      v-else-if="types[columnIndex] === 'rating'"
      v-bind="columns[columnIndex].options"
      :value="item as number"
      @update="$emit('updateData', $event, rowIndex, columnIndex)"
    />
    <ProgressBar
      v-else-if="types[columnIndex] === 'progressBar'"
      v-bind="columns[columnIndex].options"
      :value="item as number"
      @update="$emit('updateData', $event, rowIndex, columnIndex)"
    />
    <Knob
      v-else-if="types[columnIndex] === 'knob'"
      v-bind="columns[columnIndex].options"
      :value="item as number"
      :width="knobWidth"
      :fontSize="fontSize"
      @update="$emit('updateData', $event, rowIndex, columnIndex)"
    />
  </div>
</template>

<style scoped>
input {
  border: 1px solid transparent;
  transition: border-color 0.2s ease;
}
input:hover {
  border-color: white;
  border-radius: 5px;
}
input:active {
  border-radius: 5px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
