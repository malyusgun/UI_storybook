<script setup lang="ts">
import { filterCheckboxProps, filterSelectProps } from '../helpers';
import type { ITableColumn, TTableColumnType } from '@interfaces/componentsProp';
import Checkbox from '../../Checkbox/Checkbox.vue';
import Select from '../../Select/Select.vue';
import Rating from '../../Rating/Rating.vue';
import ProgressBar from '../../ProgressBar/ProgressBar.vue';
import Knob from '../../Knob/Knob.vue';
import type { TThemeColor } from '@interfaces/common';

interface IProps {
  item: unknown;
  types: (TTableColumnType | undefined)[];
  column: ITableColumn;
  rowIndex: number;
  columnIndex: number;
  center: boolean | undefined;
  isEditMode: boolean;
  fontSize: string;
  initGap: string;
  knobWidth: string;
  noEditingSettings: [number, number][] | undefined;
  noEdit: boolean;
  theme: TThemeColor;
}
defineProps<IProps>();
defineEmits(['updateData']);
</script>

<template>
  <div
    :style="`width: calc(${column.width ?? 'auto'} - 2 * ${initGap})`"
    :class="[
      'cell',
      {
        cellCenter: center,
        noEdit:
          noEdit ||
          !isEditMode ||
          (noEditingSettings &&
            noEditingSettings?.find((i: [number, number]) => i[0] === rowIndex && i[1] === columnIndex)),
      },
    ]"
  >
    <input
      v-if="~['text', 'number'].indexOf(types[columnIndex] ?? '')"
      :value="item"
      @input="(event) => $emit('updateData', event.target, rowIndex, columnIndex)"
      :id="`${rowIndex}-${columnIndex}`"
      :type="types[columnIndex]"
      :style="`width: 100%; text-align: ${center ? 'center' : 'auto'}`"
    />
    <div v-else-if="isEditMode">
      <Checkbox
        v-if="types[columnIndex] === 'checkbox'"
        v-bind="filterCheckboxProps(column.options)"
        :active="item as boolean"
        @update="$emit('updateData', $event, rowIndex, columnIndex)"
      />
      <Select
        v-else-if="types[columnIndex] === 'select'"
        noBorder
        noSelectedBackground
        v-bind="filterSelectProps(column.options)"
        width="150px"
        :theme="theme"
        :selected="item as string"
        @update="$emit('updateData', $event, rowIndex, columnIndex)"
      />
      <Rating
        v-else-if="types[columnIndex] === 'rating'"
        v-bind="column.options"
        :value="item as number"
        @update="$emit('updateData', $event, rowIndex, columnIndex)"
      />
      <ProgressBar
        v-else-if="types[columnIndex] === 'progressBar'"
        v-bind="column.options"
        :value="item as number"
        @update="$emit('updateData', $event, rowIndex, columnIndex)"
      />
      <Knob
        v-else-if="types[columnIndex] === 'knob'"
        v-bind="column.options"
        :value="item as number"
        :width="knobWidth"
        :fontSize="fontSize"
        @update="$emit('updateData', $event, rowIndex, columnIndex)"
      />
    </div>
    <div v-else>
      <Checkbox
        v-if="types[columnIndex] === 'checkbox'"
        v-bind="filterCheckboxProps(column.options)"
        :active="item as boolean"
      />
      <Select
        v-else-if="types[columnIndex] === 'select'"
        noBorder
        noSelectedBackground
        v-bind="filterSelectProps(column.options)"
        width="150px"
        :theme="theme"
        :selected="item as string"
      />
      <Rating v-else-if="types[columnIndex] === 'rating'" v-bind="column.options" :value="item as number" />
      <ProgressBar v-else-if="types[columnIndex] === 'progressBar'" v-bind="column.options" :value="item as number" />
      <Knob
        v-else-if="types[columnIndex] === 'knob'"
        v-bind="column.options"
        :value="item as number"
        :width="knobWidth"
        :fontSize="fontSize"
      />
    </div>
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
  appearance: textfield;
  -moz-appearance: textfield;
}
</style>
