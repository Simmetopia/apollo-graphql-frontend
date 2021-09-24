import React, { FC } from 'react';
import Typography from '@material-ui/core/Typography/Typography';

import Divider from '@material-ui/core/Divider/Divider';
import { UserItemList } from './UserItemList';
import { useLocalData } from '../useLocalData';

export const ProfileRoot: FC = () => {
  const [{ id }] = useLocalData();
  if (!id) {
    return <div> something wong </div>;
  }
  return (
    <>
      <UserDetails userId={id} />
      <Typography variant="h6" align="center">
        Items
      </Typography>
      <Divider variant="middle" />
      <UserItemList userId={id} />
      
    </>
  );
};

export const UserDetails: FC<{ userId: string }> = ({ userId }) => {
  return <div> User Details </div>;
};
