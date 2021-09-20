import { Grid } from '@material-ui/core';
import React, { FC } from 'react';
import SingleItemCard from './SingleItemCard';
import { SellButton } from './SellButton';
export type UserItemListProps = { userId: string };

export const UserItemList: FC<UserItemListProps> = ({ userId }) => {

  const userItems: any[] = [];
  return (
    <Grid container direction="column" spacing={1}>
      {userItems.map(item => {
        return (
          <Grid item key={item.id}>
            <SingleItemCard {...item}>
              <SellButton itemId={item.id} />
            </SingleItemCard>
          </Grid>
        );
      })}
    </Grid>
  );
};
