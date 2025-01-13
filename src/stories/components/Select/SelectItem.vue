<script setup lang="ts">
import { iconsSet } from '@/common/constants/icons';
import type { ISelectOption } from '@interfaces/componentsProp';
import type { TThemeColor } from '@interfaces/common';
import { convertThemeToColor } from '@helpers/common';
interface IProps {
  option: ISelectOption | undefined;
  fontSize: string;
  textColor: string;
}
defineProps<IProps>();
const calcOptionColor = (color: TThemeColor | undefined, darknessColor: string | undefined, defaultColor: string) =>
  color ? convertThemeToColor(color, darknessColor ?? '500') : defaultColor;
</script>

<template>
  <span>
    <slot :name="`icon-left-${option?.value}`"></slot>
    <component
      v-if="option?.iconLeft"
      :is="iconsSet[option?.iconLeft]"
      :size="fontSize.slice(0, -2)"
      :color="calcOptionColor(option?.iconLeftColor ?? option?.color, option?.darknessColor, textColor)"
    />
    <slot />
    <component
      v-if="option?.iconRight"
      :is="iconsSet[option?.iconRight]"
      :size="fontSize.slice(0, -2)"
      :color="calcOptionColor(option?.iconRightColor ?? option?.color, option?.darknessColor, textColor)"
    />
    <slot :name="`icon-right-${option?.value}`"></slot>
  </span>
</template>

<style scoped></style>
