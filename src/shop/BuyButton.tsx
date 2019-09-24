import React, { FC } from 'react';
import ShopIcon from '@material-ui/icons/ShoppingCart';
import { IconButton, LinearProgress } from '@material-ui/core';
import gql from 'graphql-tag';
import { item_fragment } from '../profile/UserItemList';
import { useMutation } from '@apollo/react-hooks';
import { MakeTransaction, MakeTransactionVariables } from './__generated__/MakeTransaction';
import { useLocalData } from '../useLocalData';

const make_transaction = gql`
  mutation MakeTransaction($itemId: ID!, $userId: ID!) {
    requestPurchase(data: { itemId: $itemId, userId: $userId }) {
      id
      inventory {
        id
        price
      }
      money
    }
  }
`;

type BuyButtonProps = { itemId: string };
export const BuyButton: FC<BuyButtonProps> = ({ itemId }) => {
  const localUser = useLocalData();
  const [mutation, { loading }] = useMutation<MakeTransaction, MakeTransactionVariables>(make_transaction, {
    variables: { userId: localUser.id, itemId },
  });

  return (
    <IconButton
      onClick={() => {
        mutation();
      }}
    >
      {loading && <LinearProgress />}
      <ShopIcon />
    </IconButton>
  );
};
