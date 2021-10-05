import React, { FC } from "react";
import { ItemFilterQuery_filterItems } from "../shop/__generated__/ItemFilterQuery";
import '../styles/ProfileStyle.css';
import { SWLabelValue } from "./SWLabelValue";

const SingleItemCard: FC<{ item: ItemFilterQuery_filterItems }> = ({ children, item }) => {

    return (
        <div className="rounded-md p-3 shadow w-80 flex flex-col gap-3 h-full" style={{ backgroundColor: "#616161" }}>
            <SWLabelValue label="Name:" value={item.PartName!.name}></SWLabelValue>
            <SWLabelValue label="Price:" value={'' + item.price} ></SWLabelValue >
            <SWLabelValue label="Part:" value={item.SaberPart!.name}></SWLabelValue>
            {/* <SWLabelValue label="Description:" value={item.partDescription}></SWLabelValue> */}
            <div>
                {children}
            </div>
        </div >
    );
};
export default SingleItemCard;