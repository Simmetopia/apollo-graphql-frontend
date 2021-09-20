import React, { FC } from "react";

import { Typography, Card } from "@material-ui/core";

const SingleItemCard: FC = props => {
    return (
        <Card >
            <Typography>
                <strong>Name: </strong>
            </Typography>
            <Typography>
                <strong>Price: </strong>
      </Typography>
            <Typography>
                <strong>Part: </strong>
            </Typography>
            <Typography>
                <strong>Desc: </strong>
            </Typography>
            {props.children}

        </Card>
    );
};
export default SingleItemCard;