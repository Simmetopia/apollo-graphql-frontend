import React, { FC } from "react";

import { item_fragment as Fragment } from './__generated__/item_fragment';
import { Typography, styled, Card, Theme } from "@material-ui/core";

const ItemCard = styled(Card)<Theme>(({ theme }) => ({
    ...theme.mixins.gutters(),
}));
const SingleItemCard: FC<Fragment> = props => {
    return (
        <ItemCard style={{ backgroundColor: 'grey' }}>
            <Typography>
                <strong>Name: </strong>
                {props.partName}
            </Typography>
            <Typography>
                <strong>Price: </strong>
                {props.price} Pleggat's
      </Typography>
            <Typography>
                <strong>Part: </strong>
                {props.saberPart}
            </Typography>
            <Typography>
                <strong>Desc: </strong>
                {ellipsis(props.partDescription || '', 50)}
            </Typography>
            {props.children}

        </ItemCard>
    );
};
const ellipsis = (data: string, amount?: number) => {
    return data.slice(0, amount || 150) + ' ...';
};
export default SingleItemCard;