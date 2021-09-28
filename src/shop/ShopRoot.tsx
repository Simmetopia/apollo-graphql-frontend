import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import gql from 'graphql-tag';
import React, { FC } from 'react';
import SingleItemCard from '../profile/SingleItemCard';
import { useSWQuery } from '../utils/useSWQuery';
import { BuyButton } from './BuyButton';
import { ItemDisplayShopQuery } from './__generated__/ItemDisplayShopQuery'

export const itemDisplayShopQuery = gql`
 query ItemDisplayShopQuery {
  displayShopItems {
    saberPart
    partName
    id
    userId
 }} 
`

export const ShopRoot: FC = () => {
  const { data } = useSWQuery<ItemDisplayShopQuery>(itemDisplayShopQuery);

  return (
    <>
      <Typography>shop root</Typography>
      <Grid container spacing={1} direction="column">
        {data?.displayShopItems.map(item => (
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
