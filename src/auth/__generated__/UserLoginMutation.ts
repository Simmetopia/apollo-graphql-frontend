/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UserLoginMutation
// ====================================================

export interface UserLoginMutation_userLogin {
  __typename: "User";
  id: string;
  username: string;
}

export interface UserLoginMutation {
  userLogin: UserLoginMutation_userLogin | null;
}

export interface UserLoginMutationVariables {
  username: string;
}
