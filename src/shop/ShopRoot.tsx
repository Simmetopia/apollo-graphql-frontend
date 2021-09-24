import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { List } from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import gql from 'graphql-tag';
import React, { FC, useEffect, useState } from 'react';
import SingleItemCard from '../profile/SingleItemCard';
import { useLocalData } from '../useLocalData';
import { BuyButton } from './BuyButton';
import { GenerateRandomItemButton, itemCreateMutation } from './CreateRandomItemButton';
import { getAllItemsQuery } from './__generated__/getAllItemsQuery'


export const GetAllItemsQuery = gql`
  query getAllItemsQuery {
    GetAllItems {
      id
      partName
      saberPart
      partDescription
      price
    }
  }
`;

export const ShopRoot: FC = () => {
  const { data} = useQuery<getAllItemsQuery>(GetAllItemsQuery, {fetchPolicy: 'network-only',});
  
  
 const [{ id }] = useLocalData();

  if(data?.GetAllItems === null){
    return <div> something wong </div>;
  }
  
  if (!id) {
    return <div> something wong </div>;
  }

  return (
    <>
      <h1 className="star-wars">Star Wars Marked</h1>
      <Grid container spacing={1} direction="row">
        {data?.GetAllItems.map(item => (
          <Grid item key={item?.id} className="CardItem">
            <SingleItemCard item={item}>
              <BuyButton itemId={item?.id} />
            </SingleItemCard>
          </Grid>
        ))}
      </Grid>
      <GenerateRandomItemButton />
    </>
  );
};

