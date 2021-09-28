import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import gql from 'graphql-tag';
import React, { FC } from 'react';
import SingleItemCard from '../profile/SingleItemCard';
import { itemDisplayQuery } from '../profile/UserItemList';
import { ItemDisplayQuery, ItemDisplayQueryVariables } from '../profile/__generated__/ItemDisplayQuery';
import { useSWQuery } from '../utils/useSWQuery';
import { BuyButton } from './BuyButton';


export const ShopRoot: FC = () => {
  const { data } = useSWQuery<ItemDisplayQuery, ItemDisplayQueryVariables>(itemDisplayQuery, ({ variables: { username: "dark_saber_dealer_69" } }));

  return (
    <>
      <Typography>shop root</Typography>
      <Grid container spacing={1} direction="column">
        {data?.displayItems.map(item => (
          <Grid item key={item.id}>
            <SingleItemCard item={item}>
              <BuyButton itemId={item.id} />
            </SingleItemCard>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
