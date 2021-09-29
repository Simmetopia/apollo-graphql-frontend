import React, { FC } from 'react';
import { Typography, Card, CardMedia } from '@material-ui/core';
import { getAllItemsQuery_GetAllItems } from '../shop/__generated__/getAllItemsQuery';
import '../shop/Shop.css';
import { getAllItemsInShopQuery_GetAllItemsInShop } from '../shop/__generated__/getAllItemsInShopQuery';

const SingleItemCard: FC<{ item: getAllItemsInShopQuery_GetAllItemsInShop | null }> = ({ children, item }) => {
  if (!item) {
    return <div> something wong </div>;
  }
  var imageBackgroundColor: string = "#dfe6e9"
  if(item.partDescription?.includes("uncommon")){
    imageBackgroundColor = "#00b894"
  } else if(item.partDescription?.includes("rare")) 
  {
    imageBackgroundColor = "#0984e3"
  } else if(item.partDescription?.includes("epic")) 
  {
    imageBackgroundColor = "#6c5ce7"
  } else if(item.partDescription?.includes("LEGENDARY")) 
  {
    imageBackgroundColor = "#fdcb6e"
  }

  return (
    <div className="box">
    <Card className="CardItem" style={{ backgroundColor: 'ThreeDDarkShadow' , height: '100%', border: '3px solid'}}>
      <div className="center" style={{backgroundColor: imageBackgroundColor,  borderRadius: 5, border: '3px solid',}}>
        <img src={item.url ?? ""} alt="Commando Switch" style={{objectFit: 'cover', height: 100}} />
      </div>
     <div style={{display: 'flex', gap: 5}}>
      <Typography color="primary">
        Name:
      </Typography>
      <Typography color="primary">
        <strong>{item.partName}</strong>
      </Typography>
     </div>
      <div style={{display: 'flex', gap: 5}}>
      <Typography color="primary">
        Price:
      </Typography>
      <Typography color="primary">
        <strong>{item.price}</strong>
      </Typography>
      <Typography color="primary">
        coins
      </Typography>
      </div>
      <div style={{display: 'flex', gap: 5}}>
      <Typography color="primary">
        Part:
      </Typography>
      <Typography color="primary">
        <strong>{item.saberPart}</strong>
      </Typography>
      </div>
      <div style={{display: 'flex', gap: 5}}>
      <Typography color="primary">
        Description: 
      </Typography>
      <Typography color="primary">
        <strong>{item.partDescription}</strong>
      </Typography>
      </div>
      {children}
    </Card>
    </div>
  );
};
export default SingleItemCard;
