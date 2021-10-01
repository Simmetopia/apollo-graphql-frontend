import React, { FC } from 'react';
import ShopIcon from '@material-ui/icons/ShoppingCart';
import gql from 'graphql-tag';
import { IconButton } from '@material-ui/core';
import { useLocalData } from '../useLocalData';
import { itemDisplayQuery } from '../profile/UserItemList';
import { useSWMutation } from '../utils/useSWMutation';
import { DocumentNode } from 'graphql';
import { ItemSellMutation, ItemSellMutationVariables } from './__generated__/ItemSellMutation';
import { showUserDetails } from './ProfileRoot';
import { extractNameFromQuery } from '../shop/CreateRandomItemButton';

const itemSellMutation = gql`
 mutation ItemSellMutation($userSellerId: String!, $itemId: String!) {
 itemSell(userSellerId: $userSellerId, itemId: $itemId) {
   id
 }}
`

type SellButtonProps = { itemId: string };
export const SellButton: FC<SellButtonProps> = ({ itemId }) => {
  const [itemSell, { data, loading }] = useSWMutation<ItemSellMutation, ItemSellMutationVariables>(itemSellMutation,
    {
      refetchQueries: [
        extractNameFromQuery(itemDisplayQuery),
        extractNameFromQuery(showUserDetails)
      ]
    });
    
  const [{ id }] = useLocalData();
  if (!id) {
    return <div> something wong </div>
  }

  return (
    <IconButton
      onClick={() => itemSell({ variables: { userSellerId: id, itemId } })}
    >
      <ShopIcon />
    </IconButton>
  );
};

