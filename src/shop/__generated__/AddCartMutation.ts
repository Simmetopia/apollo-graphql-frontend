/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddCartMutation
// ====================================================

export interface AddCartMutation_addToCart {
  __typename: "Item";
  id: string;
}

export interface AddCartMutation {
  addToCart: AddCartMutation_addToCart;
}

export interface AddCartMutationVariables {
  itemId: string;
}
