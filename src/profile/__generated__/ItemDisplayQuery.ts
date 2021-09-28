/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ItemDisplayQuery
// ====================================================

export interface ItemDisplayQuery_displayItems_SaberPart {
  __typename: "SaberPart";
  name: string;
}

export interface ItemDisplayQuery_displayItems_PartName {
  __typename: "PartName";
  name: string;
}


export interface ItemDisplayQuery_displayItems {
  __typename: "Item";
  id: string;
  userId: string | null;
  SaberPart: ItemDisplayQuery_displayItems_SaberPart | null;
  PartName: ItemDisplayQuery_displayItems_PartName | null;
  partDescription: string | null;
  price: number | null;
}

export interface ItemDisplayQuery {
  displayItems: ItemDisplayQuery_displayItems[];
}

export interface ItemDisplayQueryVariables {
  userId: string;
}
