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
    borderRadius: "0.375rem"
  }
});

export const ShopRoot: FC = () => {
  const [itemFilter, { data, loading }] = useSWLazyQuery<ItemFilterQuery, ItemFilterQueryVariables>(itemFilterQuery, ({ variables: { saberPart: "" } }));
  const [filter, setFilter] = useState('');
  const [{ id }] = useLocalData();
  const classes = useStyles();

  function selectButton(filteredItem: ItemFilterQuery_filterItems): React.ReactNode {
    let flag = false

    filteredItem.carts.map(item => {
      if(item.id == id) {
        flag = true
      }
    });
    
    if(flag) {
      return <RemoveCartButton itemId={filteredItem.id} />
    }

    return <AddCartButton itemId={filteredItem.id} />
  }

  useEffect(() => {
    itemFilter({ variables: { saberPart: "" } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Typography variant="h3">Watto's webshop</Typography>
      <div className={classes.grid} >
        <FormControl className="col-span-2 w-4/5 rounded-md" variant="filled" style={{ color: "black", minWidth: 130 }}>
          <InputLabel style={{ color: "#00ff00" }}>Filter</InputLabel>

          <Select label="Sort items">
            <MenuItem value="" onClick={() => itemFilter({ variables: { saberPart: "" } })}>
              <Typography color="primary">
                <strong>None</strong>
              </Typography>
            </MenuItem>
            <MenuItem value="Addon" onClick={() => itemFilter({ variables: { saberPart: "Addon" } })}>
              <Typography color="primary">
                <strong>Addon</strong>
              </Typography>
            </MenuItem>
            <MenuItem value="Body" onClick={() => itemFilter({ variables: { saberPart: "Body" } })}>
              <Typography color="primary">
                <strong>Body</strong>
              </Typography></MenuItem>
            <MenuItem value="Emitter" onClick={() => itemFilter({ variables: { saberPart: "Emitter" } })}>
              <Typography color="primary">
                <strong>Emitter</strong>
              </Typography></MenuItem>
            <MenuItem value="Pommel" onClick={() => itemFilter({ variables: { saberPart: "Pommel" } })}>
              <Typography color="primary">
                <strong>Pommel</strong>
              </Typography></MenuItem>
            <MenuItem value="Switch" onClick={() => itemFilter({ variables: { saberPart: "Switch" } })}>
              <Typography color="primary">
                <strong>Switch</strong>
              </Typography></MenuItem>
          </Select>
        </FormControl>
        <textarea id="filter"
          className={classes.hideScroll}
          style={{ backgroundColor: "#616161" }}
          name="filter"
          value={filter}
          onChange={event => setFilter(event.target.value)}
        />
        <div className="col-start-1 col-span-2 h-16 w-4/5"><MarketButton/></div>
        <div className="col-start-1 col-span-2 h-16 w-4/5"><GenerateRandomItemButton/></div>
        <div className="col-start-1 col-span-2 h-16 w-4/5 text-center"><CartButton/></div>
        <Grid container spacing={1} direction="row" className="col-span-8 col-start-4 row-span-6 row-start-1">
          {data?.filterItems.filter(item => item.PartName?.name.toLowerCase().includes(filter.toLowerCase())).map(filteredItem => (
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
