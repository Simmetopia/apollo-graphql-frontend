import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FC } from 'react';

const useStyles = makeStyles(() => ({
  cardLabel: {
    color: '#0f0',
  },
}));

type Props = { label?: string; value?: string | null | undefined };
export const SWLabelValue: FC<Props> = ({ label, value }: Props) => {
  const classes = useStyles();

  return (
    <Typography>
      <div className={classes.cardLabel}>
        {label} {value}
      </div>
    </Typography>
  );
};
