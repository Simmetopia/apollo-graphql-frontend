/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UserLoginMutation
// ====================================================

export interface UserLoginMutation_userLogin {
  __typename: "Login";
  username: string | null;
  token: string | null;
  id: string | null;
}

export interface UserLoginMutation {
  userLogin: UserLoginMutation_userLogin;
}

export interface UserLoginMutationVariables {
  username: string;
  password: string;
}
