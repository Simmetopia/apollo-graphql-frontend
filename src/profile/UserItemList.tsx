import { Grid } from '@material-ui/core';
import React, { FC } from 'react';
import SingleItemCard from './SingleItemCard';
import { SellButton } from './SellButton';
import gql from 'graphql-tag';
import { useSWQuery } from '../utils/useSWQuery';
import { ItemDisplayQuery, ItemDisplayQueryVariables } from './__generated__/ItemDisplayQuery';

export type UserItemListPropsUsername = { username: string };

export const itemDisplayQuery = gql`
 query ItemDisplayQuery($username: String!) {
 displayItems(username: $username) {
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
    User
    {
      username
    }
 }} 
`

export const UserItemList: FC<UserItemListPropsUsername> = ({ username }) => {
  const { data } = useSWQuery<ItemDisplayQuery, ItemDisplayQueryVariables>(itemDisplayQuery, ({ variables: { username } }));

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

