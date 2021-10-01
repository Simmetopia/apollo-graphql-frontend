import { Button, FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import gql from 'graphql-tag';
import React, { FC, useEffect } from 'react';
import { GenerateRandomItemButton } from './CreateRandomItemButton';
import SingleItemCard from '../profile/SingleItemCard';
import { useSWLazyQuery } from '../utils/useSWLazyQuery';
import { BuyButton } from './BuyButton';
import { MarketButton } from './MarketButton';
import { ItemFilterQuery, ItemFilterQueryVariables } from './__generated__/ItemFilterQuery';

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
 }} 
`


const useStyles = makeStyles({
  grid: {
    display: "grid",
    gridTemplateRows: "repeat(3, minmax(0, 4rem))",
    gridTemplateColumns: "repeat(11, minmax(0, 1fr))",
    gap: 20,
    paddingTop: 20,
  }
});

export const ShopRoot: FC = () => {
  const [itemFilter, { data, loading }] = useSWLazyQuery<ItemFilterQuery, ItemFilterQueryVariables>(itemFilterQuery, ({ variables: { saberPart: "" } }));
  const classes = useStyles();

  useEffect(() => {
    itemFilter({ variables: { saberPart: "" } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Typography variant="h3">Watto's webshop</Typography>
      <div className={classes.grid} >
        <FormControl className="col-span-2 w-4/5" variant="filled" style={{ color: "black", minWidth: 130 }}>
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
        {/* <Button className="col-start-1 col-span-2 h-16" color="primary" variant="contained"> Create New Item </Button> */}
        <div className="col-start-1 col-span-2 h-16 w-4/5"><MarketButton ></MarketButton></div>
        <div className="col-start-1 col-span-2 h-16 w-4/5"><GenerateRandomItemButton ></GenerateRandomItemButton></div>
        {/*class="col-start-1 col-span-2 h-16"*/}
        <Grid container spacing={1} direction="row" className="col-span-7 col-start-3 row-span-4 row-start-1">
          {data?.filterItems.map((item) => (
            <Grid item key={item.id}>
              <SingleItemCard item={item}>
                <BuyButton itemId={item.id} />
              </SingleItemCard>
            </Grid>
          ))}
        </Grid>
        <p>|</p>
      </div>
    </>
  );
};