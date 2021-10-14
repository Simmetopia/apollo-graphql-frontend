import React, { FC } from 'react';
import { ItemFilterQuery_filterItems } from '../shop/__generated__/ItemFilterQuery';
import '../styles/ProfileStyle.css';
import { SWLabelValue } from './SWLabelValue';
import jarjar from '../assets/images/jarjar.png';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  saberPart: {
    color: '#1A1',
    fontSize: '100%',
  },
});
const SingleItemCard: FC<{ item: ItemFilterQuery_filterItems }> = ({ children, item }) => {
  const classes = useStyles();
  return (
    <div className="rounded-md w-full shadow flex flex-col" style={{ backgroundColor: '#646464' }}>
      <img src={jarjar} className="w-full h-auto rounded-t-md"></img>
      <div className="p-2 g-2">
        <div className="flex justify-between">
          <SWLabelValue value={item.PartName!.name} />
          <SWLabelValue value={'' + item.price + ' ₩'} />
        </div>
        <div className="flex justify-between">
          <Typography className={classes.saberPart}>{item.SaberPart!.name}</Typography>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};
export default SingleItemCard;
