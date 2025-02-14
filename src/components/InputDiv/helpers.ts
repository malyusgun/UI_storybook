import type { TInputDivScheme } from '@interfaces/componentsProp';

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
