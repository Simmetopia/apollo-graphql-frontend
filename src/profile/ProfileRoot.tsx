import React, { FC } from "react";
import { useQuery } from "@apollo/react-hooks";
import { localUserQuery } from "../App";
import Typography from "@material-ui/core/Typography/Typography";
export const ProfileRoot: FC = () => {
  return (
    <>
      <UsernameIdView />
    </>
  );
};

export const UsernameIdView: FC = () => {
  const { data } = useQuery(localUserQuery);
  const {
    localUser: { username, id }
  } = data;
  return (
    <>
      <Typography>
        <strong>Name:</strong> {username}
      </Typography>
      <Typography>
        <strong>shop_id:</strong> {id}
      </Typography>
    </>
  );
};
