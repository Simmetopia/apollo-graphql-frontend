import React, { FC } from 'react';
import ShopIcon from '@material-ui/icons/ShoppingCart';
import gql from 'graphql-tag';
import { IconButton } from '@material-ui/core';
import { useLocalData } from '../useLocalData';
import { itemDisplayQuery } from '../profile/UserItemList';
import { useSWMutation } from '../utils/useSWMutation';
import { DocumentNode } from 'graphql';
import { ItemBuyMutation, ItemBuyMutationVariables } from './__generated__/ItemBuyMutation';
import { itemFilterQuery } from './ShopRoot';

const itemBuyMutation = gql`
 mutation ItemBuyMutation($userBuyerId: String!, $itemId: String!) {
 itemBuy(userBuyerId: $userBuyerId, itemId: $itemId) {
   id
 }}
`

function extractNameFromQuery(query: DocumentNode): string {
  const a = query.definitions[0]
  return (a as any).name.value as string
}

type BuyButtonProps = { itemId: string };
export const BuyButton: FC<BuyButtonProps> = ({ itemId }) => {
  const [itemBuy, { data, loading }] = useSWMutation<ItemBuyMutation, ItemBuyMutationVariables>(
    itemBuyMutation,
    { refetchQueries: [extractNameFromQuery(itemFilterQuery)] }
  );
  const [{ id }] = useLocalData();
  if (!id) {
    return <div> something wong </div>
  }

  return (
    <IconButton
      onClick={() => itemBuy({ variables: { userBuyerId: id, itemId } })}
    >
      <ShopIcon />
    </IconButton>
  );
};

