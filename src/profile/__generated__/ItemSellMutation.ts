/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ItemSellMutation
// ====================================================

export interface ItemSellMutation_itemSell {
  __typename: "Item";
  id: string;
}

export interface ItemSellMutation {
  itemSell: ItemSellMutation_itemSell | null;
}

export interface ItemSellMutationVariables {
  userSellerId: string;
  itemId: string;
}
