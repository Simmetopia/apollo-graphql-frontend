import { FC, useEffect } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import gql from 'graphql-tag';
import { UserCreateMutation, UserCreateMutationVariables } from './__generated__/UserCreateMutation'
import { UserLoginMutation, UserLoginMutationVariables } from './__generated__/UserLoginMutation'
import { useSWMutation } from '../utils/useSWMutation';
import { useLocalData } from '../useLocalData';

type AuthProps = { username: string, password: string };

const userCreateMutation = gql`
  mutation UserCreateMutation($username: String!, $password: String!) {
    userCreate(username: $username, password: $password) {
      username
      token
      id
    }
  }
`

export const userLoginMutation = gql`
  mutation UserLoginMutation($username: String!, $password: String!) {
    userLogin(username: $username, password: $password) {
      username
      token
      id
    }
  } 
`

export const CreateUserButton: FC<AuthProps> = ({ username, password }) => {
  const [userCreate, { data, loading }] = useSWMutation<UserCreateMutation, UserCreateMutationVariables>(userCreateMutation);
  const [_, setData] = useLocalData();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  useEffect(() => {
    if (!data) return;

    sessionStorage.setItem("token", data.userCreate.token!)
    setData({ name: data.userCreate.username!, id: data.userCreate.id! });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  if (loading) {
    return <CircularProgress />
  }

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => userCreate({ variables: { username, password } })}>
        Create new user
      </Button>
    </>
  );
};

export const LoginAsUser: FC<AuthProps> = ({ username, password }) => {
  const [userLogin, { data, loading }] = useSWMutation<UserLoginMutation, UserLoginMutationVariables>(userLoginMutation);
  const [_, setData] = useLocalData();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  useEffect(() => {
    if (!data) return

    sessionStorage.setItem("token", data.userLogin.token!)
    setData({ name: data.userLogin.username!, id: data.userLogin.id! });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  if (loading) {
    return <CircularProgress />
  }

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => { userLogin({ variables: { username, password },  }) }}>
        Login
      </Button>
    </>
  );
};
