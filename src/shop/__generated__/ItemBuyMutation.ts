/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ItemBuyMutation
// ====================================================

export interface ItemBuyMutation_itemBuy {
  __typename: "Item";
  id: string;
}

export interface ItemBuyMutation {
  itemBuy: ItemBuyMutation_itemBuy | null;
}

export interface ItemBuyMutationVariables {
  userBuyerId: string;
  itemId: string;
}
