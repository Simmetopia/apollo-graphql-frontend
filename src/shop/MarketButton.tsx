import { Button, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
import React, { FC } from 'react';
import { useSWMutation } from '../utils/useSWMutation';
import { itemFilterQuery } from './ShopRoot';
import { ItemUpdateMarketMutation } from './__generated__/ItemUpdateMarketMutation';


const useStyles = makeStyles<Theme>(theme => ({
  spacer: { marginTop: theme.spacing(1), width: "100%" },
  
}));


const itemUpdateMarketMutation = gql`
  mutation ItemUpdateMarketMutation {
  itemUpdatePrice {
    id
    price
  }} 
`

export function extractNameFromQuery(query: DocumentNode): string {
  const a = query.definitions[0]
  return (a as any).name.value as string
}

export const MarketButton: FC = () => {
  
  const [itemUpdate, { data, loading }] = useSWMutation<ItemUpdateMarketMutation>(itemUpdateMarketMutation, { refetchQueries: [extractNameFromQuery(itemFilterQuery)] });

  const classes = useStyles();
  return (
    <Button
      variant="contained"
      className={classes.spacer}
      color="primary"
      disabled={false}
      onClick={() => itemUpdate()}
    >
      Inflate market
    </Button>
  );
};
