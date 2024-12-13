import type { TIcons, TThemeColor } from '@interfaces/common';

export interface ITreeItem {
  label: string;
  link?: string;
  linkBlank?: boolean;
  color?: TThemeColor;
  textStyle?: 'bold' | 'italic';
  isTriangleToColor?: boolean;
  iconBefore?: TIcons;
  iconAfter?: TIcons;
  iconColor?: TThemeColor;
  children?: ITreeItem[];
}
