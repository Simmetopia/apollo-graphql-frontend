import { useQuery } from '@apollo/react-hooks';
import { Grid, LinearProgress } from '@material-ui/core';
import gql from 'graphql-tag';
import React, { FC } from 'react';
import SingleItemCard from './SingleItemCard';
import { UserQuery, UserQueryVariables } from './__generated__/UserQuery';

export const item_fragment = gql`
  fragment item_fragment on Item {
    id
    saberPart
    partDescription
    partName
    price
  }
`;

const items_query = gql`
  query UserQuery($id: ID) {
    user(where: { id: $id }) @connection(key: "user_items") {
      id
      inventory {
        ...item_fragment
      }
    }
  }
  ${item_fragment}
`;

export type UserItemListProps = { userId: string };


export const UserItemList: FC<UserItemListProps> = ({ userId }) => {
  const { data, loading } = useQuery<UserQuery, UserQueryVariables>(items_query, {
    variables: { id: userId },
  });
  if (loading || !data || !data.user || !data.user.inventory) {
    return <LinearProgress />;
  }
  const userItems = data.user.inventory;
  return (
    <Grid container direction="column" spacing={1}>
      {userItems.map(item => {
        return (
          <Grid item key={item.id}>
            <SingleItemCard {...item} />
          </Grid>
        );
      })}
    </Grid>
  );
};


