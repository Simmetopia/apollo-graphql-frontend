import React, { FC } from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { item_fragment, SingleItemCard } from '../profile/UserItemList';

import { WebshopItems } from './__generated__/WebshopItems';
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress';
import Grid from '@material-ui/core/Grid/Grid';
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
            <SingleItemCard {...item} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
