import React from "react";
import { CreateUserForm } from "./CreateUserForm";
import { styled, makeStyles } from "@material-ui/styles";
import {
  CssBaseline,
  BottomNavigation,
  BottomNavigationAction,
  AppBar
} from "@material-ui/core";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const AppRootDiv = styled("div")({
  minHeight: "100vh",
  minWidth: "100vw",
  height: "100%",
  padding: 50,
  backgroundColor: "rgb(50,50,50)"
});

const localUserQuery = gql`
  query LocalUser {
    localUser @client {
      id
      username
    }
  }
`;

const App: React.FC = () => {
  const { data } = useQuery(localUserQuery);
  const hasActiveUser = !!data && !!data.localUser.id;
  return (
    <AppRootDiv>
      <CssBaseline />
      {!hasActiveUser && <CreateUserForm />}
      {hasActiveUser && <SimpleBottomNavigation />}
    </AppRootDiv>
  );
};

export default App;
