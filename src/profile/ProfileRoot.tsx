import React, { FC, useEffect } from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import { UserItemList } from './UserItemList';
import { useLocalData } from '../useLocalData';
import { useSWQuery } from '../utils/useSWQuery';
import gql from 'graphql-tag';
import { ShowUserDetails } from './__generated__/ShowUserDetails';
import { useSubscription } from '@apollo/client';
import { ShowMoney } from './__generated__/ShowMoney';
import { useSWLazyQuery } from '../utils/useSWLazyQuery';

export const showUserDetails = gql`
  query ShowUserDetails {
    userDetails {
      id
      username
      money
    }
  }
`;

const showMoney = gql`
  subscription ShowMoney {
    userMoney
  }
`;

export const ProfileRoot: FC = () => {
  const [{ id, name }] = useLocalData();
  if (!id) {
    return <div> something wong </div>;
  }

  return (
    <>
      <div className="grid grid-cols-3">
        <div>
          <UserDetails />
        </div>
        <div className="col-span-2">
          <Typography variant="h6" align="left">
            Items
          </Typography>
          <UserItemList username={name!} />
        </div>
      </div>
    </>
  );
};

export const UserDetails: FC = () => {
  const [showDetails, { data: dataDetails }] = useSWLazyQuery<ShowUserDetails>(showUserDetails);
  const { data, loading } = useSubscription<ShowMoney>(showMoney);

  useEffect(() => {
    showDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Typography variant="h4">Username: {dataDetails?.userDetails?.username}</Typography>

      <Typography variant="h4">Money: {!loading && data!.userMoney} </Typography>
    </>
  );
};
