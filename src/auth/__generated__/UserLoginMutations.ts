/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UserLoginMutations
// ====================================================

export interface UserLoginMutations_userLogin {
  __typename: "User";
  id: string;
  username: string;
}

export interface UserLoginMutations {
  userLogin: UserLoginMutations_userLogin | null;
}

export interface UserLoginMutationsVariables {
  username: string;
}
