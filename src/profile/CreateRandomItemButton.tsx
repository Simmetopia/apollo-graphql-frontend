import gql from "graphql-tag";

import { makeStyles } from "@material-ui/styles";

import { Theme, Button } from "@material-ui/core";

import React, { FC } from "react";

import { useMutation } from "@apollo/react-hooks";
import { UserItemListProps, item_fragment } from "./UserItemList";

const random_item_mutation = gql`
  mutation ItemCreate($userId: ID!) {
    randomItem(userId: $userId) {
      id
      inventory {
        ...item_fragment
      }
    }
  }
  ${item_fragment}
`;

const useStyles = makeStyles<Theme>(theme => ({
  spacer: { marginTop: theme.spacing(1) }
}));

export const GenerateRandomItemButton: FC<UserItemListProps> = ({ userId }) => {
  const [mutation, { loading }] = useMutation(random_item_mutation, {
    variables: { userId }
  });
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      className={classes.spacer}
      color="primary"
      disabled={loading}
      onClick={() => mutation()}
    >
      Generate random item
    </Button>
  );
};
