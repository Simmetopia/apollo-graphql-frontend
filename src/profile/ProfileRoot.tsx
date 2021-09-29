import React, { FC } from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import { GenerateRandomItemButton } from './CreateRandomItemButton';
import { UserItemList } from './UserItemList';
import { useLocalData } from '../useLocalData';
import { makeStyles } from '@material-ui/core';
import { useSWQuery } from '../utils/useSWQuery';
import gql from 'graphql-tag';
import { ShowUserDetails, ShowUserDetailsVariables } from './__generated__/ShowUserDetails';

export const showUserDetails = gql`
 query ShowUserDetails($userId: String!) {
  userDetails(userId: $userId) {
   id
   username
   money
 }} 
`

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

  const [{ id, name },] = useLocalData();
  if (!id) {
    return <div> something wong </div>
  }


  return (
    <>
      <div className="grid grid-cols-3">
        <div >
          <UserDetails userId={id} />
        </div>
        <div className="col-span-2">
          <Typography variant="h6" align="left" >
            Items
          </Typography>
          <UserItemList username={name!} />
          <GenerateRandomItemButton userId={id} />
        </div>

      </div>
    </>
  );
};


export const UserDetails: FC<{ userId: string }> = ({ userId }) => {
  const { data } = useSWQuery<ShowUserDetails, ShowUserDetailsVariables>(showUserDetails, ({ variables: { userId } }));

  return (
    <>
      <Typography variant="h4">
        Username: {data?.userDetails?.username}
      </Typography>

      <Typography variant="h4">
        Money: {data?.userDetails?.money}
      </Typography>

    </>
  )
};
