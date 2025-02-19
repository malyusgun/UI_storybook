import { convertThemeToColor } from '../../common/helpers/common';
import { EThemeColor, type TDarkness, type TSize, type TThemeColor } from '../../common/interfaces/common';
import type { IColorGap } from '../../common/interfaces/componentsProp';

export const calcNewValue = (
  event: MouseEvent,
  center: number[],
  start: number[],
  degreesTotal: number,
  length: number,
  step: number,
  value: number,
) => {
  const x = event.clientX;
  const y = event.clientY;
  const a = Math.sqrt(Math.pow(x - center[0], 2) + Math.pow(y - center[1], 2));
  const b = Math.sqrt(Math.pow(x - start[0], 2) + Math.pow(y - start[1], 2));
  const c = Math.sqrt(Math.pow(center[0] - start[0], 2) + Math.pow(center[1] - start[1], 2));

  let angle = (Math.acos((Math.pow(a, 2) - Math.pow(b, 2) + Math.pow(c, 2)) / (2 * a * c)) * 180) / Math.PI;

  const emptyDegreesHalf = (360 - degreesTotal) / 2;
  if (angle < emptyDegreesHalf) return value;
  if (x > center[0]) angle = 360 - angle;

  return Math.round((angle - emptyDegreesHalf) / ((degreesTotal / length) * step)) * step;
};

export const calcCenter = (container: Element) => {
  const clientRect = container.getBoundingClientRect();
  return [
    clientRect.left + (clientRect.right - clientRect.left) / 2,
    clientRect.top + (clientRect.bottom - clientRect.top) / 2,
  ];
};

export const calcStart = (container: Element) => {
  const clientRect = container.getBoundingClientRect();
  return [clientRect.left + (clientRect.right - clientRect.left) / 2, clientRect.bottom];
};

export const calcThemeColor = (
  colorGaps: IColorGap[] | undefined,
  theme: TThemeColor,
  darknessTheme: TDarkness,
  value: number,
) => {
  if (!colorGaps) return convertThemeToColor(theme, darknessTheme);
  const current = colorGaps.find((item) => item.start <= value && value <= item.end);
  if (!current) return convertThemeToColor(theme, darknessTheme);
  return current.color in EThemeColor
    ? convertThemeToColor(current.color, current.darknessColor ?? '500')
    : current.color;
};

export const calcContainerSize = (size: TSize) => {
  if (size === 'normal') return '100px';
  if (size === 'large') return '150px';
  if (size === 'huge') return '200px';
  return '70px';
};
