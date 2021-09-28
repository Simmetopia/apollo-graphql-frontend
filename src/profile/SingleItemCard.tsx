import React, { FC } from "react";
import '../styles/ProfileStyle.css';
import { SWLabelValue } from "./SWLabelValue";
import { ItemDisplayQuery_displayItems } from "./__generated__/ItemDisplayQuery";

const SingleItemCard: FC<{ item: ItemDisplayQuery_displayItems }> = ({ children, item }) => {

    return (
        <div className="rounded p-3 shadow w-96 flex flex-col gap-3" style={{ backgroundColor: "#616161", height: "100%" }}>
            <SWLabelValue label="Name:" value={item.PartName!.name}></SWLabelValue>
            <SWLabelValue label="Price:" value={'' + item.price} ></SWLabelValue >
            <SWLabelValue label="Part:" value={item.SaberPart!.name}></SWLabelValue>
            <SWLabelValue label="Description:" value={item.partDescription}></SWLabelValue>
            <div>
                {children}
            </div>
        </div >
    );
};
export default SingleItemCard;