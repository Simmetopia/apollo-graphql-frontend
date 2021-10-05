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
import { clearVarItems } from './utils/varUtilities';
import { clearPartFilter } from './utils/filterVar';

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
  const [_, setData] = useLocalData();
  const classes = useStyles();

  function logOutUser() {
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
          <BottomNavigationAction color="inherit" label="Shop" value={Pages.SHOP} icon={<FavoriteIcon />} onClick={() => clearPartFilter()} />
          <BottomNavigationAction color="inherit" label="Profile" value={Pages.PROFILE} icon={<LocationOnIcon />} onClick={() => {clearVarItems(); clearPartFilter()}} />
          <BottomNavigationAction color="inherit" onClick={logOutUser} label="Logout" icon={<MeetingRoomIcon />} />
        </BottomNavigation>
      </AppBar>
    </>
  );
}

export type LocalUser = { localUser: { username: string; id: string } };
const WelcomePage: FC = () => {
  const [{ id }] = useLocalData();
  if (!id) {
    return <div> what </div>;
  }
  return (
    <>
      <div className="star-warsFrontPage" style={{ border: '3px solid', borderRadius: 10 }}>
        
        <h1 >Welcome!</h1>
        <h2 style={{fontSize: 30}}>To watto's webshop of doom</h2>
        
      </div>
      <Divider variant="middle" />
      <Typography>
        In this webshop you can find all the parts, all "legally" optained, to build your very own lightsaber.
      </Typography>
      <UserDetails userId={id} />
      
    </>
  );
};

