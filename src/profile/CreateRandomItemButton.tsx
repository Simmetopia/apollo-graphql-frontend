import { makeStyles } from '@material-ui/styles';
import { Theme, Button } from '@material-ui/core';
import React, { FC } from 'react';
import { UserItemListProps } from './UserItemList';
import { useSWMutation } from '../utils/useSWMutation';
import gql from 'graphql-tag';
import { ItemCreateMutation, ItemCreateMutationVariables } from './__generated__/ItemCreateMutation'

const useStyles = makeStyles<Theme>(theme => ({
  spacer: { marginTop: theme.spacing(1) },
}));

const itemCreateMutation = gql`
 mutation ItemCreateMutation($userId: String!) {
 itemCreate(userId: $userId) {
   id
   userId
   saberPart
   partName
 }} 
`

export const GenerateRandomItemButton: FC<UserItemListProps> = ({ userId }) => {
  const [itemCreate, { data, loading }] = useSWMutation<ItemCreateMutation, ItemCreateMutationVariables>(itemCreateMutation);

  const classes = useStyles();
  return (
    <Button
      variant="contained"
      className={classes.spacer}
      color="primary"
      disabled={false}
      onClick={() => console.log(itemCreate({ variables: {userId} }))}
    >
      Generate random item
    </Button>
  );
};
