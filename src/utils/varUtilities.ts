import { makeVar } from '@apollo/client';
import { getUserItemQuery_GetUser_inventory } from '../profile/__generated__/getUserItemQuery';

export const checkedItemsVar = makeVar<getUserItemQuery_GetUser_inventory[]>([]);

export function getVarItems() {
  return checkedItemsVar();
}

export function putItemInVar(item: getUserItemQuery_GetUser_inventory) {
  checkedItemsVar([...checkedItemsVar(), item]);
}

export function removeItemFromVar(item: getUserItemQuery_GetUser_inventory) {
  var items = checkedItemsVar();
  const index = items.indexOf(item);
  if (index != null) {
    items.splice(index, 1);
  }
  checkedItemsVar([...items]);
}
