import React, { FC } from 'react';
import { useLocalData } from '../useLocalData';
import { Button } from '@material-ui/core';
import { clearVarItems, getVarItems } from '../utils/varUtilities';
import { useSWMutaion } from '../utils/useSWMutation';
import gql from 'graphql-tag';
import { userItemQuery } from '../profile/UserItemList';
import { combineItems, combineItemsVariables } from './__generated__/combineItems';

export const combine_Items = gql`
  mutation combineItems($itemsId: [ID!]!) {
    combineItems(input: {ItemsId: $itemsId}) {
      id
    }
  }
`;



export const CombineButton: FC = () => {
  const [{ id }] = useLocalData();
  const [combineItemsMutation] = useSWMutaion<combineItems, combineItemsVariables>(combine_Items, {
    refetchQueries: [{query: userItemQuery, variables: { id: id }}]});
  

  return (
    <Button variant="contained" color="primary" onClick={() => {
      const items = getVarItems()
      var itemsId: string[] = []
      for (let i = 0; i < items.length; i++) {
        itemsId.push(items[i].id)
      }
      combineItemsMutation({variables: {itemsId: itemsId}, onCompleted: () => clearVarItems()})
      
    }}>
      {' '}
      Combine{' '}
    </Button>
  );
};
