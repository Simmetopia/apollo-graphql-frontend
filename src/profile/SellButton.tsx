import { IconButton } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import gql from 'graphql-tag';
import React, { FC } from 'react';
import { itemDisplayQuery } from '../profile/UserItemList';
import { extractNameFromQuery } from '../shop/CreateRandomItemButton';
import { useLocalData } from '../useLocalData';
import { useSWMutation } from '../utils/useSWMutation';
import { showUserDetails } from './ProfileRoot';
import { ItemSellMutation, ItemSellMutationVariables } from './__generated__/ItemSellMutation';

const itemSellMutation = gql`
 mutation ItemSellMutation($userSellerId: String!, $itemId: String!) {
 itemSell(userSellerId: $userSellerId, itemId: $itemId) {
   id
 }}
`

type SellButtonProps = { itemId: string };
export const SellButton: FC<SellButtonProps> = ({ itemId }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      <AttachMoneyIcon />
    </IconButton>
  );
};

