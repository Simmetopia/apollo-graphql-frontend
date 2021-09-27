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
      <table width="100%">
        <tr >
          <th className="text" align="left">
            <UserDetails userId={id} />
          </th>
          <th className="text">
            <Typography variant="h6" align="left" >
              Items
            </Typography>
          </th>
        </tr>
        <tr>
          <td className={classes.td}></td>
          <td className={classes.td}>
            <Divider variant="middle" />
            <UserItemList userId={id} />
            <GenerateRandomItemButton userId={id} />
          </td>
        </tr>
      </table>
    </>
  );
};


export const UserDetails: FC<{ userId: string }> = ({ userId }) => {
  return <div> User Details </div>
};
