import React, { FC } from 'react';
import RemoveShopIcon from '@material-ui/icons/RemoveShoppingCart';
import { IconButton } from '@material-ui/core';
import { useLocalData } from '../useLocalData';

type Props = { itemId: string };
export const SellButton: FC<Props> = ({ itemId }) => {
  const [{ id }] = useLocalData();

  return (
    <IconButton onClick={console.log}>
      <RemoveShopIcon />
    </IconButton>
  );
};
