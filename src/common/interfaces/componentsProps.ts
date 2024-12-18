import type {
  TBorder,
  TDirection,
  TExpandedPosition,
  TIcons,
  TPosition,
  TSize,
  TTextStyle,
  TThemeColor,
  TThemeColorNoWhite,
} from '@interfaces/common';
import type { ISBOption, ISliderOptions, ITreeItem } from '@interfaces/componentsProp';

export interface ITLProps {
  items: ITreeItem[];
  maxWidth?: number;
  expand?: boolean;
  theme?: TThemeColor;
}

export interface ITIProps {
  state: {
    isOpen: boolean;
    label: string;
  }[];
  items: ITreeItem[];
  textColor: TThemeColor;
  themeColor: string;
}

export interface IMDProps {
  items: {
    label: string;
    theme?: string;
    textStyle?: TTextStyle;
    link?: string;
    linkBlank?: boolean;
    onClick?: () => void;
  }[];
  size?: TSize;
  theme?: string;
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
  orientation?: 'horizontal' | 'vertical';
  isSmooth?: boolean;
  options?: ISliderOptions[];
}

export interface IDrawerProps {
  position?: TPosition;
  width?: string | number;
  theme?: TThemeColor;
  modal?: boolean;
  dismissible?: boolean;
  closeIcon?: TIcons;
  headerDivider?: boolean;
  footerDivider?: boolean;
}

export interface IModalProps {
  theme?: TThemeColor;
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
  maxWidth?: string;
  maxHeight?: string;
  padding?: string;
}

export interface ISBProps {
  options: ISBOption[];
  size?: TSize;
  rounded?: boolean;
  activeBackgroundColor?: TThemeColor;
  border?: TThemeColor;
  disabled?: boolean;
}

export interface IButtonProps {
  label?: string;
  size?: TSize;
  textStyle?: TTextStyle;
  iconPos?: TPosition;
  width?: string | number;
  theme?: TThemeColor;
  textColor?: TThemeColor;
  border?: TThemeColor;
  iconOnly?: boolean;
}

export interface ITSProps {
  size?: TSize;
  theme?: TThemeColorNoWhite;
  negativeTheme?: TThemeColor;
  darkNegative?: boolean;
  disabled?: boolean;
}

export interface IDividerProps {
  height?: number;
  type?: TBorder;
  color?: TThemeColor;
}
