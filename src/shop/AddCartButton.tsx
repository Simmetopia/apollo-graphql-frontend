import React, { FC } from 'react';
import ShopIcon from '@material-ui/icons/ShoppingCart';
import gql from 'graphql-tag';
import { IconButton } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AddIcon from '@material-ui/icons/Add';
import { itemDisplayQuery } from '../profile/UserItemList';
import { useSWMutation } from '../utils/useSWMutation';
import { DocumentNode } from 'graphql';
import { itemFilterQuery } from './ShopRoot';
import { userCartQuery } from './CartButton';
import { AddCartMutation, AddCartMutationVariables } from './__generated__/AddCartMutation';
import { extractNameFromQuery } from './CreateRandomItemButton';

const addCartMutation = gql`
  mutation AddCartMutation($itemId: String!) {
    addToCart(itemId: $itemId) {
      id
    }
  }
`;

type AddCartButtonProps = { itemId: string };
export const AddCartButton: FC<AddCartButtonProps> = ({ itemId }) => {
  const [addCart, { data, loading }] = useSWMutation<AddCartMutation, AddCartMutationVariables>(addCartMutation, {
    refetchQueries: [extractNameFromQuery(itemFilterQuery), extractNameFromQuery(userCartQuery)],
  });

  return (
    <IconButton className="w-8 h-8" onClick={() => addCart({ variables: { itemId } })}>
      <AddIcon />
    </IconButton>
  );
};
