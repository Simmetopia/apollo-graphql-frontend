import { makeVar } from '@apollo/client';

export const filterItemsVar = makeVar<string>('None');
export const filterPartVar = makeVar<string[]>(['None']);

export function getFilterValue(filter: string): string {
  if (filter.toLowerCase() === 'none') {
    return '';
  } else {
    return filter;
  }
}

export function getPartFilterVar() {
  return filterPartVar();
}

export function putFilterInVar(filter: string) {
  if (getPartFilterVar()[0] === 'None') {
    filterPartVar([filter]);
  } else {
    filterPartVar([...getPartFilterVar(), filter]);
  }
  console.log(getPartFilterVar());
}

export function removeFilterFromVar(filter: string) {
  var filterArray = getPartFilterVar();
  if (filterArray.length === 1) {
    filterPartVar(['None']);
  } else {
    const index = filterArray.indexOf(filter);
    if (index != null) {
      filterArray.splice(index, 1);
    }
    filterPartVar([...filterArray]);
  }
  console.log(getPartFilterVar());
}

export function clearPartFilter() {
  filterPartVar(['None']);
}
