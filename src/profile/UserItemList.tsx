import { Grid, makeStyles } from '@material-ui/core';
import React, { FC } from 'react';
import SingleItemCard from '../utils/SingleItemCard';
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
      SaberPart {
        name
      }
      PartName {
        name
      }
      partDescription
      price
      User {
        username
      }
      carts {
        id
      }
    }
  }
`;

const useStyles = makeStyles({
  card: { width: '30%' },
});

export const UserItemList: FC<UserItemListPropsUsername> = ({ username }) => {
  const { data } = useSWQuery<ItemDisplayQuery, ItemDisplayQueryVariables>(itemDisplayQuery, {
    variables: { username },
  });
  const classes = useStyles();

  return (
    <div className="flex flex-wrap flex-row gap-3">
      {data?.displayItems.map((item) => {
        return (
          <div className={classes.card}>
            <SingleItemCard item={item}>
              <SellButton itemId={item.id} />
            </SingleItemCard>
          </div>
        );
      })}
    </div>
  );
};
