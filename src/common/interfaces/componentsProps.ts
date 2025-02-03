import type {
  TBorder,
  TDarkness,
  TDirection,
  TExpandedPosition,
  TIcon,
  TPosition,
  TSize,
  TTextStyle,
  TThemeColor,
  TThemeColorNoWhite,
} from '@interfaces/common';
import type {
  IColorGap,
  IMDItemProps,
  ISBOption,
  ISelectGroup,
  ISelectOption,
  ISliderOptions,
  ITableColumn,
  ITreeItem,
} from '@interfaces/componentsProp';

export interface ITableProps {
  data?: unknown[][];
  columns: ITableColumn[];
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
  paginator?: boolean;
  paginatorOptions?: IPaginatorProps;
  editable?: boolean;
  noEditingSettings?: {
    columns?: number[];
    rows?: number[];
    cells?: [number, number][];
  };
  handlers?: {
    cell: [number, number];
    handler?: () => void;
  }[];
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

export interface IPaginatorProps {
  total?: number;
  itemsPerPage?: number;
  itemsPerPageOptions?: number[];
  size?: TSize;
  fontSize?: string;
  theme?: TThemeColor;
  darknessTheme?: TDarkness;
}

export interface ICarouselProps {
  itemsProps: any[];
  innerWidth?: string;
  size?: TSize;
  perView?: number;
  perScroll?: number;
  circular?: boolean;
  buttonsBelow?: boolean;
  theme?: TThemeColor;
  darknessTheme?: TDarkness;
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

export interface IKnobProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  size?: TSize;
  width?: string;
  theme?: TThemeColor;
  colorGaps?: IColorGap[];
  negativeTheme?: TThemeColor;
  color?: TThemeColor;
  background?: string;
  darknessTheme?: TDarkness;
  darknessNegativeTheme?: TDarkness;
  darknessColor?: TDarkness;
  buttons?: boolean;
  showLabel?: boolean;
  colorAsTheme?: boolean;
  fontSize?: string;
  textBold?: boolean;
  textBefore?: string;
  textAfter?: string;
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
  closeIcon?: TIcon;
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
  closeIcon?: TIcon;
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

export interface ICropperProps {
  size?: TSize;
}

export interface IColorPickerProps {
  size?: TSize;
  disabled?: boolean;
  buttonProps?: IButtonProps;
  sameButtonColor?: boolean;
}

export interface ISelectProps {
  options?: ISelectOption[];
  groups?: ISelectGroup[];
  selected?: string;
  width?: string;
  placeholder?: string;
  openIcon?: TIcon;
  size?: TSize;
  fontSize?: string;
  name?: string;
  theme?: TThemeColor;
  placeholderColor?: TThemeColor;
  openIconColor?: TThemeColor;
  darknessTheme?: TDarkness;
  darknessOpenIcon?: TDarkness;
  filtered?: boolean;
  disabled?: boolean;
  noHighlight?: boolean;
  noBorder?: boolean;
  noSelectedBackground?: boolean;
  noBackground?: boolean;
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
  padding?: string;
  iconOnly?: boolean;
  theme?: TThemeColor;
  textColor?: TThemeColor;
  darknessTheme?: TDarkness;
  darknessTextColor?: TDarkness;
}

export interface IProgressBarProps {
  value?: number;
  max?: number;
  width?: string;
  height?: string;
  size?: TSize;
  fontSize?: string;
  colorGaps?: IColorGap[];
  colorInactiveGaps?: IColorGap[];
  theme?: TThemeColor;
  inactiveTheme?: TThemeColor;
  darknessTheme?: TDarkness;
  darknessInactiveTheme?: TDarkness;
  gradient?: string[];
  showLabel?: boolean;
  labelBefore?: string;
  labelAfter?: string;
  noBorder?: boolean;
}

export interface IRatingProps {
  value?: number;
  count?: number;
  size?: TSize;
  gap?: string;
  theme?: TThemeColor;
  offTheme?: TThemeColor;
  darknessTheme?: TDarkness;
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
  iconLeft?: TIcon;
  iconRight?: TIcon;
  theme?: TThemeColor;
  background?: TThemeColor;
  border?: TThemeColor;
  darknessTheme?: TDarkness;
  darknessBackground?: TDarkness;
  darknessBorder?: TDarkness;
}

export interface ICheckboxProps {
  active?: boolean;
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
