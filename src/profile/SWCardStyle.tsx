import { Card, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { FC } from "react";

const useStyles = makeStyles(() => ({
    cardLabel: {
        color: "black",
        width: 40
    }
}))

export const SWCardStyle: FC = () => {

    const classes = useStyles();

    return (
        <Typography >
            <strong className={classes.cardLabel}></strong>
        </Typography>
    );
}