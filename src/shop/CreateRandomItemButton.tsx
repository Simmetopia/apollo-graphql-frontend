import { makeStyles } from '@material-ui/styles';

import { Theme, Button } from '@material-ui/core';

import React, { FC, useEffect } from 'react';

import { UserItemListProps } from '../profile/UserItemList';
import { gql, useMutation } from '@apollo/client';
import { GetAllShopItemsQuery } from './ShopRoot';
import { async } from 'q';

export const itemCreateMutation = gql`
  mutation itemCreateMutation {
    ItemCreate {
      id
      partName
      saberPart
      partDescription
      price
    }
  }
`;

export const deleteItemsMutation = gql`
  mutation deleteItemsMutation {
    DeleteItemsNotOwned {
      ItemsDeleted
    }
  }
`;

const useStyles = makeStyles<Theme>((theme) => ({
  spacer: { marginTop: theme.spacing(1) },
}));

type Props = {};

export const GenerateRandomItemButton: FC<Props> = ({}) => {
  const classes = useStyles();
  const [ItemCreate, { data: mutationData }] = useMutation(itemCreateMutation, {
    refetchQueries: [{ query: GetAllShopItemsQuery }],
  });
  const [DeleteItemsNotOwned, { data }] = useMutation(deleteItemsMutation, {
    onCompleted: () => {
      for (let i = 0; i < 10; i++) {
        ItemCreate();
      }
    },
  });

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button
        variant="contained"
        className={classes.spacer}
        color="primary"
        disabled={false}
        onClick={() => {
          DeleteItemsNotOwned();
        }}
      >
        Generate random item
      </Button>
    </div>
  );
};
