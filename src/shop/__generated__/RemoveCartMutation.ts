/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveCartMutation
// ====================================================

export interface RemoveCartMutation_removeFromCart {
  __typename: "Item";
  id: string;
}

export interface RemoveCartMutation {
  removeFromCart: RemoveCartMutation_removeFromCart;
}

export interface RemoveCartMutationVariables {
  userId: string;
  itemId: string;
}
