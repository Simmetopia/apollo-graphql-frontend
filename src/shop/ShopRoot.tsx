import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import React, { FC } from 'react';
import SingleItemCard from '../profile/SingleItemCard';
import { BuyButton } from './BuyButton';

export const ShopRoot: FC = () => {
  const data: any[] = [];
  return (
    <>
      <Typography>shop root</Typography>
      <Grid container spacing={1} direction="column">
        {data.map(item => (
          <Grid item key={item.id}>
            <SingleItemCard {...item}>
              <BuyButton itemId={item.id} />
            </SingleItemCard>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
