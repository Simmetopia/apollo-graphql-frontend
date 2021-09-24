/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ItemCreateMutation
// ====================================================

export interface ItemCreateMutation_itemCreate {
  __typename: "Item";
  id: string;
  userId: string | null;
  saberPart: string | null;
  partName: string | null;
}

export interface ItemCreateMutation {
  itemCreate: ItemCreateMutation_itemCreate | null;
}

export interface ItemCreateMutationVariables {
  userId: string;
}
