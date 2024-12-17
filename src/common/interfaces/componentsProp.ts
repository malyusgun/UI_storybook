import type { TIcons, TPosition, TTextStyle, TThemeColor } from '@interfaces/common';

export interface ITreeItem {
  label: string;
  link?: string;
  linkBlank?: boolean;
  color?: TThemeColor;
  textStyle?: TTextStyle;
  isTriangleToColor?: boolean;
  iconBefore?: TIcons;
  iconAfter?: TIcons;
  iconColor?: TThemeColor;
  children?: ITreeItem[];
  isLinkClicked?: boolean;
}

export interface ISBOption {
  label: string;
  value?: never;
  color?: TThemeColor;
  activeColor?: TThemeColor;
  backgroundColor?: TThemeColor;
  isLabelHidden?: boolean;
  iconPosition?: TPosition;
  textStyle?: TTextStyle;
}

export interface ISliderOptions {
  label: string | number;
  value?: string | number;
  color?: string;
}
