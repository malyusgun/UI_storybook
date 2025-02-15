import type { TInputDivScheme } from '@interfaces/componentsProp';

export const changeInputHandler = (
  target: any,
  container: HTMLElement,
  inputPartsBy: boolean,
  valueParts: string[],
  indexesToValueIndex: Record<string, number>,
  itemIndex: number,
  inputIndex: number,
  backspace: boolean,
) => {
  let currentInput: HTMLInputElement | null = null;
  let currentItem: HTMLElement | null = null;
  let currentItemIndex: number | null;
  const list = Array.from(container?.children[inputPartsBy ? 0 : 1].children);

  cycle: for (let i = 0; i < list.length; i++) {
    const item = list[i];
    if (!item.classList.contains(String(itemIndex))) continue;
    for (const child of item.children) {
      if (child.classList.contains(String(inputIndex))) {
        currentInput = child as HTMLInputElement;
        currentItem = item as HTMLElement;
        currentItemIndex = i;
        break cycle;
      }
    }
  }
  // если значение ввели
  if (currentInput?.value && currentItem) {
    const valueIndex = indexesToValueIndex[
      (itemIndex + '-' + inputIndex) as keyof typeof indexesToValueIndex
    ] as number;
    if (target.value.length === 2) {
      currentInput!.value = target.value[0] === valueParts[valueIndex] ? target.value[1] : target.value[0];
    }
    valueParts[valueIndex] = currentInput!.value;
    // поиск следующего инпута в той же части (если есть)
    let nextInputInSameItem: HTMLInputElement | null = null;
    for (const child of currentItem.children) {
      if (child.classList.contains(String(inputIndex + 1))) {
        nextInputInSameItem = child as HTMLInputElement;
        break;
      }
    }
    if (nextInputInSameItem) {
      nextInputInSameItem.focus();
    } else {
      // обработка следующей части, если она есть, иначе ничего не делать (или оставить старое значение, что ещё лучше)
      currentItem = list?.[currentItemIndex! + 1] as HTMLElement | null;
      if (currentItem) {
        const targetInput = Array.from(currentItem.children)[0] as HTMLInputElement;
        targetInput.focus();
      }
    }
  } else if (backspace && currentItem) {
    // если значение удалили
    let prevInputInSameItem: HTMLInputElement | null = null;
    for (const child of currentItem.children) {
      if (child.classList.contains(String(inputIndex - 1))) {
        prevInputInSameItem = child as HTMLInputElement;
        break;
      }
    }
    if (prevInputInSameItem) {
      prevInputInSameItem.focus();
    } else {
      // обработка предыдущей части, если она есть, иначе ничего не делать
      currentItem = list?.[currentItemIndex! - 1] as HTMLElement | null;
      if (currentItem) {
        const children = Array.from(currentItem.children);
        const targetInput = children[children.length - 1] as HTMLInputElement;
        targetInput.focus();
      }
    }
  }
  return valueParts;
};

export const moveFocus = (
  direction: 'left' | 'right',
  container: HTMLElement,
  inputPartsBy: boolean,
  itemIndex: number,
  inputIndex: number,
) => {
  let currentItem: HTMLElement | null;
  let currentItemIndex: number | null;
  let currentInputIndex: number | null;
  const list = Array.from(container?.children[inputPartsBy ? 0 : 1].children);

  cycle: for (let i = 0; i < list.length; i++) {
    const item = list[i];
    if (!item.classList.contains(String(itemIndex))) continue;
    const itemChildren = Array.from(item.children);

    for (let j = 0; j < itemChildren.length; j++) {
      if (itemChildren[j].classList.contains(String(inputIndex))) {
        currentItem = item as HTMLElement;
        currentItemIndex = i;
        currentInputIndex = j;
        break cycle;
      }
    }
  }

  if (direction === 'left') {
    let targetInput = [...currentItem!.children][currentInputIndex! - 1] as HTMLInputElement | null;
    if (targetInput) {
      targetInput.focus();
      return;
    }
    currentItem = list?.[currentItemIndex! - 1] as HTMLElement | null;
    if (currentItem) {
      const itemChildren = [...currentItem.children];
      targetInput = itemChildren[itemChildren.length - 1] as HTMLInputElement;
      targetInput.focus();
    }
  } else {
    let targetInput = [...currentItem!.children][currentInputIndex! + 1] as HTMLInputElement | null;
    if (targetInput) {
      targetInput.focus();
      return;
    }
    currentItem = list?.[currentItemIndex! + 1] as HTMLElement | null;
    if (currentItem) {
      targetInput = [...currentItem.children][0] as HTMLInputElement;
      targetInput.focus();
    }
  }
};

export const calcPartsBy = (scheme: TInputDivScheme) => {
  if (!scheme.includes('by')) return null;
  const splat = scheme.split('by');
  const by = splat[1];
  const result = [];
  for (let i = 0; i < +splat[0]; i++) {
    const arrayToPush = [];
    for (let j = 0; j < +by; j++) {
      arrayToPush.push(j);
    }
    result.push(arrayToPush);
  }
  return result;
};
export const calcPartsDash = (scheme: TInputDivScheme) => {
  if (!scheme.includes('-')) return null;
  const splat = scheme.split('-');
  const result = [];
  for (let i = 0; i < splat.length; i++) {
    const item = splat[i];
    const arrayToPush = [];
    for (let j = 0; j < +item; j++) {
      arrayToPush.push(j);
    }
    result.push(arrayToPush);
  }
  return result;
};
