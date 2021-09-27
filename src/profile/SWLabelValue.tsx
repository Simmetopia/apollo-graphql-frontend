import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { FC } from "react";

const useStyles = makeStyles(() => ({
    cardLabel: {
        color: "black"

    }
}))

type Props = { label: string, value: string | null };
export const SWLabelValue: FC<Props> = ({ label, value }) => {

    const classes = useStyles();

    return (
        <Typography>
            <strong className={classes.cardLabel}>{label} {value}</strong>
        </Typography>
    );
}