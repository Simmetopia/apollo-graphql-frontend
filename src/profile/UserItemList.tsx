import { Grid } from '@material-ui/core';
import { FC, useEffect, useState } from 'react';
import UserItemCard from './UserItemCard';
import { SellButton } from './SellButton';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { getUserItemQuery, getUserItemQueryVariables } from './__generated__/getUserItemQuery';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { Typography } from '@material-ui/core';
import { Stack } from '@mui/material';

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
      }
    }
  }
`;

export type UserItemListProps = { userId: string };

export const UserItemList: FC<UserItemListProps> = ({ userId }) => {
  const { data } = useQuery<getUserItemQuery, getUserItemQueryVariables>(userItemQuery, { variables: { id: userId } });
  const [sortItemBy, setSortItemBy] = useState(1);

  const handleChange = (event: any) => {
    setSortItemBy(event.target.value);
  };

  if (data?.GetUser === null) {
    return <div> something wong </div>;
  }

  return (
    <>
      <Stack direction="row" justifyContent="center" spacing={5} style={{ marginTop: 25, marginBottom: 25 }}>
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
            <MenuItem value={1}>
              <Typography color="primary">
                <strong>All items</strong>
              </Typography>
            </MenuItem>
            <MenuItem value={2}>
              <Typography color="primary">
                <strong>Items in shop</strong>
              </Typography>
            </MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Grid container direction="column" spacing={1}>
        {data?.GetUser.inventory.map((item) => {
          if (sortItemBy === 1) {
            return (
              <Grid item key={item?.id}>
                <UserItemCard item={item}>
                  <SellButton itemId={item?.id} />
                </UserItemCard>
              </Grid>
            );
          } else {
            if (item.inShop === true)
              return (
                <Grid item key={item?.id}>
                  <UserItemCard item={item}>
                    <SellButton itemId={item?.id} />
                  </UserItemCard>
                </Grid>
              );
          }
        })}
      </Grid>
    </>
  );
};
