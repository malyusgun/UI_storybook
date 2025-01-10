import type {
  TBorder,
  TDarkness,
  TDirection,
  TExpandedPosition,
  TIcons,
  TPosition,
  TSize,
  TTextStyle,
  TThemeColor,
  TThemeColorNoWhite,
} from '@interfaces/common';
import type {
  IMDItemProps,
  ISBOption,
  ISliderOptions,
  ITableColumn,
  ITableItem,
  ITreeItem,
} from '@interfaces/componentsProp';

export interface ITableProps {
  columns: ITableColumn[];
  data: ITableItem[][];
  multipleSort?: boolean;
  gap?: string;
  size?: TSize;
  showAllLines?: boolean;
  stripedRows?: boolean;
  center?: boolean;
  fontSize?: string;
  theme?: TThemeColor;
  textColor?: TThemeColor;
  darknessTheme?: TDarkness;
  darknessTextColor?: TDarkness;
}

export interface ITLProps {
  items: ITreeItem[];
  maxWidth?: number;
  expand?: boolean;
  theme?: TThemeColor;
  textColor?: TThemeColor;
  darknessTextColor?: TDarkness;
  darknessTheme?: TDarkness;
}

export interface ITIProps {
  state: {
    isOpen: boolean;
    label: string;
  }[];
  items: ITreeItem[];
  color: string;
  themeColor: string;
}

export interface IMDProps {
  items: IMDItemProps[];
  size?: TSize;
  theme?: TThemeColor;
  iconColor?: TThemeColor;
  darknessTheme?: TDarkness;
  darknessIconColor?: TDarkness;
  direction?: TDirection;
  // direction?: TDirection | 'circle';
}

export interface ISliderProps {
  width?: string | number;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  size?: TSize;
  theme?: TThemeColor;
  backgroundColor?: TThemeColor;
  darknessTheme?: TDarkness;
  darknessBackgroundColor?: TDarkness;
  orientation?: 'horizontal' | 'vertical';
  isSmooth?: boolean;
  options?: ISliderOptions[];
}

export interface IDrawerProps {
  position?: TPosition;
  width?: string | number;
  theme?: TThemeColor;
  textColor?: TThemeColor;
  darknessTheme?: TDarkness;
  darknessTextColor?: TDarkness;
  modal?: boolean;
  dismissible?: boolean;
  closeIcon?: TIcons;
  headerDivider?: boolean;
  footerDivider?: boolean;
}

export interface IModalProps {
  theme?: TThemeColor;
  textColor?: TThemeColor;
  darknessTheme?: TDarkness;
  darknessTextColor?: TDarkness;
  width?: string;
  height?: string;
  position?: TExpandedPosition;
  dismissible?: boolean;
  closeIcon?: TIcons;
  headerDivider?: boolean;
}

export interface IPopupProps {
  parentSelector?: string;
  theme?: TThemeColor;
  textColor?: TThemeColor;
  darknessTheme?: TDarkness;
  darknessTextColor?: TDarkness;
  maxWidth?: string;
  maxHeight?: string;
  padding?: string;
  buttonMenu?: boolean;
  top?: number;
  left?: number;
}

export interface ISBProps {
  options: ISBOption[];
  size?: TSize;
  rounded?: boolean;
  theme?: TThemeColor;
  textColor?: TThemeColor;
  activeBackgroundColor?: TThemeColor;
  darknessTheme?: TDarkness;
  darknessTextColor?: TDarkness;
  darknessActiveBackgroundColor?: TDarkness;
  disabled?: boolean;
}

export interface IButtonProps {
  label?: string;
  size?: TSize;
  textStyle?: TTextStyle;
  iconPos?: TPosition;
  width?: string | number;
  iconOnly?: boolean;
  theme?: TThemeColor;
  textColor?: TThemeColor;
  darknessTheme?: TDarkness;
  darknessTextColor?: TDarkness;
}

export interface ITSProps {
  size?: TSize;
  theme?: TThemeColorNoWhite;
  negativeTheme?: TThemeColor;
  darknessTheme?: TDarkness;
  darknessNegativeTheme?: TDarkness;
  disabled?: boolean;
}

export interface ITagProps {
  value?: string;
  size?: TSize;
  rounded?: boolean;
  iconLeft?: TIcons;
  iconRight?: TIcons;
  theme?: TThemeColor;
  background?: TThemeColor;
  border?: TThemeColor;
  darknessTheme?: TDarkness;
  darknessBackground?: TDarkness;
  darknessBorder?: TDarkness;
}

export interface ICheckboxProps {
  label?: string;
  labelPos?: TPosition;
  name?: string;
  size?: TSize;
  disabled?: boolean;
  invalid?: boolean;
  theme?: TThemeColor;
  activeTheme?: TThemeColor;
  textColor?: TThemeColor;
  borderColor?: TThemeColor;
  darknessTheme?: TDarkness;
  darknessActiveTheme?: TDarkness;
  darknessTextColor?: TDarkness;
  darknessBorder?: TDarkness;
}

export interface IDividerProps {
  height?: number;
  type?: TBorder;
  color?: TThemeColor;
  darknessColor?: TDarkness;
}
