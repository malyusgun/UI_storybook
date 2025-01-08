import type { ITableColumn, ITableItem } from '@interfaces/componentsProp';

export const calcRows = (
  initRows: ITableItem[][],
  sortStateActive: [number, string] | [],
  multipleSort: boolean,
  columnToFilter: number,
  filterValue: string,
) => {
  // ['up', 'down', ...]
  let rows = [...initRows];

  if (filterValue) {
    rows = rows.filter((row) => row[columnToFilter].value.startsWith(filterValue));
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
    return rows.sort((a, b) =>
      value === 'down' ? a[index].value.localeCompare(b[index].value) : b[index].value.localeCompare(a[index].value),
    );
  }
};

export const calcColumnPadding = (column: ITableColumn, center: boolean, gap: string) =>
  center ? `0px calc(${gap} / 2 + ${column.padding ?? '0px'} / 2)` : `0 ${column.padding ?? '0px'} 0 0`;
