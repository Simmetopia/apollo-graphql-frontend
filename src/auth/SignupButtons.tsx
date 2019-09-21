import React, { FC } from "react";
import { gql } from "apollo-boost";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { Button } from "@material-ui/core";

const create_user_mutation = gql`
  mutation CreateUser($username: String!) {
    signup(data: { username: $username }) {
      id
      username
    }
  }
`;

const login_user_mutation = gql`
  mutation LoginUser($username: String!) {
    login(data: { username: $username }) {
      id
      username
    }
  }
`;

type AuthProps = { username: string };

export const CreateUserButton: FC<AuthProps> = ({ username }) => {
  const client = useApolloClient();
  const [create_user] = useMutation(create_user_mutation, {
    onCompleted: data => {
      client.writeData({ data: { localUser: data.signup } });
    },
    onError: e => {
      if (e.message.match(/already/)) {
        alert("User with this username already exists");
      }
    }
  });
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => create_user({ variables: { username } })}
    >
      Create new user
    </Button>
  );
};

export const LoginAsUser: FC<AuthProps> = ({ username }) => {
  const client = useApolloClient();
  const [login_user] = useMutation(login_user_mutation, {
    onCompleted: data => {
      client.writeData({ data: { localUser: data.login } });
    },
    onError: e => {
      if (e.message.match(/does not/)) {
        alert("Unkown user");
      }
    }
  });

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => login_user({ variables: { username } })}
    >
      Login
    </Button>
  );
};
