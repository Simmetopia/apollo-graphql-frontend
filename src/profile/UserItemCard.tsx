import React, { FC } from 'react';
import { Typography, Card, makeStyles, Checkbox } from '@material-ui/core';
import { getUserItemQuery_GetUser_inventory } from './__generated__/getUserItemQuery';
import '../shop/Shop.css';
import { clearVarItems, putItemInVar, removeItemFromVar } from '../utils/varUtilities'

const style = makeStyles({
  divStyle: {
    borderRadius: '50%',
    outline: 'solid',
    outlineOffset: '-1px',
    backgroundColor: '#8e8e8e',
    height: 130,
    width: 130,
    margin: '0 auto',
    textAlign: 'center',
    objectFit: 'contain',
    position: 'relative',
    marginBottom: '1em',
    boxShadow: '0px 0px 18px black',
  },
  imgStyle: {
    objectFit: 'contain',
    maxHeight: 120,
    maxWidth: 120,
    position: 'relative',
    top: '50%',
    height: 120,
    marginTop: -60,
  },
  cardStyle: {
    backgroundColor: 'ThreeDDarkShadow',
    height: '100%',
    boxShadow: '3px 3px 8px black',
    borderRadius: '5%',
    padding: '1em',
    position: 'relative',
  },
  textCenter: {
    textAlign: 'center',
  },
  center: {
    display: 'flex',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const UserItemCard: FC<{ item: getUserItemQuery_GetUser_inventory | null }> = ({ children, item }) => {
  const [checked, setChecked] = React.useState(false);
  clearVarItems();
  if (!item) {
    return <div> something wong </div>;
  }

  var imageBackgroundColor: string = '#dfe6e9';
  if (item.partDescription?.includes('uncommon')) {
    imageBackgroundColor = '#00b894';
  } else if (item.partDescription?.includes('rare')) {
    imageBackgroundColor = '#0984e3';
  } else if (item.partDescription?.includes('epic')) {
    imageBackgroundColor = '#6c5ce7';
  } else if (item.partDescription?.includes('LEGENDARY')) {
    imageBackgroundColor = '#fdcb6e';
  }

  const classes = style();

  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(checked === true){ 
      removeItemFromVar(item)
      setChecked(event.target.checked);
    } else {
      putItemInVar(item)
      setChecked(event.target.checked);
    }
  };

  return (
    <div className="box">
      <Card className={classes.cardStyle}>
        <div className={classes.divStyle} style={{ outlineColor: imageBackgroundColor }}>
          <img src={item.url ?? ''} alt="Card url" className={classes.imgStyle} />
        </div>
        <div className={classes.textCenter}>
          <div className={classes.center}>
            <Typography color="primary">Name:</Typography>
            <Typography color="primary">
              <strong>{item.partName}</strong>
            </Typography>
          </div>
          <div className={classes.center}>
            <Typography color="primary">Part:</Typography>
            <Typography color="primary">
              <strong>{item.saberPart}</strong>
            </Typography>
          </div>
          <div className={classes.center}>
            <Typography color="primary">Description:</Typography>
          </div>
          <div style={{ height: '3em' }}>
            <Typography color="primary">
              <strong>{item.partDescription}</strong>
            </Typography>
          </div>
          <div style={{ height: '3em' }}>
            {item.inShop && (
              <div className={classes.center}>
                <Typography color="primary">Selling price:</Typography>
                <Typography color="primary">
                  <strong>{item.price}</strong>
                </Typography>
                <Typography color="primary">coins</Typography>
              </div>
            )}
          </div>
        <Checkbox checked={checked} onChange={handleChange}/>
        {children}
        </div>
      </Card>
    </div>
  );
};
export default UserItemCard;
