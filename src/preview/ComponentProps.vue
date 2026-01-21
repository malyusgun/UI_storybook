<script setup lang="ts">
import { ref } from 'vue';
import type { IMDItemProps } from '@interfaces/componentsProp';

interface IProps {
  keys: string[];
  values: string[];
}
defineProps<IProps>();

const popupContents: Record<string, string> = {
  TThemeColor: `'white' | 'blue' | 'sky' | 'cyan' | 'teal' | 'lime'
   | 'green' | 'yellow' | 'amber' | 'orange' | 'pink'| 'fuchsia'
    | 'purple' | 'indigo' | 'rose' | 'red' | 'black'`,
  TSize: `'small' | 'normal' | 'large' | 'huge'`,
  TDarkness: `'100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'`,
  TThemeColorNoWhite: `Exclude<TThemeColor, 'white'>`,
  TTextStyle: `'bold' | 'italic'`,
  TDirection: `'up' | 'right' | 'down' | 'left'`,
  TPosition: `'top' | 'right' | 'bottom' | 'left'`,
  TExpandedPosition: `TPosition | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'`,
  TBorder: `'solid' | 'dashed' | 'dotted'`,
  TInputDivScheme: `{num}by{num} |
{num}-{num} |
{num}-{num}-{num}-{num} |
{num}-{num}-{num}-{num}-{num} |
{num}-{num}-{num}-{num}-{num}-{num} |
{num}-{num}-{num}-{num}-{num}-{num}-{num} |
{num}-{num}-{num}-{num}-{num}-{num}-{num}-{num} |
{num}-{num}-{num}-{num}-{num}-{num}-{num}-{num}-{num} |
{num}-{num}-{num}-{num}-{num}-{num}-{num}-{num}-{num}-{num}`,
  IColorGap: `{
  start: number;
  end: number;
  color: TThemeColor;
  darknessColor?: TDarkness;
}[]`,
  IMDItemProps: `{
  label: string;
  theme?: TThemeColor;
  color?: TThemeColor;
  darknessTheme?: TDarkness;
  darknessColor?: TDarkness;
  textStyle?: TTextStyle;
  link?: string;
  linkBlank?: boolean;
  onClick?: () => void;
}`,
};

const emits = defineEmits(['pointerEnter', 'pointerLeave']);

const onPointerEnter = (value: string, selector: string) => {
  const content = popupContents[value];
  if (!content) return;

  emits('pointerEnter', selector, content);
};
const onPointerLeave = () => {
  emits('pointerLeave');
};

const componentKey = ref(+Math.random().toFixed(3) * 10000);

const getSelector = (value: string, index: number) => {
  return (value.endsWith(']') ? value.slice(0, -2) : value) + componentKey.value + index;
};
</script>

<template>
  <div id="code-block">
    <span class="bracket">{</span>
    <p v-for="(key, index) of keys" :key="key" class="couple">
      <template v-if="key.endsWith('?')"
        ><span class="key optional">{{ key.slice(0, -1) }}</span
        ><span style="color: yellow">?</span></template
      >
      <span v-else class="key">{{ key }}</span
      ><span style="color: yellow">: </span
      ><span
        @pointerenter="
          onPointerEnter(
            values[index].endsWith(']') ? values[index].slice(0, -2) : values[index],
            getSelector(values[index], index),
          )
        "
        @pointerleave="onPointerLeave"
        :class="[
          'value',
          {
            customType: popupContents[values[index].endsWith(']') ? values[index].slice(0, -2) : values[index]],
          },
        ]"
        :id="getSelector(values[index], index)"
        >{{ values[index] }}</span
      >;
    </p>
    <span class="bracket">}</span>
  </div>
</template>

<style scoped>
#code-block {
  padding: 10px;
  background: #302d2d;
  .key,
  .value {
    font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
  }
}
.bracket {
  color: white;
}
.key {
  color: orange;
}
.value {
  color: #47a2ff;
}
.customType {
  border-bottom: 1px dashed white;
  cursor: pointer;
}
.couple {
  font-style: italic;
  display: block;
  margin-left: 30px;
}
@media screen and (width < 600px) {
  .bracket,
  .key,
  .value {
    font-size: 14px;
  }
}
@media screen and (width < 400px) {
  .bracket,
  .key,
  .value {
    font-size: 12px;
  }
}
</style>
