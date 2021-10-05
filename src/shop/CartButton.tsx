import { Badge, IconButton, Theme } from '@material-ui/core';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/styles';
import gql from 'graphql-tag';
import React, { FC } from 'react';
import { useLocalData } from '../useLocalData';
import { useSWMutation } from '../utils/useSWMutation';
import { useSWQuery } from '../utils/useSWQuery';
import { extractNameFromQuery } from './CreateRandomItemButton';
import { itemFilterQuery } from './ShopRoot';
import { BuyCartMutation, BuyCartMutationVariables } from './__generated__/BuyCartMutation';
import { UserCartQuery, UserCartQueryVariables } from './__generated__/UserCartQuery';


const useStyles = makeStyles<Theme>(theme => ({
  buttonSize: {  height: "6rem", width: "6rem" },
  badgeSize: { transform: "scale(2.5)" },
}));

export const userCartQuery = gql`
  query UserCartQuery($userId: String!) {
    userCart(userId: $userId) {
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
    }
  }
`

export const buyCartMutation = gql`
  mutation BuyCartMutation($userId: String!) {
    buyCart(userId: $userId) {
      id
    }
  }
`

export const CartButton: FC = () => {
  const [{ id }] = useLocalData();
  const { data } = useSWQuery<UserCartQuery, UserCartQueryVariables>(userCartQuery, ({ variables: { userId: id! } }));
  const [buyCart] = useSWMutation<BuyCartMutation, BuyCartMutationVariables>(
    buyCartMutation, { 
    refetchQueries: [
      extractNameFromQuery(itemFilterQuery), 
      extractNameFromQuery(userCartQuery)
    ] 
  });
  const classes = useStyles();

  return (
    <IconButton className={classes.buttonSize} onClick={() => buyCart({ variables: { userId: id! } })} color="primary" >
        <Badge className={classes.badgeSize} badgeContent={data?.userCart.length} > 
            <ShoppingCart />
        </Badge>
    </IconButton >
  );
};
