import React, { FC } from 'react';
import ShopIcon from '@material-ui/icons/ShoppingCart';
import gql from 'graphql-tag';
import { IconButton } from '@material-ui/core';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import ClearIcon from '@material-ui/icons/Clear';
import { useLocalData } from '../useLocalData';
import { itemDisplayQuery } from '../profile/UserItemList';
import { useSWMutation } from '../utils/useSWMutation';
import { DocumentNode } from 'graphql';
import { itemFilterQuery } from './ShopRoot';
import { userCartQuery } from './CartButton';
import { RemoveCartMutation, RemoveCartMutationVariables } from './__generated__/RemoveCartMutation';
import { extractNameFromQuery } from './CreateRandomItemButton';

const removeCartMutation = gql`
  mutation RemoveCartMutation($userId: String!, $itemId: String!) {
  removeFromCart(userId: $userId, itemId: $itemId) {
    id
  }}
`

type RemoveCartButtonProps = { itemId: string };
export const RemoveCartButton: FC<RemoveCartButtonProps> = ({ itemId }) => {
  const [removeCart, { data, loading }] = useSWMutation<RemoveCartMutation, RemoveCartMutationVariables>(
    removeCartMutation, { 
      refetchQueries: [
        extractNameFromQuery(itemFilterQuery), 
        extractNameFromQuery(userCartQuery)
      ] 
    }
  );
  const [{ id }] = useLocalData();
  if (!id) {
    return <div> something wong </div>
  }

  return (
    <IconButton onClick={() => removeCart({ variables: { userId: id, itemId } })} >
      <ClearIcon />
    </IconButton>
  );
};

