import { FC, useEffect, useState } from 'react';
import { Button, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { TextField, Grid } from '@material-ui/core';
import gql from 'graphql-tag';
import { useSWMutaion } from '../utils/useSWMutation';
import {
  userDetailsUpdateMutation,
  userDetailsUpdateMutationVariables,
} from './__generated__/userDetailsUpdateMutation';

import { userDetailsquery } from './ProfileRoot';
import { useLocalData } from '../useLocalData';

const useStyles = makeStyles<Theme>((theme) => ({
  spacer: { marginTop: theme.spacing(5) },
}));

export const userDetailsUpdate = gql`
  mutation userDetailsUpdateMutation($id: ID!, $firstName: String!, $lastName: String!) {
    userDetailsUpdate(input: { user: { id: $id }, firstName: $firstName, lastName: $lastName }) {
      firstName
      lastName
    }
  }
`;

export const EditUserDetails: FC<{ userId: string }> = ({ userId }) => {
  const [{ id }] = useLocalData();
  const [userUpdate, { data }] = useSWMutaion<userDetailsUpdateMutation, userDetailsUpdateMutationVariables>(
    userDetailsUpdate,
    { refetchQueries: [{ query: userDetailsquery, variables: { id: id } }] },
  );
  const classes = useStyles();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  return (
    <>
      <Grid className={classes.spacer} container direction="row" spacing={2}>
        <TextField
          inputProps={{ style: { color: '#fff' } }}
          variant="outlined"
          color="secondary"
          placeholder={'First name'}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          inputProps={{ style: { color: '#fff' } }}
          variant="outlined"
          color="secondary"
          placeholder={'Last name'}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          disabled={false}
          onClick={() => userUpdate({ variables: { id: userId, firstName: firstName, lastName: lastName } })}
        >
          Edit User
        </Button>
      </Grid>
    </>
  );
};
export default EditUserDetails;
