import { FC, useEffect } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import gql from 'graphql-tag';
import { userLoginQuery, userLoginQueryVariables } from './__generated__/userLoginQuery';
import { UserCreateMutation, UserCreateMutationVariables } from './__generated__/UserCreateMutation';
import { useSWLazyQuery } from '../utils/useSWLazyQuery';
import { useSWMutaion } from '../utils/useSWMutation';
import { useLocalData } from '../useLocalData';

type AuthProps = { username: string };

export const userCreateMutation = gql`
  mutation UserCreateMutation($username: String!) {
    userCreate(input: { username: $username }) {
      id
      username
    }
  }
`;

export const UserLoginQuery = gql`
  query userLoginQuery($username: String!) {
    GetUserByUsername(input: { username: $username }) {
      id
      username
    }
  }
`;

export const CreateUserButton: FC<AuthProps> = ({ username }) => {
  const [userCreate, { loading }] = useSWMutaion<UserCreateMutation, UserCreateMutationVariables>(
    userCreateMutation,
  );

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => userCreate({ variables: { username } })}>
        Create new user
      </Button>
    </div>
  );
};

export const LoginAsUser: FC<AuthProps> = ({ username }) => {
  const [userLoginQuery, { data, loading }] = useSWLazyQuery<userLoginQuery, userLoginQueryVariables>(UserLoginQuery, {
    variables: { username },
  });

  const [_, setData] = useLocalData();

  useEffect(() => {
    if (!data) return;
    setData({ name: data.GetUserByUsername?.username, id: data.GetUserByUsername?.id });
  }, [data]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Button variant="contained" color="primary" onClick={() => userLoginQuery({ variables: { username } })}>
      Login
    </Button>
  );
};
