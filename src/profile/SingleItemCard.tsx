import React, { FC } from 'react';
import { Typography, Card } from '@material-ui/core';
import { getAllItemsQuery_GetAllItems } from '../shop/__generated__/getAllItemsQuery';
import '../shop/Shop.css';

const SingleItemCard: FC<{ item: getAllItemsQuery_GetAllItems | null }> = ({ children, item }) => {
  if (!item) {
    return <div> something wong </div>;
  }

  return (
    <Card className="CardItem" style={{ backgroundColor: 'ThreeDDarkShadow' }}>
      <Typography color="primary">
        <strong>Name: {item.partName}</strong>
      </Typography>
      <Typography color="primary">
        <strong>Price: {item.price} coins</strong>
      </Typography>
      <Typography color="primary">
        <strong>Part: {item.saberPart}</strong>
      </Typography>
      <Typography color="primary">
        <strong>Description: {item.partDescription}</strong>
      </Typography>
      {children}
    </Card>
  );
};
export default SingleItemCard;
