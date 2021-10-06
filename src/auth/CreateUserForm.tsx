import { FC, useEffect, useState } from 'react';
import { LoginAsUser, CreateUserButton } from './SignupButtons';
import { TextField, Grid } from '@material-ui/core';
import { userLoginQuery, userLoginQueryVariables } from './__generated__/userLoginQuery';
import { UserLoginQuery } from './SignupButtons';
import { useSWLazyQuery } from '../utils/useSWLazyQuery';
import { useLocalData } from '../useLocalData';

export const CreateUserForm: FC = () => {
  const [username, setUsername] = useState('');
  const [_, setData] = useLocalData();

  const [userLoginQuery, { data }] = useSWLazyQuery<userLoginQuery, userLoginQueryVariables>(UserLoginQuery, {
    variables: { username },
  });

  useEffect(() => {
    if (!data) return;
    setData({ name: data.GetUserByUsername?.username, id: data.GetUserByUsername?.id });
  }, [data]);

  const handleKeyPress = (e: { key: string }) => {
    if (e.key === 'Enter') {
      userLoginQuery({ variables: { username } });
    }
  };
  return (
    <Grid container direction="column" spacing={2}>
      <TextField
        inputProps={{ style: { color: '#fff' } }}
        variant="outlined"
        color="secondary"
        placeholder={'username'}
        onChange={(e) => setUsername(e.target.value)}
        autoFocus
        onKeyDown={handleKeyPress}
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
