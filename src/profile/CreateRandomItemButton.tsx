import { makeStyles } from '@material-ui/styles';
import { Theme, Button } from '@material-ui/core';
import React, { FC } from 'react';
import { itemDisplayQuery, UserItemListProps } from './UserItemList';
import { useSWMutation } from '../utils/useSWMutation';
import gql from 'graphql-tag';
import { ItemCreateMutation, ItemCreateMutationVariables } from './__generated__/ItemCreateMutation'
import { ASTNode, DocumentNode } from 'graphql';

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

function extractNameFromQuery(query: DocumentNode): string {
  const a = query.definitions[0]
  return (a as any).name.value as string
}

export const GenerateRandomItemButton: FC<UserItemListProps> = ({ userId }) => {
  const [itemCreate, { data, loading }] = useSWMutation<ItemCreateMutation, ItemCreateMutationVariables>(itemCreateMutation, { refetchQueries: [extractNameFromQuery(itemDisplayQuery)] });
  console.log(itemDisplayQuery)
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      className={classes.spacer}
      color="primary"
      disabled={false}
      onClick={() => itemCreate({ variables: { userId } })}
    >
      Generate random item
    </Button>
  );
};
