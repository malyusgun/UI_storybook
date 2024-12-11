import type { iconsSet } from '@/common/constants/icons';

export type TThemeColor =
  | 'white'
  | 'slate'
  | 'blue'
  | 'sky'
  | 'teal'
  | 'green'
  | 'yellow'
  | 'orange'
  | 'pink'
  | 'fuchsia'
  | 'purple'
  | 'indigo'
  | 'rose'
  | 'red'
  | 'black';

export type TThemeColorNoWhite = Exclude<TThemeColor, 'white'>;

export type TIcons = keyof typeof iconsSet;
