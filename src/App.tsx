import React from 'react';
import { CreateUserForm } from './auth/CreateUserForm';
import { styled } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import AuthenticatedRoot from './AuthenticatedRoot';
import { useLocalData } from './useLocalData';

const AppRootDiv = styled('div')({
  minHeight: '100vh',
  height: '100%',
  padding: 50,
  paddingBottom: 70,
  backgroundColor: 'rgb(50,50,50)',
});

const App: React.FC = () => {
  const [localUser] = useLocalData();
  const hasActiveUser = !!localUser && !!localUser.id;
  return (
    <AppRootDiv>
      <CssBaseline />
      {!hasActiveUser && <CreateUserForm />}
      {hasActiveUser && <AuthenticatedRoot />}
    </AppRootDiv>
  );
};

export default App;
