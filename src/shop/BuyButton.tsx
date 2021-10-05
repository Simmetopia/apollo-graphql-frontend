import { IconButton } from '@material-ui/core';
import ShopIcon from '@material-ui/icons/ShoppingCart';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
import React, { FC } from 'react';
import { useLocalData } from '../useLocalData';
import { useSWMutation } from '../utils/useSWMutation';
import { itemFilterQuery } from './ShopRoot';
import { ItemBuyMutation, ItemBuyMutationVariables } from './__generated__/ItemBuyMutation';

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

