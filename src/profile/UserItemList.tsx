import { Grid } from '@material-ui/core';
import { FC, useEffect, useState } from 'react';
import UserItemCard from './UserItemCard';
import { SellButton } from './SellButton';
import gql from 'graphql-tag';
import { getUserItemQuery, getUserItemQueryVariables } from './__generated__/getUserItemQuery';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { Typography } from '@material-ui/core';
import { Stack } from '@mui/material';
import { CombineButton } from './CombineButton';
import { PartFilter } from '../shop/PartFilter';
import { useSWLazyQuery } from '../utils/useSWLazyQuery';
import { ItemFilter } from '../shop/ItemFilter';
import { filterItemsVar, filterPartVar, getFilterValue, getPartFilterVar } from '../utils/filterVar';
import { useReactiveVar } from '@apollo/client';
import { getItemsInShopQuery_FilterItemsByPrice } from '../shop/__generated__/getItemsInShopQuery';

export const userItemQuery = gql`
  query getUserItemQuery($id: ID!) {
    GetUser(input: { id: $id }) {
      inventory {
        id
        saberPart
        partName
        partDescription
        price
        inShop
        url
        rarity
      }
    }
  }
`;

export type UserItemListProps = { userId: string };
const partFilter: string[] = ['Blade', 'Emitter', 'Switch', 'Body', 'Pommel'];

export const UserItemList: FC<UserItemListProps> = ({ userId }) => {
  const [getItems, { data }] = useSWLazyQuery<getUserItemQuery, getUserItemQueryVariables>(userItemQuery, {
    variables: { id: userId },
  });
  const [sortItemBy, setSortItemBy] = useState<number>(0);
  const filter = useReactiveVar<string>(filterItemsVar);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const filterRender = useReactiveVar<string[]>(filterPartVar);

  useEffect(() => {
    getItems({ variables: { id: userId } });
  }, []);

  const handleChange = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
  ) => {
    setSortItemBy(event.target.value as number);
    getItems({ variables: { id: userId } });
  };

  if (data?.GetUser === null) {
    return <div> something wong </div>;
  }

  return (
    <>
      <Stack direction="row" justifyContent="left" spacing={5} style={{ marginTop: 25, marginBottom: 25 }}>
        <FormControl
          variant="filled"
          color="secondary"
          style={{ backgroundColor: 'ThreeDShadow', width: 200, borderRadius: 5 }}
        >
          <InputLabel>
            <Typography>
              <strong>Show</strong>
            </Typography>
          </InputLabel>
          <Select value={sortItemBy} onChange={handleChange}>
            <MenuItem value={0}>
              <Typography color="primary">
                <strong>Items in inventory</strong>
              </Typography>
            </MenuItem>
            <MenuItem value={1}>
              <Typography color="primary">
                <strong>Items for sale</strong>
              </Typography>
            </MenuItem>
          </Select>
        </FormControl>

        <ItemFilter filterName={'part name'} filterValues={['None', 'Commando', 'Outcast', 'Pathfinder']}></ItemFilter>
        {partFilter.map((filter) => (
          <PartFilter filterName={filter}></PartFilter>
        ))}
      </Stack>

      <Grid container direction="row" spacing={2}>
        {data?.GetUser.inventory
          .filter((item) => item.inShop === !!sortItemBy)
          .filter((item) => item?.partName?.includes(getFilterValue(filter)))
          .filter((item) => filterPart(item, getPartFilterVar()))
          .map((sortedItem) => {
            return (
              <Grid item key={sortedItem?.id} xs={2}>
                <UserItemCard item={sortedItem}>
                  <SellButton itemId={sortedItem?.id} />
                </UserItemCard>
              </Grid>
            );
          })}
      </Grid>
      <div style={{ textAlign: 'center', marginTop: '2em' }}>
        <CombineButton />
      </div>
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
