import type { TDarkness, TThemeColor } from '@interfaces/common';
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
  convertWhiteOrBlackToColor,
} from '@helpers/colors';

/**
 * Convert color of type TThemeColor to hex
 */
export const convertThemeToColor = (theme: TThemeColor, darkness: TDarkness | string = '500'): string => {
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
 * Convert color of type TThemeColor to hex for border or scroll
 */
export const convertThemeToSecondaryColor = (theme: TThemeColor, darkness: TDarkness | string = '500') => {
  return theme === 'white' || theme === 'black'
    ? convertWhiteOrBlackToColor(theme, darkness)
    : convertThemeToColor(theme, String(100 + ((darkness + 600) % 900)));
};

export const convertThemeToTextColor = (theme: TThemeColor, darkness: TDarkness | string = '500') => {
  if (theme === 'white' || (darkness <= '600' && theme !== 'black')) return '#000000';
  return '#ffffff';
};
