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

export type TSize = 'small' | 'medium' | 'large' | 'huge';

export type TTextStyle = 'bold' | 'italic';

export type TPosition = 'top' | 'right' | 'bottom' | 'left';

export type TBorder = 'solid' | 'dashed' | 'dotted';

export type TIcons = keyof typeof iconsSet;
