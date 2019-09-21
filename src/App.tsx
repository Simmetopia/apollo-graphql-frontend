import React from "react";
import { CreateUserForm } from "./CreateUserForm";
import { styled } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import AuthenticatedRoot from "./AuthenticatedRoot";

const AppRootDiv = styled("div")({
  minHeight: "100vh",
  minWidth: "100vw",
  height: "100%",
  padding: 50,
  paddingBottom: 70,
  backgroundColor: "rgb(50,50,50)"
});

export const localUserQuery = gql`
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
      {hasActiveUser && <AuthenticatedRoot />}
    </AppRootDiv>
  );
};

export default App;
