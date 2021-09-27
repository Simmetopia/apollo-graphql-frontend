import React, { FC } from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import { GenerateRandomItemButton } from './CreateRandomItemButton';
import Divider from '@material-ui/core/Divider/Divider';
import { UserItemList } from './UserItemList';
import { useLocalData } from '../useLocalData';
import { Grid, makeStyles } from '@material-ui/core';


const useStyles = makeStyles({
  td: {
    width: "50%"
  },
  text: {
    textAlign: 'left'
  }
});

export const ProfileRoot: FC = () => {
  const classes = useStyles();

  const [{ id }] = useLocalData();
  if (!id) {
    return <div> something wong </div>
  }


  return (
    <>
      <div className="grid grid-cols-3">
        <div className="col-span-2">
          <UserDetails userId={id} />
        </div>
        <div>
          <Typography variant="h6" align="left" >
            Items
          </Typography>
          <UserItemList userId={id} />
          <GenerateRandomItemButton userId={id} />
        </div>

      </div>
    </>
  );
};


export const UserDetails: FC<{ userId: string }> = ({ userId }) => {
  return <div> User Details </div>
};
