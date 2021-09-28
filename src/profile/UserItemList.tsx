import { Grid } from '@material-ui/core';
import React, { FC } from 'react';
import SingleItemCard from './SingleItemCard';
import { SellButton } from './SellButton';
import gql from 'graphql-tag';
import { useSWQuery } from '../utils/useSWQuery';
import { ItemDisplayQuery, ItemDisplayQueryVariables } from './__generated__/ItemDisplayQuery';

export type UserItemListProps = { userId: string };

export const itemDisplayQuery = gql`
 query ItemDisplayQuery($userId: String!) {
 displayItems(userId: $userId) {
    id
    userId
    SaberPart
    {
      name
    }
    PartName
    {
      name
    }
    partDescription
    price
 }} 
`

export const UserItemList: FC<UserItemListProps> = ({ userId }) => {
  const { data } = useSWQuery<ItemDisplayQuery, ItemDisplayQueryVariables>(itemDisplayQuery, ({ variables: { userId } }));

  return (
    <Grid container direction="column" spacing={1}>
      {data?.displayItems.map(item => {
        return (
          <Grid item key={item.id}>
            <SingleItemCard item={item}>
              <SellButton itemId={item.id} />
            </SingleItemCard>
          </Grid>
        );
      })}
    </Grid>
  );
};

