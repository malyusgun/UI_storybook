import type { ITableColumn, ITableItem, TTableColumnType } from '@interfaces/componentsProp';
import type { TSize } from '@interfaces/common';

export const calcRows = (
  initRows: ITableItem[][] | undefined,
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
    console.log('oh...');
    rows = rows.filter((row) => {
      const item = isRegisterSensitive ? row[indexColumnToFilter].value : row[indexColumnToFilter].value.toLowerCase();
      return item.startsWith(isRegisterSensitive ? filterValue : filterValue.toLowerCase());
    });
  }

  if (!sortStateActive.length) return rows;

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
    console.log(value, index, columnToSortType);
    if (columnToSortType === 'number')
      return rows.sort((a, b) =>
        value === 'down' ? +a[index].value - +b[index].value : +b[index].value - +a[index].value,
      );
    return rows.sort((a, b) =>
      value === 'down' ? a[index].value.localeCompare(b[index].value) : b[index].value.localeCompare(a[index].value),
    );
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
