import { FC, useEffect } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import gql from 'graphql-tag';
import { useLocalData } from '../useLocalData';
import { UserCreateMutation, UserCreateMutationVariables } from './__generated__/UserCreateMutation'
import { UserLoginMutation, UserLoginMutationVariables } from './__generated__/UserLoginMutation'
import { useSWMutation } from '../utils/useSWMutation';

type AuthProps = { username: string };

const userCreateMutation = gql`
 mutation UserCreateMutation($username: String!) {
 userCreate(username: $username) {
   id
   username
 }} 
`

export const userLoginMutation = gql`
 mutation UserLoginMutation($username: String!) {
 userLogin(username: $username) {
   id
   username
 }} 
`

export const CreateUserButton: FC<AuthProps> = ({ username }) => {
  const [userCreate, { data, loading }] = useSWMutation<UserCreateMutation, UserCreateMutationVariables>(userCreateMutation);
  const [_, setData] = useLocalData();

  useEffect(() => {
    if (!data) return;

    setData({ name: data.userCreate?.username, id: data.userCreate?.id })

  }, [data])

  if (loading) {
    return <CircularProgress />
  }

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => userCreate({ variables: { username } })}>
        Create new user
      </Button>
    </>
  );
};

export const LoginAsUser: FC<AuthProps> = ({ username }) => {
  const [userLogin, { data, loading }] = useSWMutation<UserLoginMutation, UserLoginMutationVariables>(userLoginMutation);
  const [_, setData] = useLocalData();

  useEffect(() => {
    if (!data) return

    setData({ name: data.userLogin?.username, id: data.userLogin?.id });
  }, [data])

  if (loading) {
    return <CircularProgress />
  }

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => { userLogin({ variables: { username } }) }}>
        Login
      </Button>
    </>
  );
};
