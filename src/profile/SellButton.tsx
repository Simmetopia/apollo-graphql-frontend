import React, { FC, useState } from 'react';
import RemoveShopIcon from '@material-ui/icons/RemoveShoppingCart';
import Dialog from '@mui/material/Dialog';
import DialogActions, { dialogActionsClasses } from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField, useTheme } from '@mui/material';
import { IconButton, makeStyles, Theme } from '@material-ui/core';
import { useLocalData } from '../useLocalData';
import { useSWMutaion } from '../utils/useSWMutation';
import { gql, useMutation } from '@apollo/client';
import { setSellPriceMutationVariables, setSellPriceMutation } from './__generated__/setSellPriceMutation';
import { parse } from 'json5';
import { userItemQuery } from './UserItemList';

export const setSellPrice = gql`
  mutation setSellPriceMutation($id: ID!, $price: Int!, $inShop: Boolean!) {
    setSellPrice(input: {Item: {id: $id, price: $price, inShop: $inShop}}) {
      id
    }
  }
`;

const useStyles = makeStyles<Theme>({
  darkColor: {
    backgroundColor: '#616161',
    color: "#feda4a",
  },
}) 

type Props = { itemId: string };
export const SellButton: FC<Props> = ({ itemId }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [{ id }] = useLocalData();
  const theme = useTheme();
  const [sellPriceUpdate, { data }] = useSWMutaion<setSellPriceMutation, setSellPriceMutationVariables>(
    setSellPrice, { refetchQueries: [{ query: userItemQuery, variables: { id: id } }]
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
    if(!isNaN(parseInt(price))){
      sellPriceUpdate({variables: {id: itemId, price: parseInt(price), inShop: true}})
    }
    console.log(parseInt(price))
  };

  const handleStopSell = () => {
    setOpen(false);
    sellPriceUpdate({variables: {id: itemId, price: 0, inShop: false}})
  }

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <RemoveShopIcon />
      </IconButton>
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle className={classes.darkColor}>
          <h2>Set sell price</h2>
        </DialogTitle>
        <DialogContent className={classes.darkColor}>
          <TextField 
          autoFocus 
          margin="dense" 
          id="price" 
          label="Price"
          onChange={(e) => setPrice(e.target.value)}
          type="number" 
          fullWidth 
          variant="standard"
          color="warning" />
        </DialogContent>
        <DialogActions className={classes.darkColor}>
          <Button variant="contained" onClick={handleCancel} color="primary">Discard changes</Button>
          <Button variant="contained" onClick={handleSave} color="success" type="submit">Save</Button>
          <Button variant="contained" onClick={handleStopSell} color="warning" type="submit">Don't sell</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
