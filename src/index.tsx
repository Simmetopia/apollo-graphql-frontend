import React, { FC } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createMuiTheme } from "@material-ui/core/styles";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { ThemeProvider } from "@material-ui/styles";
import { brown } from "@material-ui/core/colors";

/*
 * APOLLO CLIENT SETUP
 */
const client = new ApolloClient({
  uri: "http://localhost:4000",
  clientState: {
    defaults: { localUser: { id: "", username: "", __typename: "User" } }
  }
});

/*
 * Theme setup
 */

const theme = createMuiTheme({
  palette: {
    primary: { main: "#ffd80a" },
    secondary: brown
  }
});
const Bootstrap: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ThemeProvider>
  );
};

ReactDOM.render(<Bootstrap />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
