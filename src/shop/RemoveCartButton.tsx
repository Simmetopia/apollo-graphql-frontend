import { IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import gql from 'graphql-tag';
import React, { FC } from 'react';
import { useSWMutation } from '../utils/useSWMutation';
import { userCartQuery } from './CartButton';
import { extractNameFromQuery } from './CreateRandomItemButton';
import { itemFilterQuery } from './ShopRoot';
import { RemoveCartMutation, RemoveCartMutationVariables } from './__generated__/RemoveCartMutation';

export const removeCartMutation = gql`
  mutation RemoveCartMutation($itemId: String!) {
    removeFromCart(itemId: $itemId) {
      id
    }
  }
`;

type RemoveCartButtonProps = { itemId: string };
export const RemoveCartButton: FC<RemoveCartButtonProps> = ({ itemId }) => {
  const [removeCart] = useSWMutation<RemoveCartMutation, RemoveCartMutationVariables>(removeCartMutation, {
    refetchQueries: [extractNameFromQuery(itemFilterQuery), extractNameFromQuery(userCartQuery)],
  });

  return (
    <IconButton className="w-8 h-8" onClick={() => removeCart({ variables: { itemId } })}>
      <ClearIcon />
    </IconButton>
  );
};
