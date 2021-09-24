import React, { FC, useEffect } from 'react';
import Typography from '@material-ui/core/Typography/Typography';

import Divider from '@material-ui/core/Divider/Divider';
import { UserItemList } from './UserItemList';
import { useLocalData } from '../useLocalData';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/client';
import { UserDetailsQuery, UserDetailsQueryVariables } from './__generated__/UserDetailsQuery';
import EditUserDetails from './EditUserDetails';

export const userDetailsquery = gql`
  query UserDetailsQuery($id: ID!) {
    GetUserDetails(input: { id: $id }) {
      firstName
      lastName
      user {
        username
      }
    }
  }
`;

export const ProfileRoot: FC = () => {
  const [{ id }] = useLocalData();
  if (!id) {
    return <div> something wong </div>;
  }
  return (
    <>
      <UserDetails userId={id} />
      <Typography variant="h6" align="center">
        Items
      </Typography>
      <Divider variant="middle" />
      <UserItemList userId={id} />
      <EditUserDetails userId={id} />
    </>
  );
};

export const UserDetails: FC<{ userId: string }> = ({ userId }) => {
  const [getUserDetails, { data }] = useLazyQuery<UserDetailsQuery, UserDetailsQueryVariables>(userDetailsquery, {
    variables: { id: userId },
  });

  useEffect(() => {
    if (userId) {
      getUserDetails();
    }
  }, [userId]);

  return (
    <>
      <Typography>
        First name: <strong>{data?.GetUserDetails?.firstName}</strong>
      </Typography>
      <Typography>
        Last name: <strong>{data?.GetUserDetails?.lastName}</strong>
      </Typography>
    </>
  );
};
