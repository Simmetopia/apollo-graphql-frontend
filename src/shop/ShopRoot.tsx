import { useQuery } from '@apollo/react-hooks';
import Grid from '@material-ui/core/Grid/Grid';
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress';
import Typography from '@material-ui/core/Typography/Typography';
import gql from 'graphql-tag';
import React, { FC } from 'react';
import SingleItemCard from '../profile/SingleItemCard';
import { item_fragment } from '../profile/UserItemList';
import { WebshopItems } from './__generated__/WebshopItems';
import { BuyButton } from './BuyButton';

const webshop_query = gql`
  query WebshopItems {
    getWebshopContent @connection(key: "webshop_content") {
      ...item_fragment
    }
  }
  ${item_fragment}
`;
export const ShopRoot: FC = () => {
  const { data, loading } = useQuery<WebshopItems>(webshop_query);
  if (loading) {
    return <LinearProgress />;
  }
  if (!data || !data.getWebshopContent) {
    return null;
  }
  return (
    <>
      <Typography>shop root</Typography>
      <Grid container spacing={1} direction="column">
        {data.getWebshopContent.map(item => (
          <Grid item key={item.id}>
            <SingleItemCard  {...item} ><BuyButton /></SingleItemCard>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
