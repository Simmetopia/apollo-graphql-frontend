import { FormControl, IconButton, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import ClearIcon from '@material-ui/icons/Clear';
import gql from 'graphql-tag';
import React, { FC, useEffect, useState } from 'react';
import SingleItemCard from '../profile/SingleItemCard';
import { useLocalData } from '../useLocalData';
import { useSWLazyQuery } from '../utils/useSWLazyQuery';
import { AddCartButton } from './AddCartButton';
import { CartButton } from './CartButton';
import { GenerateRandomItemButton } from './CreateRandomItemButton';
import { MarketButton } from './MarketButton';
import { RemoveCartButton } from './RemoveCartButton';
import { ItemFilterQuery, ItemFilterQueryVariables, ItemFilterQuery_filterItems } from './__generated__/ItemFilterQuery';

export type ItemListPropsName = { value: string };

export const itemFilterQuery = gql`
 query ItemFilterQuery($saberPart: String!) {
  filterItems(saberPart: $saberPart) {
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
    User
    {
      username
    }
    carts
    {
      id
    }
 }} 
`

const useStyles = makeStyles({
  grid: {
    display: "grid",
    gridTemplateRows: "repeat(3, minmax(0, 4rem))",
    gridTemplateColumns: "repeat(13, minmax(0, 1fr))",
    gap: 20,
    paddingTop: 20,
  },
  hideScroll: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
    gridColumnStart: "1",
    gridColumnEnd: "3",
    height: "4rem",
    width: "80%",
    borderRadius: "0.375rem",
    resize: "none",
  }
});

export const ShopRoot: FC = () => {
  var [itemFilter, { data }] = useSWLazyQuery<ItemFilterQuery, ItemFilterQueryVariables>(itemFilterQuery, ({ variables: { saberPart: "" } }));
  const [filter, setFilter] = useState('');
  const [sortData, setData] = useState(data?.filterItems);
  const [sortSelectData, setsortSelectData] = useState('alphabeticalFalling')
  const [filterSelectData, setFilterSelectData] = useState('None')
  const [{ id }] = useLocalData();
  const classes = useStyles();

  function selectButton(filteredItem: ItemFilterQuery_filterItems): React.ReactNode {
    let flag = false

    filteredItem.carts.forEach(item => {
      if (item.id === id) {
        flag = true
      }
    });

    if (flag) {
      return <RemoveCartButton itemId={filteredItem.id} />
    }

    return <AddCartButton itemId={filteredItem.id} />
  }

  useEffect(() => {
    setData(data?.filterItems)
    filterItems('alphabeticalFalling')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    itemFilter({ variables: { saberPart: "" } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filterItems = (value: string) => {
    if (!data?.filterItems) return
    const sortedData = [...data?.filterItems!];
    setsortSelectData(value)
    let sortedStuff;
    switch (value) {
      case 'alphabeticalRising':
        sortedStuff = sortedData.sort((a, b) => b.PartName!.name.localeCompare(a.PartName!.name));
        break;
      case 'alphabeticalFalling':
        sortedStuff = sortedData.sort((a, b) => a.PartName!.name.localeCompare(b.PartName!.name));
        break;
      case 'priceFalling':
        sortedStuff = sortedData.sort((a, b) => a.price! - b.price!);
        break
      case 'priceRising':
        sortedStuff = sortedData.sort((a, b) => b.price! - a.price!);
        break;
      default:
        sortedStuff = sortedData.sort((a, b) => a.PartName!.name.localeCompare(b.PartName!.name));
    }
    setData(sortedStuff);
  }

  const filterItemsByName = (value: string, label: string) => {
    itemFilter({ variables: { saberPart: value } })
    setFilterSelectData(label)
  }

  return (
    <>
      <Typography variant="h3">Watto's webshop</Typography>
      <div className={classes.grid} >

        <textarea id="filter"
          className={classes.hideScroll}
          style={{ backgroundColor: "#616161" }}
          name="filter"
          placeholder="Search for item"
          value={filter}
          onChange={event => setFilter(event.target.value)}
        />

        <FormControl className="col-start-1 col-span-2 w-4/5 rounded-md" variant="filled" style={{ color: "black", minWidth: 130 }}>
          <InputLabel style={{ color: "#00ff00" }}>Filter</InputLabel>

          <Select value={filterSelectData}>
            <MenuItem value="None" onClick={() => filterItemsByName('', 'None')}>
              <Typography color="primary">
                <strong>None</strong>
              </Typography>
            </MenuItem>
            <MenuItem value="Addon" onClick={() => filterItemsByName('Addon', 'Addon')}>
              <Typography color="primary">
                <strong>Addon</strong>
              </Typography>
            </MenuItem>
            <MenuItem value="Body" onClick={() => filterItemsByName('Body', 'Body')}>
              <Typography color="primary">
                <strong>Body</strong>
              </Typography></MenuItem>
            <MenuItem value="Emitter" onClick={() => filterItemsByName('Emitter', 'Emitter')}>
              <Typography color="primary">
                <strong>Emitter</strong>
              </Typography></MenuItem>
            <MenuItem value="Pommel" onClick={() => filterItemsByName('Pommel', 'Pommel')}>
              <Typography color="primary">
                <strong>Pommel</strong>
              </Typography></MenuItem>
            <MenuItem value="Switch" onClick={() => filterItemsByName('Switch', 'Switch')}>
              <Typography color="primary">
                <strong>Switch</strong>
              </Typography></MenuItem>
          </Select>
        </FormControl>

        <FormControl className="col-start-1 col-span-2 w-4/5 rounded-md" variant="filled" style={{ color: "black", minWidth: 130 }}>
          <InputLabel style={{ color: "#00ff00" }}>Sort</InputLabel>
          <Select value={sortSelectData}>
            <MenuItem value="alphabeticalFalling" onClick={() => filterItems('alphabeticalFalling')}>
              <Typography color="primary">
                <strong>Alphabetical ↓ </strong>
              </Typography>
            </MenuItem>
            <MenuItem value="alphabeticalRising" onClick={() => filterItems('alphabeticalRising')}>
              <Typography color="primary">
                <strong>Alphabetical ↑ </strong>
              </Typography>
            </MenuItem>
            <MenuItem value="priceFalling" onClick={() => filterItems('priceFalling')}>
              <Typography color="primary">
                <strong>Price ↓ </strong>
              </Typography>
            </MenuItem>
            <MenuItem value="priceRising" onClick={() => filterItems('priceRising')}>
              <Typography color="primary">
                <strong>Price ↑ </strong>
              </Typography>
            </MenuItem>
          </Select>
        </FormControl>

        <div className="col-start-1 col-span-2 h-16 w-4/5"><MarketButton /></div>
        <div className="col-start-1 col-span-2 h-16 w-4/5"><GenerateRandomItemButton /></div>
        <div className="col-start-1 col-span-2 h-16 w-4/5 text-center"><CartButton /></div>
        <Grid container spacing={1} direction="row" className="col-span-7 col-start-3 row-span-7 row-start-1">
          {sortData?.filter(item => item.PartName?.name.toLowerCase().includes(filter.toLowerCase())).map(filteredItem => (
            <Grid item key={filteredItem.id}>
              <SingleItemCard item={filteredItem}>
                {selectButton(filteredItem)}
              </SingleItemCard>
            </Grid>
          ))}
        </Grid>

      </div>
    </>
  );
};
