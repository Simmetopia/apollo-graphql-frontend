import React, { FC } from 'react';
import RemoveShopIcon from '@material-ui/icons/RemoveShoppingCart';
import { IconButton } from '@material-ui/core';



export const SellButton: FC = () => {

    return <IconButton>
        <RemoveShopIcon />
    </IconButton>
}