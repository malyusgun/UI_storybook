import type { TDarkness, TIcons, TPosition, TTextStyle, TThemeColor } from '@interfaces/common';

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
  darknessColor?: TDarkness;
  darknessIconColor?: TDarkness;
  isLinkClicked?: boolean;
}

export interface IMDItemProps {
  label: string;
  theme?: TThemeColor;
  darknessTheme?: TDarkness;
  textStyle?: TTextStyle;
  link?: string;
  linkBlank?: boolean;
  onClick?: () => void;
}

export interface ISBOption {
  label: string;
  value?: never;
  color?: TThemeColor;
  activeColor?: TThemeColor;
  backgroundColor?: TThemeColor;
  darknessColor?: TDarkness;
  darknessActiveColor?: TDarkness;
  darknessBackgroundColor?: TDarkness;
  isLabelHidden?: boolean;
  iconPosition?: TPosition;
  textStyle?: TTextStyle;
}

export interface ISliderOptions {
  label: string | number | boolean;
  value?: string | number;
  color?: TThemeColor;
  darknessColor?: TDarkness;
}
