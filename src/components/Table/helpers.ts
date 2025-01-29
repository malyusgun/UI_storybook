import type { ITableColumn, TTableColumnType } from '@interfaces/componentsProp';
import type { TSize } from '@interfaces/common';
import type { ICheckboxProps, ISelectProps } from '@interfaces/componentsProps';

export const calcRows = (
  initRows: unknown[][] | undefined,
  currentPage: number,
  itemsPerPage: number,
  sortStateActive: [number, string] | [],
  multipleSort: boolean,
  indexColumnToFilter: number,
  columnToSortType: TTableColumnType,
  filterValue: string,
  isRegisterSensitive: boolean,
) => {
  if (!initRows?.length) return [];
  // ['up', 'down', ...]
  let rows = [...initRows];
  if (filterValue) {
    rows = rows.filter((row) => {
      const item = isRegisterSensitive ? row[indexColumnToFilter] : (row[indexColumnToFilter] as string).toLowerCase();
      return (item as string).startsWith(isRegisterSensitive ? filterValue : filterValue.toLowerCase());
    });
  }

  if (!sortStateActive.length) return rows.splice(itemsPerPage * (currentPage - 1), itemsPerPage);

  if (multipleSort) {
    // TODO: multiple sort logic
    // let indexColumn = sortState.value.findIndex((state) => state && state !== 'none');
    // let lastColumnIndexSorted = indexColumn;
    // console.log('indexColumn: ', indexColumn);
    // for (const sortItem of sortStateActive.value) {
    //   rows.sort((a, b) =>
    //     sortItem.split('$')[1] === 'down'
    //       ? a[indexColumn].value.localeCompare(b[indexColumn].value)
    //       : b[indexColumn].value.localeCompare(a[indexColumn].value),
    //   );
    //   indexColumn = sortState.value.findIndex(
    //     (state, index) => state && state !== 'none' && index !== lastColumnIndexSorted,
    //   );
    //   lastColumnIndexSorted = indexColumn;
    // }
    return rows;
  } else {
    const index = sortStateActive[0];
    const value = sortStateActive[1];
    if (~['text', 'select'].indexOf(columnToSortType))
      return rows
        .sort((a, b) => {
          if (typeof a[index] === 'string' && typeof b[index] === 'string')
            return value === 'down' ? a[index].localeCompare(b[index]) : b[index].localeCompare(a[index]);
          return 0;
        })
        .splice(itemsPerPage * (currentPage - 1), itemsPerPage);
    // 'number', 'checkbox', 'rating', 'progressBar', 'knob'
    return (rows as number[][])
      .sort((a, b) => (value === 'down' ? +a[index] - +b[index] : +b[index] - +a[index]))
      .splice(itemsPerPage * (currentPage - 1), itemsPerPage);
  }
};

export const calcGap = (gap: string, fontSize: string) =>
  gap ??
  (!fontSize || isNaN(+fontSize.slice(0, -3)) || parseInt(fontSize) < 20
    ? '5px'
    : parseInt(fontSize) < 36
      ? '10px'
      : '15px');

export const calcAdditionalHeight = (size: TSize, fontSize: string) => {
  if (size === 'normal') return '0px';

  const isTwoLetters = isFinite(+fontSize[fontSize.length - 3]!);
  const value = isTwoLetters ? fontSize.slice(0, -2) : fontSize.slice(0, -3);
  const unit = isTwoLetters ? fontSize.slice(-2) : fontSize.slice(-3);

  if (size === 'large') return +value / 2 + unit;
  if (size === 'huge') return value + unit;
  return -+value / 4 + unit;
};

export const calcColumnPadding = (column: ITableColumn, center: boolean, gap: string) =>
  center ? `0px calc(${gap} / 2 + ${column.padding ?? '0px'} / 2)` : `0 ${column.padding ?? '0px'} 0 0`;

export const filterCheckboxProps = (props: ICheckboxProps | undefined) => {
  if (!props) return null;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { active, ...res } = props;
  return res;
};

export const filterSelectProps = (props: ISelectProps | undefined) => {
  if (!props || !props.options)
    return {
      options: [{ value: 'One' }, { value: 'Two' }],
    };
  return props;
};
