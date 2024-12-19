import type { iconsSet } from '@/common/constants/icons';

export type TIcons = keyof typeof iconsSet;

export type TThemeColor =
  | 'white'
  | 'blue'
  | 'sky'
  | 'cyan'
  | 'teal'
  | 'lime'
  | 'green'
  | 'yellow'
  | 'amber'
  | 'orange'
  | 'pink'
  | 'fuchsia'
  | 'purple'
  | 'indigo'
  | 'rose'
  | 'red'
  | 'black';

export type TDarkness = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export type TThemeColorNoWhite = Exclude<TThemeColor, 'white'>;

export type TSize = 'small' | 'normal' | 'large' | 'huge';

export type TTextStyle = 'bold' | 'italic';

export type TDirection = 'up' | 'right' | 'down' | 'left';

export type TPosition = 'top' | 'right' | 'bottom' | 'left';

export type TExpandedPosition = TPosition | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export type TBorder = 'solid' | 'dashed' | 'dotted';
