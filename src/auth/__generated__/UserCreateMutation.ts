/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UserCreateMutation
// ====================================================

export interface UserCreateMutation_userCreate {
  __typename: "Login";
  username: string | null;
  token: string | null;
  id: string | null;
}

export interface UserCreateMutation {
  userCreate: UserCreateMutation_userCreate;
}

export interface UserCreateMutationVariables {
  username: string;
  password: string;
}
