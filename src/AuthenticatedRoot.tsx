import React, { FC } from 'react';
import { makeStyles } from '@material-ui/styles';

import RestoreIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/ShoppingCart';
import LocationOnIcon from '@material-ui/icons/Face';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

import { AppBar, BottomNavigation, BottomNavigationAction, Typography, Divider } from '@material-ui/core';

import { UserDetails, ProfileRoot } from './profile/ProfileRoot';
import { ShopRoot } from './shop/ShopRoot';
import { useLocalData } from './useLocalData';

const useStyles = makeStyles({
  appBar: {
    top: 'auto',
    bottom: 0,
    backgroundColor: 'rgb(51,51,51)',
  },
  darkColor: {
    backgroundColor: '#616161',
  },
});

enum Pages {
  WELCOME,
  PROFILE,
  SHOP,
}

export default function AuthenticatedRoot() {
  const [value, setValue] = React.useState(Pages.WELCOME);
  const classes = useStyles();
  const [_, setData] = useLocalData();

  function logoutUser(): void {
    setData({});
  }

  return (
    <>
      {value === Pages.WELCOME && <WelcomePage />}
      {value === Pages.PROFILE && <ProfileRoot />}
      {value === Pages.SHOP && <ShopRoot />}

      <AppBar position="fixed" className={classes.appBar}>
        <BottomNavigation
          value={value}
          color="secondary"
          onChange={(_, newValue) => {
            setValue(newValue);
          }}
          showLabels
          className={classes.darkColor}
        >
          <BottomNavigationAction color="inherit" label="Welcome" value={Pages.WELCOME} icon={<RestoreIcon />} />
          <BottomNavigationAction color="inherit" label="Shop" value={Pages.SHOP} icon={<FavoriteIcon />} />
          <BottomNavigationAction color="inherit" label="Profile" value={Pages.PROFILE} icon={<LocationOnIcon />} />
          <BottomNavigationAction color="inherit" label="Logout" onClick={logoutUser} icon={<MeetingRoomIcon />} />
        </BottomNavigation>
      </AppBar>
    </>
  );
}

export type LocalUser = { localUser: { username: string; id: string } };
const WelcomePage: FC = () => {
  const [{ id }] = useLocalData();
  if (!id) {
    return <div> what </div>
  }
  return (
    <>
      <Typography variant="h3" color="primary">
        Welcome!
      </Typography>
      <Typography variant="caption">To watto's webshop of doom</Typography>
      <Divider variant="middle" />
      <Typography>
        In this webshop you can find all the parts, all "legally" optained, to build your very own lightsaber.
      </Typography>
      <UserDetails userId={id} />
    </>
  );
};
