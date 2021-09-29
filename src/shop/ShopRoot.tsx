import { useQuery } from '@apollo/client';
import Grid from '@material-ui/core/Grid/Grid';
import gql from 'graphql-tag';
import React, { FC } from 'react';
import SingleItemCard from '../profile/SingleItemCard';
import { useLocalData } from '../useLocalData';
import { BuyButton } from './BuyButton';
import { GenerateRandomItemButton } from './CreateRandomItemButton';
import { getAllItemsInShopQuery } from './__generated__/getAllItemsInShopQuery';
import { userMoneyQuery, userMoneyQueryVariables } from './__generated__/userMoneyQuery';

export const GetAllShopItemsQuery = gql`
  query getAllItemsInShopQuery {
    GetAllItemsInShop {
      id
      partName
      saberPart
      partDescription
      price
      url
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
  const { data } = useQuery<getAllItemsInShopQuery>(GetAllShopItemsQuery, { fetchPolicy: 'network-only' });
  const [{ id }] = useLocalData();
  const { data: userData } = useQuery<userMoneyQuery, userMoneyQueryVariables>(UserMoneyQuery, {
    variables: { id: id ?? '' },
    skip: !id,
  });

  if (!id) {
    return <div> something wong </div>;
  }
  if (userData?.GetUser === undefined) {
    return <div> something wong </div>;
  }

  if (data?.GetAllItemsInShop === null) {
    return <div> something wong </div>;
  }

  return (
    <>
      <h1 className="star-wars" style={{border: "3px solid", borderRadius: 10}}>Star Wars Marked</h1>
      <Grid container spacing={2} direction="row">
        {data?.GetAllItemsInShop.map((item) => (
          <Grid item key={item?.id} xs={3}>
            <SingleItemCard item={item} >
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
