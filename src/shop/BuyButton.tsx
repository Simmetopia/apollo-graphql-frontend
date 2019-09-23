import React, { FC } from 'react';
import ShopIcon from '@material-ui/icons/ShoppingCart';
import { IconButton } from '@material-ui/core';



export const BuyButton: FC = () => {

    return <IconButton>
        <ShopIcon />
    </IconButton>
}