import { MenuItem, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { FC } from "react";
import { useSWLazyQuery } from "../utils/useSWLazyQuery";
import { itemFilterQuery } from "./ShopRoot";
import { ItemFilterQuery, ItemFilterQueryVariables } from "./__generated__/ItemFilterQuery";

const useStyles = makeStyles(() => ({
    cardLabel: {
        color: "#00ff00"
    }
}))

type Props = { label: string, value: string };
export const SWMenuItem: FC<Props> = ({ label, value }) => {
    const [itemFilter, { data, loading }] = useSWLazyQuery<ItemFilterQuery, ItemFilterQueryVariables>(itemFilterQuery, ({ variables: { saberPart: value } }));

    const classes = useStyles();

    return (
        <MenuItem value={value} onClick={() => itemFilter({ variables: { saberPart: value } })}>
            <Typography>
                <p className={classes.cardLabel}>{label}</p>
            </Typography>
        </MenuItem>
    );
}