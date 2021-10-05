import React, { FC } from 'react';
import ShopIcon from '@material-ui/icons/ShoppingCart';
import gql from 'graphql-tag';
import { IconButton } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AddIcon from '@material-ui/icons/Add';
import { useLocalData } from '../useLocalData';
import { itemDisplayQuery } from '../profile/UserItemList';
import { useSWMutation } from '../utils/useSWMutation';
import { DocumentNode } from 'graphql';
import { itemFilterQuery } from './ShopRoot';
import { userCartQuery } from './CartButton';
import { AddCartMutation, AddCartMutationVariables } from './__generated__/AddCartMutation';
import { extractNameFromQuery } from './CreateRandomItemButton';

const addCartMutation = gql`
  mutation AddCartMutation($userId: String!, $itemId: String!) {
  addToCart(userId: $userId, itemId: $itemId) {
    id
  }}
`

type AddCartButtonProps = { itemId: string };
export const AddCartButton: FC<AddCartButtonProps> = ({ itemId }) => {
  const [addCart, { data, loading }] = useSWMutation<AddCartMutation, AddCartMutationVariables>(
    addCartMutation, { 
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
    <IconButton onClick={() => addCart({ variables: { userId: id, itemId } })} >
      <AddIcon />
    </IconButton>
  );
};

