import ClearIcon from '@material-ui/icons/Clear';
import { Badge, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Theme } from '@material-ui/core';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/styles';
import gql from 'graphql-tag';
import React, { FC, useState } from 'react';
import { SWLabelValue } from '../utils/SWLabelValue';
import { useSWMutation } from '../utils/useSWMutation';
import { useSWQuery } from '../utils/useSWQuery';
import { extractNameFromQuery } from './CreateRandomItemButton';
import { itemFilterQuery } from './ShopRoot';
import { BuyCartMutation } from './__generated__/BuyCartMutation';
import { UserCartQuery, UserCartQuery_userCart } from './__generated__/UserCartQuery';
import { RemoveCartButton, removeCartMutation } from './RemoveCartButton';
import { RemoveCartMutation, RemoveCartMutationVariables } from './__generated__/RemoveCartMutation';

const useStyles = makeStyles<Theme>((theme) => ({
  buttonSize: { height: '6rem', width: '6rem' },
  badgeSize: { transform: 'scale(2.5)' },
  paper: { backgroundColor: '#646464', width: '70%', position: 'absolute', top: '10%', maxHeight: '65%' },
}));

export const userCartQuery = gql`
  query UserCartQuery {
    userCart {
      id
      userId
      SaberPart {
        name
      }
      PartName {
        name
      }
      partDescription
      price
    }
  }
`;

const buyCartMutation = gql`
  mutation BuyCartMutation {
    buyCart {
      id
    }
  }
`;

export const CartButton: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useSWQuery<UserCartQuery>(userCartQuery);
  const [buyCart] = useSWMutation<BuyCartMutation>(buyCartMutation, {
    refetchQueries: [extractNameFromQuery(itemFilterQuery), extractNameFromQuery(userCartQuery)],
  });
  const [removeCart] = useSWMutation<RemoveCartMutation, RemoveCartMutationVariables>(removeCartMutation, {
    refetchQueries: [extractNameFromQuery(itemFilterQuery), extractNameFromQuery(userCartQuery)],
  });

  const total = (userCart: UserCartQuery_userCart[] | undefined) => {
    let total = 0;

    userCart?.map((item) => (total += item.price!));

    return total;
  };

  const buy = () => {
    setIsOpen(false);
    buyCart();
  };

  const close = () => {
    setIsOpen(false);
  };

  const classes = useStyles();

  return (
    <>
      <IconButton className={classes.buttonSize} onClick={() => setIsOpen(true)} color="primary">
        <Badge className={classes.badgeSize} badgeContent={data?.userCart.length}>
          <ShoppingCart />
        </Badge>
      </IconButton>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        fullWidth={true}
        maxWidth={false}
        classes={{ paper: classes.paper }}
      >
        <DialogTitle> Cart </DialogTitle>
        <DialogContent dividers={true}>
          <div className="flex flex-col gap-6 w-full">
            {data?.userCart.map((item) => (
              <div className="grid grid-cols-5 gap-3 w-full">
                <div className="flex items-start">
                  <button onClick={() => removeCart({ variables: { itemId: item.id } })}>
                    <ClearIcon />
                  </button>
                  <SWLabelValue value={item.PartName?.name!}></SWLabelValue>
                </div>
                <div className="col-span-3">
                  <SWLabelValue value={item.partDescription}></SWLabelValue>
                </div>
                <div className="justify-self-end flex items-start">
                  <SWLabelValue value={item.price?.toString()}></SWLabelValue>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <SWLabelValue label="Total:" value={total(data?.userCart).toString()} />
          <Button variant="contained" color="primary" onClick={() => buy()}>
            BUY ALL
          </Button>
          <Button variant="contained" onClick={close}>
            getmeouttahere
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
