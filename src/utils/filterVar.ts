import { makeVar } from '@apollo/client';

export const filterItemsVar = makeVar<string>('None');

export function getFilterValue(filter: string): string {
  if (filter.toLowerCase() === 'none') {
    return '';
  } else {
    return filter;
  }
}
