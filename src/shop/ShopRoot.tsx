import { useQuery } from '@apollo/client';
import Grid from '@material-ui/core/Grid/Grid';
import gql from 'graphql-tag';
import React, { FC, useEffect, useState } from 'react';
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
  const [width, setWindowWidth] = useState(0);
  const { data: userData } = useQuery<userMoneyQuery, userMoneyQueryVariables>(UserMoneyQuery, {
    variables: { id: id ?? '' },
    skip: !id,
  });

  useEffect(() => {
    updateDimensions();

    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  if (!id) {
    return <div> something wong </div>;
  }
  if (userData?.GetUser === undefined) {
    return <div> something wong </div>;
  }

  if (data?.GetAllItemsInShop === null) {
    return <div> something wong </div>;
  }

  if (width < 500) {
    return (
      <>
        <h1 className="star-wars" style={{ border: '3px solid', borderRadius: 10 }}>
          Star Wars Marked
        </h1>
        <Grid container spacing={2} direction="column">
          {data?.GetAllItemsInShop.map((item) => (
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
  }

  return (
    <>
      <h1 className="star-wars" style={{ border: '3px solid', borderRadius: 10 }}>
        Star Wars Marked
      </h1>
      <Grid container spacing={2} direction="row">
        {data?.GetAllItemsInShop.map((item) => (
          <Grid item key={item?.id} xs={2}>
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
