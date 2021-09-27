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
import { getAllItemsQuery } from './__generated__/getAllItemsQuery';
import { userMoneyQuery, userMoneyQueryVariables } from './__generated__/userMoneyQuery';

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

export const UserMoneyQuery = gql`
  query userMoneyQuery($id: ID!) {
    GetUser(input: { id: $id }) {
      money
    }
  }
`;

export const ShopRoot: FC = () => {
  const { data } = useQuery<getAllItemsQuery>(GetAllItemsQuery, { fetchPolicy: 'network-only' });
  const [{ id }] = useLocalData();
  const { data: userData } = useQuery<userMoneyQuery, userMoneyQueryVariables>(UserMoneyQuery, {
    variables: { id: id },
  });

  if (!id) {
    return <div> something wong </div>;
  }
  if (userData?.GetUser === undefined) {
    return <div> something wong </div>;
  }

  if (data?.GetAllItems === null) {
    return <div> something wong </div>;
  }

  return (
    <>
      <h1 className="star-wars">Star Wars Marked</h1>
      <Grid container spacing={1} direction="row">
        {data?.GetAllItems.map((item) => (
          <Grid item key={item?.id}>
            <SingleItemCard item={item}>
              <BuyButton itemId={item?.id} />
            </SingleItemCard>
          </Grid>
        ))}
      </Grid>
      <GenerateRandomItemButton />
      <h3 className="money">Money: {userData.GetUser?.money}</h3>
    </>
  );
};
