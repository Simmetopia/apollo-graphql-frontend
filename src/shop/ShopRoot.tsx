import { useQuery } from '@apollo/react-hooks';
import Grid from '@material-ui/core/Grid/Grid';
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress';
import Typography from '@material-ui/core/Typography/Typography';
import gql from 'graphql-tag';
import React, { FC } from 'react';
import SingleItemCard from '../profile/SingleItemCard';
import { WebshopItems } from './__generated__/WebshopItems';
import { BuyButton } from './BuyButton';
import { item_fragment } from '../item_fragment';

const webshop_query = gql`
  query WebshopItems {
    getWebshopContent @connection(key: "webshop_content") {
      ...item_fragment
    }
  }
  ${item_fragment}
`;
export const ShopRoot: FC = () => {
  const { data, loading } = useQuery<WebshopItems>(webshop_query, { fetchPolicy: 'cache-and-network' });
  if (!data || !data.getWebshopContent) {
    return null;
  }
  return (
    <>
      {loading && <LinearProgress />}
      <Typography>shop root</Typography>
      <Grid container spacing={1} direction="column">
        {data.getWebshopContent.map(item => (
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
