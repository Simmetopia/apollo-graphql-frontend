import { IconButton } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import gql from 'graphql-tag';
import React, { FC } from 'react';
import { itemDisplayQuery } from '../profile/UserItemList';
import { extractNameFromQuery } from '../shop/CreateRandomItemButton';
import { useSWMutation } from '../utils/useSWMutation';
import { showUserDetails } from './ProfileRoot';
import { ItemSellMutation, ItemSellMutationVariables } from './__generated__/ItemSellMutation';

const itemSellMutation = gql`
  mutation ItemSellMutation($itemId: String!) {
    itemSell(itemId: $itemId) {
      id
    }
  }
`;

type SellButtonProps = { itemId: string };
export const SellButton: FC<SellButtonProps> = ({ itemId }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [itemSell, { data, loading }] = useSWMutation<ItemSellMutation, ItemSellMutationVariables>(itemSellMutation, {
    refetchQueries: [extractNameFromQuery(itemDisplayQuery), extractNameFromQuery(showUserDetails)],
  });

  return (
    <IconButton className="w-8 h-8" onClick={() => itemSell({ variables: { itemId } })}>
      <AttachMoneyIcon />
    </IconButton>
  );
};
