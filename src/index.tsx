import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createTheme } from '@material-ui/core/styles';
import { ApolloClient, ApolloProvider, from, HttpLink, InMemoryCache, concat, split } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { ThemeProvider } from '@material-ui/styles';
import { brown } from '@material-ui/core/colors';
import { SnackbarProvider } from 'notistack';
import { removeUser } from './useLocalData';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = new HttpLink({
  uri: 'https://notacultbruh.herokuappa.com',
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      if (extensions?.code === 'UNAUTHENTICATED') {
        removeUser();
        sessionStorage.removeItem('token');
      }
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
    });

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const wsLink = new WebSocketLink({
  uri: 'wss://notacultbruh.herokuapp.com/subscriptions',
  options: {
    reconnect: true,
  },
  connectionParams: {
    authorization: sessionStorage.getItem('token'),
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  authLink.concat(from([errorLink, httpLink])),
);

/*
 * APOLLO CLIENT SETUP
 */
const client = new ApolloClient({
  link: splitLink, //authLink.concat(from([errorLink, httpLink]))
  cache: new InMemoryCache({}),
  headers: {
    Authorization: 'Bearer ' + sessionStorage.getItem('token'),
  },
  // clientState: {
  //   defaults: { localUser: { id: '', username: '', __typename: 'User' } },
  // },
});

/*
 * Theme setup
 */
const theme = createTheme({
  palette: {
    primary: { main: '#00ff00' },
    secondary: brown,
  },
  typography: { fontFamily: 'Montserrat', allVariants: { color: 'white' } },
});

const Bootstrap: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <SnackbarProvider maxSnack={5}>
          <App />
        </SnackbarProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
};

ReactDOM.render(<Bootstrap />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
