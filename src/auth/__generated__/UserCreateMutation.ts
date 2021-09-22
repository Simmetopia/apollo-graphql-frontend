/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UserCreateMutation
// ====================================================

export interface UserCreateMutation_userCreate {
  __typename: "User";
  id: string;
  username: string;
}

export interface UserCreateMutation {
  userCreate: UserCreateMutation_userCreate | null;
}

export interface UserCreateMutationVariables {
  username: string;
}
