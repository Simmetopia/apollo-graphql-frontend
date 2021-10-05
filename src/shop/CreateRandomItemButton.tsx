import { makeStyles } from '@material-ui/styles';
import { Theme, Button } from '@material-ui/core';
import React, { FC } from 'react';
import { gql, useMutation } from '@apollo/client';
import { getItemsInShop, mostExpensiveItem } from './ShopRoot';

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

type Props = { maxPrice: number };

export const GenerateRandomItemButton: FC<Props> = ({ maxPrice }) => {
  const classes = useStyles();
  const [ItemCreate] = useMutation(itemCreateMutation, {
    refetchQueries: [{ query: getItemsInShop, variables: { filterPrice: maxPrice } }, {query: mostExpensiveItem}],
  });
  const [DeleteItemsNotOwned] = useMutation(deleteItemsMutation, {
    onCompleted: () => {
      for (let i = 0; i < 10; i++) {
        ItemCreate();
      }
    }, refetchQueries: [{query: mostExpensiveItem}]
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
