/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ItemFilterQuery
// ====================================================

export interface ItemFilterQuery_filterItems_SaberPart {
  __typename: "SaberPart";
  name: string;
}

export interface ItemFilterQuery_filterItems_PartName {
  __typename: "PartName";
  name: string;
}

export interface ItemFilterQuery_filterItems_User {
  __typename: "User";
  username: string;
}

export interface ItemFilterQuery_filterItems_carts {
  __typename: "User";
  id: string;
}

export interface ItemFilterQuery_filterItems {
  __typename: "Item";
  id: string;
  userId: string | null;
  SaberPart: ItemFilterQuery_filterItems_SaberPart | null;
  PartName: ItemFilterQuery_filterItems_PartName | null;
  partDescription: string | null;
  price: number | null;
  User: ItemFilterQuery_filterItems_User | null;
  carts: ItemFilterQuery_filterItems_carts[];
}

export interface ItemFilterQuery {
  filterItems: ItemFilterQuery_filterItems[];
}

export interface ItemFilterQueryVariables {
  saberPart: string;
}
