/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ItemCreateMutation
// ====================================================

export interface ItemCreateMutation_itemCreate_SaberPart {
  __typename: "SaberPart";
  name: string;
}

export interface ItemCreateMutation_itemCreate_PartName {
  __typename: "PartName";
  name: string;
}

export interface ItemCreateMutation_itemCreate {
  __typename: "Item";
  id: string;
  userId: string | null;
  SaberPart: ItemCreateMutation_itemCreate_SaberPart | null;
  PartName: ItemCreateMutation_itemCreate_PartName | null;
  partDescription: string | null;
  price: number | null;
}

export interface ItemCreateMutation {
  itemCreate: ItemCreateMutation_itemCreate | null;
}
