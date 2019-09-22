import React, { FC } from "react";
import gql from "graphql-tag";
import { styled } from "@material-ui/styles";
import {
  Card,
  Theme,
  LinearProgress,
  Grid,
  Typography
} from "@material-ui/core";
import { useQuery } from "@apollo/react-hooks";
import { UserQuery, UserQueryVariables } from "./__generated__/UserQuery";
import { item_fragment as Fragment } from "./__generated__/item_fragment";

export const item_fragment = gql`
  fragment item_fragment on Item {
    id
    saberPart
    partDescription
    partName
    price
  }
`;

const items_query = gql`
  query UserQuery($id: ID) {
    user(where: { id: $id }) @connection(key: "user_items") {
      id
      inventory {
        ...item_fragment
      }
    }
  }
  ${item_fragment}
`;

export type UserItemListProps = { userId: string };
const ItemCard = styled(Card)<Theme>(({ theme }) => ({
  ...theme.mixins.gutters()
}));

export const UserItemList: FC<UserItemListProps> = ({ userId }) => {
  const { data, loading } = useQuery<UserQuery, UserQueryVariables>(
    items_query,
    {
      variables: { id: userId }
    }
  );
  if (loading || !data || !data.user || !data.user.inventory) {
    return <LinearProgress />;
  }
  const userItems = data.user.inventory;
  return (
    <Grid container direction="column" spacing={1}>
      {userItems.map(item => {
        return (
          <Grid item key={item.id}>
            <SingleItemCard {...item} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export const SingleItemCard: FC<Fragment> = props => {
  return (
    <ItemCard style={{ backgroundColor: "grey" }}>
      <Typography>
        <strong>Name: </strong>
        {props.partName}
      </Typography>
      <Typography>
        <strong>Price: </strong>
        {props.price} Pleggat's
      </Typography>
      <Typography>
        <strong>Part: </strong>
        {props.saberPart}
      </Typography>
      <Typography>
        <strong>Desc: </strong>
        {ellipsis(props.partDescription || "", 50)}
      </Typography>
    </ItemCard>
  );
};
const ellipsis = (data: string, amount?: number) => {
  return data.slice(0, amount || 150) + " ...";
};
