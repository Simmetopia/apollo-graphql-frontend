import { Card, makeStyles } from "@material-ui/core";
import React, { FC } from "react";
import '../styles/ProfileStyle.css';
import { SWLabelValue } from "./SWLabelValue";
import { ItemDisplayQuery_displayItems } from "./__generated__/ItemDisplayQuery";

const SingleItemCard: FC<{ item: ItemDisplayQuery_displayItems }> = ({ children, item }) => {
    return (
        <div className="rounded p-3 bg-purple-600 shadow flex flex-col gap-3">
            <SWLabelValue label="Name:" value={item.partName}></SWLabelValue>
            <SWLabelValue label="Price:" value="{item.price}"></SWLabelValue>
            <SWLabelValue label="Part:" value={item.saberPart}></SWLabelValue>
            <SWLabelValue label="Desc:" value="{item.partDescription}"></SWLabelValue>
            <div className="self-end">
                {children}

            </div>
        </div>
    );
};
export default SingleItemCard;