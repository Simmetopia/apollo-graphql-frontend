import { Card, makeStyles } from "@material-ui/core";
import React, { FC } from "react";
import '../styles/ProfileStyle.css';
import { SWLabelValue } from "./SWLabelValue";
import { ItemDisplayQuery_displayItems, ItemDisplayQuery_displayItems_PartName, ItemDisplayQuery_displayItems_SaberPart } from "./__generated__/ItemDisplayQuery";

const SingleItemCard: FC<{ item: ItemDisplayQuery_displayItems }> = ({ children, item }) => {
    return (
        <div className="rounded p-3 bg-white shadow flex flex-col gap-3">
            <SWLabelValue label="Name:" value={item.PartName!.name}></SWLabelValue>
            <SWLabelValue label="Price:" value={'' + item.price}></SWLabelValue>
            <SWLabelValue label="Part:" value={item.SaberPart!.name}></SWLabelValue>
            <SWLabelValue label="Desc:" value={item.partDescription}></SWLabelValue>
            <div className="self-end">
                {children}
            </div>
        </div>
    );
};
export default SingleItemCard;