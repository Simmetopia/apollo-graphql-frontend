import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createTheme } from '@material-ui/core/styles';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ThemeProvider } from '@material-ui/styles';
import { brown } from '@material-ui/core/colors';

/*
 * APOLLO CLIENT SETUP
 */
const client = new ApolloClient({
  uri: 'http://localhost:4000',
    cache: new InMemoryCache({}),
  // clientState: {
  //   defaults: { localUser: { id: '', username: '', __typename: 'User' } },
  // },
});

/*
 * Theme setup
 */
const theme = createTheme({
  palette: {
    primary: { main: '#ffd80a' },
    secondary: brown,
  },
  typography: { fontFamily: 'Montserrat', allVariants: { color: 'white' } },
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

ReactDOM.render(<Bootstrap />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
