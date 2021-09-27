import React, { FC } from 'react';
import ShopIcon from '@material-ui/icons/ShoppingCart';
import { IconButton } from '@material-ui/core';
import { useLocalData } from '../useLocalData';

type Props = { itemId: string };
export const SellButton: FC<Props> = ({ itemId }) => {
  const [{ id }] = useLocalData();

  return (
    <IconButton onClick={console.log}>
      <ShopIcon />
    </IconButton>
  );
};
