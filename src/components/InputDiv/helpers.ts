import type { TInputDivScheme } from '../../common/interfaces/componentsProp';

export const changeInputHandler = (
  target: any,
  container: HTMLElement,
  inputPartsBy: boolean,
  valueParts: string[],
  indexesToValueIndex: Record<string, number>,
  itemIndex: number,
  inputIndex: number,
  backspace: boolean,
  numbersOnly: boolean,
  regex: RegExp | null,
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

  const valueIndex = indexesToValueIndex[(itemIndex + '-' + inputIndex) as keyof typeof indexesToValueIndex] as number;
  // если значение ввели
  if (currentInput?.value && currentItem && !backspace) {
    const prevIndexValue = valueParts[valueIndex];
    if (target.value.length === 2) {
      currentInput!.value = target.value[0] === prevIndexValue ? target.value[1] : target.value[0];
    }
    if (numbersOnly && !currentInput!.value.match(/[0-9-]/)) {
      if (!valueParts[valueIndex]) {
        currentInput!.value = '';
      }
      return valueParts;
    }
    valueParts[valueIndex] = currentInput!.value;
    if (regex && !regex.test(valueParts.join(''))) {
      currentInput!.value = '';
      valueParts[valueIndex] = prevIndexValue ?? '';
      return valueParts;
    }
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
  } else if (backspace && currentItem && currentInput) {
    // если значение удалили
    let prevInputInSameItem: HTMLInputElement | null = null;
    for (const child of currentItem.children) {
      if (child.classList.contains(String(inputIndex - 1))) {
        prevInputInSameItem = child as HTMLInputElement;
        break;
      }
    }

    let deletedCurrentValue = false;
    if (currentInput.value) {
      valueParts[valueIndex] = '';
      currentInput.value = '';
      deletedCurrentValue = true;
    } else if (prevInputInSameItem) {
      valueParts[valueIndex - 1] = '';
      setTimeout(() => prevInputInSameItem.focus(), 0);
      prevInputInSameItem.value = '';
    }
    if (!prevInputInSameItem) {
      // обработка предыдущей части, если она есть, иначе ничего не делать
      const prevItem = list?.[currentItemIndex! - 1] as HTMLElement | null;
      if (prevItem) {
        const children = Array.from(prevItem.children);
        const targetInput = children[children.length - 1] as HTMLInputElement;
        setTimeout(() => targetInput.focus(), 0);
        if (!deletedCurrentValue) {
          targetInput.value = '';
          valueParts[valueIndex - 1] = '';
        }
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

export const calcIndexesToValueindex = (inputPartsBy: boolean, scheme: TInputDivScheme) => {
  const result = {};
  let index = 0;
  if (inputPartsBy) {
    const splat = scheme.split('by');
    for (const itemIndex of [...Array(+splat[0]).keys()]) {
      for (const inputIndex of [...Array(+splat[1]).keys()]) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        result[itemIndex + '-' + inputIndex] = index++;
      }
    }
  } else {
    const splat = scheme.split('-').map((i: string) => +i);
    for (const item of splat) {
      for (const inputIndex of [...Array(item).keys()]) {
        const itemIndex = splat.indexOf(item);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        result[itemIndex + '-' + inputIndex] = index++;
      }
    }
  }
  return result;
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
