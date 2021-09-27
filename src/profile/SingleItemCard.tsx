import { Card, makeStyles } from "@material-ui/core";
import React, { FC } from "react";
import '../styles/ProfileStyle.css';
import { SWLabelValue } from "./SWLabelValue";
import { ItemDisplayQuery_displayItems } from "./__generated__/ItemDisplayQuery";

const useStyles = makeStyles({
    appBar: {
        minWidth: 350,
        maxWidth: "40%",
        maxHeight: "200px"

    },
});

const SingleItemCard: FC<{ item: ItemDisplayQuery_displayItems }> = ({ children, item }) => {

    const classes = useStyles();

    return (
        <Card className={classes.appBar}>
            <SWLabelValue label="Name:" value={item.partName}></SWLabelValue>
            <SWLabelValue label="Price:" value="{item.price}"></SWLabelValue>
            <SWLabelValue label="Part:" value={item.saberPart}></SWLabelValue>
            <SWLabelValue label="Desc:" value="{item.partDescription}"></SWLabelValue>
            {children}
        </Card>
    );
};
export default SingleItemCard;