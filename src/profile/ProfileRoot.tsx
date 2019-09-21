import React, { FC } from "react";
import { useQuery } from "@apollo/react-hooks";
import { localUserQuery } from "../App";
import Typography from "@material-ui/core/Typography/Typography";
import { GenerateRandomItemButton } from "./CreateRandomItemButton";
import Divider from "@material-ui/core/Divider/Divider";
import { UserItemList } from "./UserItemList";

export const ProfileRoot: FC = () => {
  const { data } = useQuery(localUserQuery);
  const {
    localUser: { id }
  } = data;
  return (
    <>
      <UsernameIdView />
      <Typography variant="h6" align="center">
        Items
      </Typography>
      <Divider variant="middle" />
      <UserItemList userId={id} />
      <GenerateRandomItemButton userId={id} />
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
