import React, { FC, useState } from 'react';
import { LoginAsUser, CreateUserButton } from './auth/SignupButtons';
import { TextField, Grid } from '@material-ui/core';

export const CreateUserForm: FC = () => {
  const [username, setUsername] = useState('');
  return (
    <Grid container direction="column" spacing={2}>
      <TextField
        inputProps={{ style: { color: '#fff' } }}
        variant="outlined"
        color="secondary"
        placeholder={'username'}
        onChange={e => setUsername(e.target.value)}
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
