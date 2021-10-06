import { useQuery, useReactiveVar } from '@apollo/client';
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
import {
  getItemsInShopQuery,
  getItemsInShopQueryVariables,
  getItemsInShopQuery_FilterItemsByPrice,
} from './__generated__/getItemsInShopQuery';
import { mostExpensiveItemQuery } from './__generated__/mostExpensiveItemQuery';
import { Stack } from '@mui/material';
import { ItemFilter } from './ItemFilter';
import { ItemSort, sortItemsVar, sortVariants } from './ItemSort';
import { PartFilter } from './PartFilter';
import { filterItemsVar, filterPartVar, getFilterValue, getPartFilterVar } from '../utils/filterVar';

export const getItemsInShop = gql`
  query getItemsInShopQuery($filterPrice: Int!) {
    FilterItemsByPrice(input: { filterPrice: $filterPrice }) {
      id
      partName
      saberPart
      partDescription
      price
      rarity
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

const partFilter: string[] = ['Blade', 'Emitter', 'Switch', 'Body', 'Pommel'];

export const ShopRoot: FC = () => {
  const [{ id }] = useLocalData();
  const { data: priceData } = useQuery<mostExpensiveItemQuery>(mostExpensiveItem, { fetchPolicy: 'network-only' });
  const [width, setWindowWidth] = useState(0);
  const [priceFilter, setPricefilter] = useState(0);
  const [priceValue, setPriceValue] = useState(0);
  const filter = useReactiveVar<string>(filterItemsVar);
  const sorter = useReactiveVar<string>(sortItemsVar);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const filterRender = useReactiveVar<string[]>(filterPartVar);
  const { data } = useQuery<getItemsInShopQuery, getItemsInShopQueryVariables>(getItemsInShop, {
    variables: { filterPrice: priceFilter },
    fetchPolicy: 'network-only',
  });
  const { data: userData } = useQuery<userMoneyQuery, userMoneyQueryVariables>(UserMoneyQuery, {
    variables: { id: id ?? '' },
    skip: !id,
  });

  const [items, setItems] = useState(data?.FilterItemsByPrice);

  useEffect(() => {
    setPricefilter(priceData?.MostExpensiveItemPrice?.price ?? 0);
    setPriceValue(priceData?.MostExpensiveItemPrice?.price ?? 0);

    updateDimensions();

    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [priceData]);

  useEffect(() => {
    setItems(data?.FilterItemsByPrice);

    if (!data?.FilterItemsByPrice) {
      return;
    }

    const sortedItems = [...data?.FilterItemsByPrice!];

    switch (parseInt(sorter)) {
      case sortVariants.ascendingPrice:
        sortedItems.sort((a, b) => a?.price! - b?.price!);
        break;
      case sortVariants.descendingPrice:
        sortedItems.sort((a, b) => b?.price! - a?.price!);
        break;
      case sortVariants.nameAlphabetically:
        sortedItems.sort((a, b) => a?.partName!.localeCompare(b?.partName!));
        break;
      default:
        break;
    }
    setItems(sortedItems);
  }, [data, sorter]);

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

      <Stack style={{ marginBottom: '3em' }} direction="row" spacing={5}>
        <div style={{ width: '20em' }}>
          <Typography>Max price filter</Typography>
          <Stack direction="row" spacing={2}>
            <Typography>0</Typography>
            <Slider
              style={{ width: '100%' }}
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
        </div>
        <ItemFilter filterName={'name'} filterValues={['None', 'Commando', 'Outcast', 'Pathfinder']}></ItemFilter>

        <ItemSort></ItemSort>

        {partFilter.map((filter) => (
          <PartFilter filterName={filter}></PartFilter>
        ))}
      </Stack>

      <Grid container spacing={2} direction="row">
        {items
          ?.filter((item) => item?.partName?.includes(getFilterValue(filter)))
          .filter((item) => filterPart(item, getPartFilterVar()))
          .map((item) => (
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

function filterPart(item: getItemsInShopQuery_FilterItemsByPrice | null, filter: string[]) {
  if (filter[0] === 'None') {
    return true;
  }
  if (!item) {
    return false;
  }
  for (let i = 0; i < filter.length; i++) {
    if (item.saberPart === filter[i]) {
      return true;
    }
  }
  return false;
}
