/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ItemDisplayShopQuery
// ====================================================

export interface ItemDisplayShopQuery_displayShopItems {
  __typename: "Item";
  saberPart: string | null;
  partName: string | null;
  id: string;
  userId: string | null;
}

export interface ItemDisplayShopQuery {
  displayShopItems: ItemDisplayShopQuery_displayShopItems[];
}
