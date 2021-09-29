import { Grid } from '@material-ui/core';
import { FC, useState } from 'react';
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
      <FormControl
        variant="filled"
        color="secondary"
        fullWidth
        style={{ marginTop: 25, marginBottom: 25, backgroundColor: 'ThreeDShadow' }}
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
