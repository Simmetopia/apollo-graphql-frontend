import React from "react";
import { makeStyles } from "@material-ui/styles";

import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";

import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction
} from "@material-ui/core";

const useStyles = makeStyles({
  appBar: {
    top: "auto",
    bottom: 0,
    backgroundColor: "rgb(51,51,51)"
  },
  darkColor: {
    backgroundColor: "#616161"
  }
});

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();

  return (
    <>
      <div>you have been logged in</div>
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
          <BottomNavigationAction
            color="inherit"
            label="Recents"
            icon={<RestoreIcon />}
          />
          <BottomNavigationAction
            color="inherit"
            label="Favorites"
            icon={<FavoriteIcon />}
          />
          <BottomNavigationAction
            color="inherit"
            label="Nearby"
            icon={<LocationOnIcon />}
          />
        </BottomNavigation>
      </AppBar>
    </>
  );
}
