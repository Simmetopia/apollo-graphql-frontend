import React, { FC } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Typography from '@material-ui/core/Typography/Typography';
import { GenerateRandomItemButton } from './CreateRandomItemButton';
import Divider from '@material-ui/core/Divider/Divider';
import { UserItemList } from './UserItemList';
import gql from 'graphql-tag';
import { UserDetailsQuery, UserDetailsQueryVariables } from './__generated__/UserDetailsQuery';
import { LinearProgress } from '@material-ui/core';
import { useLocalData } from '../useLocalData';

export const ProfileRoot: FC = () => {
  const { id } = useLocalData();
  return (
    <>
      <UserDetails userId={id} />
      <Typography variant="h6" align="center">
        Items
      </Typography>
      <Divider variant="middle" />
      <UserItemList userId={id} />
      <GenerateRandomItemButton userId={id} />
    </>
  );
};
const user_details_query = gql`
  query UserDetailsQuery($userId: ID!) {
    user(where: { id: $userId }) {
      money
      id
      username
    }
  }
`;

export const UserDetails: FC<{ userId: string }> = ({ userId }) => {
  const { data, loading } = useQuery<UserDetailsQuery, UserDetailsQueryVariables>(user_details_query, {
    variables: { userId },
  });
  if (loading) {
    return <LinearProgress />;
  } else if (!data || !data.user) {
    return null;
  } else {
    return (
      <>
        <Typography>
          <strong>Name:</strong> {data.user.username}
        </Typography>
        <Typography>
          <strong>shop_id:</strong> {data.user.id}
        </Typography>
        <Typography>
          <strong>Pleggat's:</strong> {data.user.money}
        </Typography>
      </>
    );
  }
};
