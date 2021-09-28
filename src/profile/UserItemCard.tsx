import React, { FC } from 'react';
import { Typography, Card } from '@material-ui/core';
import { getUserItemQuery_GetUser_inventory } from './__generated__/getUserItemQuery';
import '../shop/Shop.css';

const UserItemCard: FC<{ item: getUserItemQuery_GetUser_inventory | null }> = ({ children, item }) => {
  if (!item) {
    return <div> something wong </div>;
  }

  return (
    <Card className="CardItem" style={{ backgroundColor: 'ThreeDDarkShadow' }}>
      <Typography color="primary">
        <strong>Name: {item.partName}</strong>
      </Typography>
      <Typography color="primary">
        <strong>Part: {item.saberPart}</strong>
      </Typography>
      <Typography color="primary">
        <strong>Description: {item.partDescription}</strong>
      </Typography>
      {item.inShop && <Typography color="primary">
        <strong>You are selling this item for: {item.price}</strong>
        </Typography>
      }
      
      {children}
    </Card>
  );
};
export default UserItemCard;
