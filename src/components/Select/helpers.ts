import type { TSize } from '@interfaces/common';
import type { ISelectGroup, ISelectOption } from '@interfaces/componentsProp';

export const getOptionsGroups = (options: ISelectOption[], groups: ISelectGroup[] | undefined, filter: string) => {
  if (!groups?.length) return [];
  const optionsWithGroup = options.filter(
    (option) =>
      option.group && (filter ? (option.label ?? option.value).toLowerCase().startsWith(filter.toLowerCase()) : true),
  );
  if (filter) groups = groups.filter((group) => optionsWithGroup.find((option) => option.group === group.name));
  for (const group of groups) {
    group.items = optionsWithGroup.filter((option) => option.group === group.name);
  }
  return groups;
};
export const calcFontSize = (size: TSize) => {
  if (size === 'normal') return '16px';
  if (size === 'large') return '20px';
  if (size === 'huge') return '24px';
  return '12px';
};
export const calcPadding = (size: TSize) => {
  if (size === 'normal') return '6px';
  if (size === 'large') return '10px';
  if (size === 'huge') return '14px';
  return '4px';
};
