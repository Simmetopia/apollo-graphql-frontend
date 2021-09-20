import { makeStyles } from '@material-ui/styles';

import { Theme, Button } from '@material-ui/core';

import React, { FC } from 'react';

import { UserItemListProps } from './UserItemList';

const useStyles = makeStyles<Theme>(theme => ({
  spacer: { marginTop: theme.spacing(1) },
}));

export const GenerateRandomItemButton: FC<UserItemListProps> = ({ userId }) => {
;
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      className={classes.spacer}
      color="primary"
      disabled={false}
      onClick={console.log}
    >
      Generate random item
    </Button>
  );
};
