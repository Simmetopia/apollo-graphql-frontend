/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ShowUserDetails
// ====================================================

export interface ShowUserDetails_userDetails {
  __typename: "User";
  id: string;
  username: string;
  money: number;
}

export interface ShowUserDetails {
  userDetails: ShowUserDetails_userDetails | null;
}

export interface ShowUserDetailsVariables {
  userId: string;
}
