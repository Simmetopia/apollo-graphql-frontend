import React, { FC } from 'react';
import RemoveShopIcon from '@material-ui/icons/RemoveShoppingCart';
import { IconButton } from '@material-ui/core';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useLocalData } from '../useLocalData';
import { SellItem, SellItemVariables } from './__generated__/SellItem';
import { item_fragment } from '../item_fragment';

const sell_item = gql`
  mutation SellItem($itemId: ID!, $userId: ID!) {
    sellItem(data: { itemId: $itemId, userId: $userId }) {
      id
      money
      inventory {
        ...item_fragment
      }
    }
  }
  ${item_fragment}
`;

type Props = { itemId: string };
export const SellButton: FC<Props> = ({ itemId }) => {
  const { id } = useLocalData();
  const [mutation] = useMutation<SellItem, SellItemVariables>(sell_item, {
    variables: { itemId, userId: id },
  });
  return (
    <IconButton onClick={() => mutation()}>
      <RemoveShopIcon />
    </IconButton>
  );
};
