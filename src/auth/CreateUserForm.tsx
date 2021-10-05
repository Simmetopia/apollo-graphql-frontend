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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setData] = useLocalData();


  useEffect(() => {
    if (!data) return

    setData({ name: data.userLogin?.username, id: data.userLogin?.id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  if (loading) {
    return <CircularProgress />
  }

  const handleKeyPress = (e: { key: string; }) => {
    if (e.key === "Enter") {
      handleTrack();
    }
  };

  function handleTrack() {
    userLogin({ variables: { username } })
  }

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
      <Grid item>
        <Grid container spacing={1}>
          <Grid item>
            <LoginAsUser username={username} />
          </Grid>
          <Grid item>
            <CreateUserButton username={username} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
