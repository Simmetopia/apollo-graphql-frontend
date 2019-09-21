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

const items_query = gql`
  query UserQuery($id: ID) {
    user(where: { id: $id }) {
      id
      inventory {
        id
        saberPart
        partDescription
        partName
      }
    }
  }
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
      {userItems.map(e => {
        return (
          <Grid item key={e.id}>
            <ItemCard style={{ backgroundColor: "grey" }}>
              <Typography>
                <strong>Name: </strong>
                {e.partName}
              </Typography>
              <Typography>
                <strong>Part: </strong>
                {e.saberPart}
              </Typography>
              <Typography>
                <strong>Desc: </strong>
                {ellipsis(e.partDescription || "", 50)}
              </Typography>
            </ItemCard>
          </Grid>
        );
      })}
    </Grid>
  );
};

const ellipsis = (data: string, amount?: number) => {
  return data.slice(0, amount || 150) + " ...";
};
