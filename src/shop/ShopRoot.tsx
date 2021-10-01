import { useQuery } from '@apollo/client';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import Slider from '@material-ui/core/Slider';
import gql from 'graphql-tag';
import React, { FC, useEffect, useState } from 'react';
import SingleItemCard from '../profile/SingleItemCard';
import { useLocalData } from '../useLocalData';
import { BuyButton } from './BuyButton';
import { GenerateRandomItemButton } from './CreateRandomItemButton';
import { userMoneyQuery, userMoneyQueryVariables } from './__generated__/userMoneyQuery';
import { getItemsInShopQuery, getItemsInShopQueryVariables } from './__generated__/getItemsInShopQuery';
import { mostExpensiveItemQuery } from './__generated__/mostExpensiveItemQuery';
import { Stack } from '@mui/material';
import { ItemFilter } from './ItemFilter';

export const getItemsInShop = gql`
  query getItemsInShopQuery($filterPrice: Int!) {
    FilterItemsByPrice(input: { filterPrice: $filterPrice }) {
      id
      partName
      saberPart
      partDescription
      price
      url
    }
  }
`;

export const mostExpensiveItem = gql`
  query mostExpensiveItemQuery {
    MostExpensiveItemPrice {
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
  const [{ id }] = useLocalData();
  const { data: priceData } = useQuery<mostExpensiveItemQuery>(mostExpensiveItem, { fetchPolicy: 'network-only' });
  const [width, setWindowWidth] = useState(0);
  const [priceFilter, setPricefilter] = useState(0);
  const [priceValue, setPriceValue] = useState(0);
  const { data } = useQuery<getItemsInShopQuery, getItemsInShopQueryVariables>(getItemsInShop, {
    variables: { filterPrice: priceFilter },
    fetchPolicy: 'network-only',
  });
  const { data: userData } = useQuery<userMoneyQuery, userMoneyQueryVariables>(UserMoneyQuery, {
    variables: { id: id ?? '' },
    skip: !id,
  });

  useEffect(() => {
    setPricefilter(priceData?.MostExpensiveItemPrice?.price ?? 0);
    setPriceValue(priceData?.MostExpensiveItemPrice?.price ?? 0);
    updateDimensions();

    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [priceData]);

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  if (!id || userData?.GetUser === undefined || data?.FilterItemsByPrice === null) {
    return <div> something wong </div>;
  }

  if (width < 500) {
    return (
      <>
        <h1 className="star-wars" style={{ border: '3px solid', borderRadius: 10 }}>
          Star Wars Marked
        </h1>
        <Grid container spacing={2} direction="column">
          {data?.FilterItemsByPrice.map((item) => (
            <Grid item key={item?.id}>
              <SingleItemCard item={item}>
                <BuyButton itemId={item?.id} maxPrice={priceFilter} />
              </SingleItemCard>
            </Grid>
          ))}
        </Grid>
        <GenerateRandomItemButton maxPrice={priceFilter} />
        <h3 className="money">Money: {userData.GetUser?.money}</h3>
      </>
    );
  }

  return (
    <>
      <h1 className="star-wars" style={{ border: '3px solid', borderRadius: 10 }}>
        Star Wars Marked
      </h1>

      <Typography>Max price filter</Typography>
      <Stack direction="row" spacing={2}>
        <Typography>0</Typography>
        <Slider
          style={{ width: '20%' }}
          value={priceValue as number}
          onChange={(e, val) => setPriceValue(val as number)}
          onChangeCommitted={(e, val) => setPricefilter(val as number)}
          min={0}
          max={priceData?.MostExpensiveItemPrice?.price ?? 0}
          aria-label="defult"
          valueLabelDisplay="auto"
        />
        <Typography>{priceData?.MostExpensiveItemPrice?.price}</Typography>
      </Stack>

      <ItemFilter filterName={'Name'} filterValues={['Fix Mig på MANDAG!!!!', 'haha']}></ItemFilter>

      <Grid container spacing={2} direction="row">
        {data?.FilterItemsByPrice.map((item) => (
          <Grid item key={item?.id} xs={2}>
            <SingleItemCard item={item}>
              <BuyButton itemId={item?.id} maxPrice={priceFilter} />
            </SingleItemCard>
          </Grid>
        ))}
      </Grid>
      <GenerateRandomItemButton maxPrice={priceFilter} />
      <h3 className="money">Money: {userData.GetUser?.money}</h3>
    </>
  );
};
