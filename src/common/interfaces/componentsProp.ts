import type { TDarkness, TIcon, TPosition, TTextStyle, TThemeColor } from '@interfaces/common';

export interface ITableColumn {
  name: string;
  type?: TTableColumnType;
  editable?: boolean;
  filterable?: boolean;
  sortable?: boolean;
  initSort?: 'up' | 'down' | 'none';
  padding?: string;
}

export interface ITableItem {
  value: string;
  editable?: boolean;
}

export type TTableColumnType =
  | 'checkbox'
  | 'number'
  | 'text'
  | 'date'
  | 'select'
  | 'rating'
  | 'progressBar'
  | 'knob'
  | 'avatar'
  | 'image';

export interface ITreeItem {
  label: string;
  link?: string;
  linkBlank?: boolean;
  color?: TThemeColor;
  textStyle?: TTextStyle;
  isTriangleToColor?: boolean;
  iconBefore?: TIcon;
  iconAfter?: TIcon;
  iconColor?: TThemeColor;
  children?: ITreeItem[];
  darknessColor?: TDarkness;
  darknessIconColor?: TDarkness;
  isLinkClicked?: boolean;
}

export interface IMDItemProps {
  label: string;
  theme?: TThemeColor;
  color?: TThemeColor;
  darknessTheme?: TDarkness;
  darknessColor?: TDarkness;
  textStyle?: TTextStyle;
  link?: string;
  linkBlank?: boolean;
  onClick?: () => void;
}

export interface IColorGap {
  start: number;
  end: number;
  color: TThemeColor;
  darknessColor?: TDarkness;
}

export interface ISelectOption {
  value: string;
  label?: string;
  group?: string;
  iconLeft?: TIcon;
  iconRight?: TIcon;
  iconLeftColor?: TThemeColor;
  iconRightColor?: TThemeColor;
  color?: TThemeColor;
  darknessColor?: TDarkness;
  background?: TThemeColor;
  darknessBackground?: TDarkness;
}

export interface ISelectGroup {
  name: string;
  nameColor?: TThemeColor;
  background?: TThemeColor;
  items?: ISelectOption[];
  iconLeft?: TIcon;
  iconRight?: TIcon;
  iconLeftColor?: TThemeColor;
  iconRightColor?: TThemeColor;
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
