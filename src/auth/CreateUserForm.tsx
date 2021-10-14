import React, { FC, useEffect, useState } from 'react';
import { LoginAsUser, CreateUserButton } from './SignupButtons';
import { TextField, Grid, CircularProgress } from '@material-ui/core';
import { useSWMutation } from '../utils/useSWMutation';
import { UserLoginMutation, UserLoginMutationVariables } from './__generated__/UserLoginMutation';
import { useLocalData } from '../useLocalData';
import { userLoginMutation } from './SignupButtons'

export const CreateUserForm: FC = () => {
  const [userLogin, { data, loading }] = useSWMutation<UserLoginMutation, UserLoginMutationVariables>(userLoginMutation);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setData] = useLocalData();


  useEffect(() => {
    if (!data) return

    sessionStorage.setItem("token", data.userLogin.token!)
    setData({ name: data.userLogin?.username!, id: data.userLogin?.id! });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  if (loading) {
    return <CircularProgress />
  }

  const handleKeyPress = (e: { key: string; }) => {
    if (e.key === "Enter") {
      userLogin({ variables: { username, password } })    }
  };

  return (
    <Grid container direction="column" spacing={2}>
      <TextField
        inputProps={{ style: { color: '#fff' } }}
        variant="outlined"
        color="secondary"
        placeholder={'Username'}
        onChange={e => {
          setUsername(e.target.value);
        }}
        autoFocus
        value={username}
        onKeyPress={handleKeyPress}
      />
      <TextField
        inputProps={{ style: { color: '#fff' } }}
        variant="outlined"
        color="secondary"
        placeholder={'Password'}
        onChange={e => {
          setPassword(e.target.value);
        }}
        value={password}
        onKeyPress={handleKeyPress}
      />
      <Grid item>
        <Grid container spacing={1}>
          <Grid item>
            <LoginAsUser username={username} password={password} />
          </Grid>
          <Grid item>
            <CreateUserButton username={username} password={password} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
