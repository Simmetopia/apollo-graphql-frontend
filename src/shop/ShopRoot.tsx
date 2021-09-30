import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import gql from 'graphql-tag';
import React, { FC, useEffect } from 'react';
import SingleItemCard from '../profile/SingleItemCard';
import { useSWLazyQuery } from '../utils/useSWLazyQuery';
import { BuyButton } from './BuyButton';
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

export const ShopRoot: FC = () => {
  const [itemFilter, { data, loading }] = useSWLazyQuery<ItemFilterQuery, ItemFilterQueryVariables>(itemFilterQuery, ({ variables: { saberPart: "" } }));

  useEffect(() => {
    itemFilter({ variables: { saberPart: "" } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Typography variant="h3">Watto's webshop</Typography>
      <div className="grid grid-cols-11">
        <FormControl className="col-span-1" variant="filled" style={{ color: "black", minWidth: 130 }}>
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

        <Grid container spacing={1} direction="row" className="col-span-7 col-start-3">
          {data?.filterItems.map((item) => (
            <Grid item key={item.id}>
              <SingleItemCard item={item}>
                <BuyButton itemId={item.id} />
              </SingleItemCard>
            </Grid>
          ))}
        </Grid>
        <p>p</p>
      </div>
    </>
  );
};