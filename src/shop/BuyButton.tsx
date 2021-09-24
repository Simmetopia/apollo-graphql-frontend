import React, { FC } from 'react';
import ShopIcon from '@material-ui/icons/ShoppingCart';
import { IconButton } from '@material-ui/core';
import { useLocalData } from '../useLocalData';

type BuyButtonProps = { itemId: string | undefined };
export const BuyButton: FC<BuyButtonProps> = ({ itemId }) => {
  const localUser = useLocalData();

  return (
    <IconButton
      onClick={() => {
        //console.log(itemId)
      }
      }
    >
      <ShopIcon />
    </IconButton>
  );
};
