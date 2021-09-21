import React, { FC } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

type AuthProps = { username: string };

const userCreateMutation = gql`
 mutation UserCreateMutation($username: String!) {
 userCreate(username: $username) {
   id
   username
 }} 
`

export const CreateUserButton: FC<AuthProps> = ({ username }) => {
  const [userCreate, {data, loading}] = useMutation(userCreateMutation);

  if(loading) {
    return <CircularProgress />
  }
  return (
    <Button variant="contained" color="primary" onClick={()=>userCreate({variables: {username}})}>
      Create new user
    </Button>
  );
};

export const LoginAsUser: FC<AuthProps> = ({ username }) => {

  return (
    <Button variant="contained" color="primary" onClick={console.log}>
      Login
    </Button>
  );
};
