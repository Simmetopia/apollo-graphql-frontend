import { Button, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
import React, { FC } from 'react';
import { useSWMutation } from '../utils/useSWMutation';
import { ItemCreateMutation } from './__generated__/ItemCreateMutation';
import { itemFilterQuery } from './ShopRoot';


export type UserItemListPropsId = { userId: string };

const useStyles = makeStyles<Theme>(theme => ({
  spacer: { marginTop: theme.spacing(1), width: "100%" },
}));

const itemCreateMutation = gql`
  mutation ItemCreateMutation {
  itemCreate {
    id
    userId
    SaberPart
    {
      name
    }
    PartName
    {
      name
    }
    partDescription
    price
  }} 
`

export function extractNameFromQuery(query: DocumentNode): string {
  const a = query.definitions[0]
  return (a as any).name.value as string
}

export const GenerateRandomItemButton: FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [itemCreate, { data, loading }] = useSWMutation<ItemCreateMutation>(itemCreateMutation, { refetchQueries: [extractNameFromQuery(itemFilterQuery)] });

  const classes = useStyles();
  return (
    <Button
      variant="contained"
      className={classes.spacer}
      color="primary"
      disabled={false}
      onClick={() => itemCreate()}
    >
      Create new item
    </Button>
  );
};
