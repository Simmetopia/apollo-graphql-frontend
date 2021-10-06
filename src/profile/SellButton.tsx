import React, { FC, useState } from 'react';
import RemoveShopIcon from '@material-ui/icons/RemoveShoppingCart';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';
import { DialogActions, IconButton, makeStyles, Theme, Button } from '@material-ui/core';
import { useLocalData } from '../useLocalData';
import { useSWMutaion } from '../utils/useSWMutation';
import { gql } from '@apollo/client';
import { setSellPriceMutationVariables, setSellPriceMutation } from './__generated__/setSellPriceMutation';
import { userItemQuery } from './UserItemList';

export const setSellPrice = gql`
  mutation setSellPriceMutation($id: ID!, $price: Int!, $inShop: Boolean!) {
    setSellPrice(input: { Item: { id: $id, price: $price, inShop: $inShop } }) {
      id
    }
  }
`;

type Props = { itemId: string };
export const SellButton: FC<Props> = ({ itemId }) => {
  const [open, setOpen] = React.useState(false);
  const [{ id }] = useLocalData();
  const [sellPriceUpdate] = useSWMutaion<setSellPriceMutation, setSellPriceMutationVariables>(setSellPrice, {
    refetchQueries: [{ query: userItemQuery, variables: { id: id } }],
  });

  const [price, setPrice] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setOpen(false);
    if (!isNaN(parseInt(price))) {
      sellPriceUpdate({ variables: { id: itemId, price: parseInt(price), inShop: true } });
    }
  };

  const handleStopSell = () => {
    setOpen(false);
    sellPriceUpdate({ variables: { id: itemId, price: 0, inShop: false } });
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <RemoveShopIcon />
      </IconButton>
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle style={{ backgroundColor: 'ThreeDDarkShadow', textAlign: 'center' }}>
          <h2>Set sell price</h2>
        </DialogTitle>
        <DialogContent style={{ backgroundColor: 'ThreeDDarkShadow' }}>
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Price"
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            fullWidth
            variant="standard"
            color="primary"
          />
        </DialogContent>
        <DialogActions style={{ backgroundColor: 'ThreeDDarkShadow' }}>
          <Button variant="contained" onClick={handleCancel} color="primary">
            Discard changes
          </Button>
          <Button variant="contained" onClick={handleSave} color="primary" type="submit">
            Sell
          </Button>
          <Button variant="contained" onClick={handleStopSell} color="primary" type="submit">
            Don't sell
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
