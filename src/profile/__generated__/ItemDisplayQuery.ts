/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ItemDisplayQuery
// ====================================================

export interface ItemDisplayQuery_displayItems {
  __typename: "Item";
  id: string;
  userId: string | null;
  saberPart: string | null;
  partName: string | null;
}

export interface ItemDisplayQuery {
  displayItems: ItemDisplayQuery_displayItems[];
}

export interface ItemDisplayQueryVariables {
  userId: string;
}
