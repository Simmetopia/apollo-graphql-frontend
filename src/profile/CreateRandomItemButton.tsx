import gql from "graphql-tag";

import { makeStyles } from "@material-ui/styles";

import { Theme, Button } from "@material-ui/core";

import React, { FC } from "react";

import { useMutation } from "@apollo/react-hooks";
import { UserItemListProps } from "./UserItemList";

const random_item_mutation = gql`
  mutation ItemCreate($userId: ID!) {
    randomItem(userId: $userId) {
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

const useStyles = makeStyles<Theme>(theme => ({
  spacer: { marginTop: theme.spacing(1), marginBottom: theme.spacing(2) }
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
