import React, { FC } from 'react';
import { Button } from '@material-ui/core';

type AuthProps = { username: string };

export const CreateUserButton: FC<AuthProps> = ({ username }) => {
  return (
    <Button variant="contained" color="primary" onClick={console.log}>
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
