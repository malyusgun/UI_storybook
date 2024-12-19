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
  ITreeItem,
} from '@interfaces/componentsProp';

export interface ITLProps {
  items: ITreeItem[];
  maxWidth?: number;
  expand?: boolean;
  theme?: TThemeColor;
  darknessTheme?: TDarkness;
}

export interface ITIProps {
  state: {
    isOpen: boolean;
    label: string;
  }[];
  items: ITreeItem[];
  textColor: string;
  themeColor: string;
}

export interface IMDProps {
  items: IMDItemProps[];
  size?: TSize;
  theme?: TThemeColor;
  darknessTheme?: TDarkness;
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
  darknessTheme?: TDarkness;
  modal?: boolean;
  dismissible?: boolean;
  closeIcon?: TIcons;
  headerDivider?: boolean;
  footerDivider?: boolean;
}

export interface IModalProps {
  theme?: TThemeColor;
  darknessTheme?: TDarkness;
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
  darknessTheme?: TDarkness;
  maxWidth?: string;
  maxHeight?: string;
  padding?: string;
}

export interface ISBProps {
  options: ISBOption[];
  size?: TSize;
  rounded?: boolean;
  theme?: TThemeColor;
  activeBackgroundColor?: TThemeColor;
  border?: TThemeColor;
  darknessTheme?: TDarkness;
  darknessActiveBackgroundColor?: TDarkness;
  darknessBorder?: TDarkness;
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
  border?: TThemeColor;
  darknessTheme?: TDarkness;
  darknessTextColor?: TDarkness;
  darknessBorder?: TDarkness;
}

export interface ITSProps {
  size?: TSize;
  theme?: TThemeColorNoWhite;
  negativeTheme?: TThemeColor;
  darknessTheme?: TDarkness;
  darknessNegativeTheme?: TDarkness;
  disabled?: boolean;
}

export interface IDividerProps {
  height?: number;
  type?: TBorder;
  color?: TThemeColor;
  darknessColor?: TDarkness;
}
