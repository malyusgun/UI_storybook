import { EThemeColor, type TDarkness, type TSize, type TThemeColor } from '@interfaces/common';
import {
  convert100ThemeToColor,
  convert200ThemeToColor,
  convert300ThemeToColor,
  convert400ThemeToColor,
  convert500ThemeToColor,
  convert600ThemeToColor,
  convert700ThemeToColor,
  convert800ThemeToColor,
  convert900ThemeToColor,
} from '@helpers/colors';

/**
 * Convert color of type TThemeColor to hex
 */
export const convertThemeToColor = (theme: TThemeColor, darkness: TDarkness | string = '500'): string => {
  if (!(theme in EThemeColor)) return theme;
  if (darkness === '500') return convert500ThemeToColor(theme);
  if (darkness === '100') return convert100ThemeToColor(theme);
  if (darkness === '200') return convert200ThemeToColor(theme);
  if (darkness === '300') return convert300ThemeToColor(theme);
  if (darkness === '400') return convert400ThemeToColor(theme);
  if (darkness === '600') return convert600ThemeToColor(theme);
  if (darkness === '700') return convert700ThemeToColor(theme);
  if (darkness === '800') return convert800ThemeToColor(theme);
  if (darkness === '900') return convert900ThemeToColor(theme);
  return convert500ThemeToColor(theme);
};
/**
 * Convert color of type TThemeColor to black or white
 */
export const convertThemeToTextColor = (theme: TThemeColor, darkness: TDarkness | string = '500') => {
  if (theme === 'white' || (darkness <= '600' && theme !== 'black')) return '#000000';
  return '#ffffff';
};
/**
 * Convert color of type TThemeColor to shade of black or white
 */
export const convertWhiteOrBlackToColor = (theme: 'white' | 'black', darkness: TDarkness): string => {
  if (theme === 'white') {
    if (darkness === '500' || darkness === '400' || darkness === '600') return '#94a3b8';
    if (darkness === '300' || darkness === '700') return '#cbd5e1';
    if (darkness === '200' || darkness === '800') return '#f1f5f9';
    if (darkness === '100' || darkness === '900') return '#e2e8f0';
  }
  if (darkness === '500' || darkness === '400' || darkness === '600') return '#4b5563';
  if (darkness === '300' || darkness === '700') return '#374151';
  if (darkness === '200' || darkness === '800') return '#1f2937';
  if (darkness === '100' || darkness === '900') return '#111827';
  return '#4b5563';
};
/**
 * Convert color of type TThemeColor to hex for border or scroll
 */
export const convertThemeToSecondaryColor = (theme: TThemeColor, darkness: TDarkness | string = '500') => {
  return theme === 'white' || theme === 'black'
    ? convertWhiteOrBlackToColor(theme, darkness as TDarkness)
    : convertThemeToColor(theme, String(100 + ((+darkness + 600) % 900)));
};

export const getValueFromSize = (size: TSize, options: string[] | number[]) => {
  if (size === 'normal') return options[1];
  if (size === 'large') return options[2];
  if (size === 'huge') return options[3];
  return options[0];
};
