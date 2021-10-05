/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserCartQuery
// ====================================================

export interface UserCartQuery_userCart_SaberPart {
  __typename: "SaberPart";
  name: string;
}

export interface UserCartQuery_userCart_PartName {
  __typename: "PartName";
  name: string;
}

export interface UserCartQuery_userCart {
  __typename: "Item";
  userId: string | null;
  SaberPart: UserCartQuery_userCart_SaberPart | null;
  PartName: UserCartQuery_userCart_PartName | null;
  partDescription: string | null;
  price: number | null;
}

export interface UserCartQuery {
  userCart: UserCartQuery_userCart[];
}

export interface UserCartQueryVariables {
  userId: string;
}
