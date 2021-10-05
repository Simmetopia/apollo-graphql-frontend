import React, { FC } from 'react';
import ShopIcon from '@material-ui/icons/ShoppingCart';
import { IconButton } from '@material-ui/core';
import { useLocalData } from '../useLocalData';
import gql from 'graphql-tag';
import { useSWMutaion } from '../utils/useSWMutation';
import { buyItemMutation, buyItemMutationVariables } from './__generated__/buyItemMutation';
import { userItemQuery } from '../profile/UserItemList';
import { getItemsInShop, mostExpensiveItem } from './ShopRoot';

type BuyButtonProps = { itemId: string | undefined; maxPrice: number };

export const buyItemFromShop = gql`
  mutation buyItemMutation($userId: ID!, $itemId: ID!) {
    buyItem(input: { userId: $userId, itemId: $itemId }) {
      money
    }
  }
`;

export const BuyButton: FC<BuyButtonProps> = ({ itemId, maxPrice }) => {
  const [{ id }] = useLocalData();
  const [buyItem] = useSWMutaion<buyItemMutation, buyItemMutationVariables>(buyItemFromShop, {
    refetchQueries: [
      { query: userItemQuery, variables: { id: id } },
      { query: getItemsInShop, variables: { filterPrice: maxPrice } },
      { query: mostExpensiveItem},
    ],
    
  });

  if (id === undefined || itemId === undefined) {
    return <div> something wong </div>;
  }

  return (
    <IconButton onClick={() => buyItem({ variables: { userId: id, itemId: itemId } })}>
      <ShopIcon />
    </IconButton>
  );
};
