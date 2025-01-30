export const getNewValue = (
  action: '+' | '-',
  current: number,
  itemsLength: number,
  perScroll: number,
  perView: number,
): number => {
  const additional = perView - 1;
  if (action === '+') {
    if (current + additional === itemsLength) return 1;
    if (current + perScroll >= itemsLength) return itemsLength - additional;
    return current + perScroll;
  }
  if (current === 1) return itemsLength - additional;
  if (current - perScroll < 1) return 1;
  return current - perScroll;
};

export const defaultProps = [
  {
    header: 'Element №1',
    text: 'This is the first element.',
  },
  {
    header: 'Element №2',
    text: 'Oh...one more!',
  },
  {
    header: 'Element №3',
    text: 'I feel sick.....',
  },
];
