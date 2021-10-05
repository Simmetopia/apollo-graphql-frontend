import React, { FC } from 'react';
import { Checkbox } from '@material-ui/core';
import { putFilterInVar, removeFilterFromVar } from '../utils/filterVar';

export type FilterProps = { filterName: string };

export const PartFilter: FC<FilterProps> = ({ filterName }) => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (checked === false) {
        console.log(filterName)
      putFilterInVar(filterName);
      setChecked(event.target.checked);
    } else {
      removeFilterFromVar(filterName);
      setChecked(event.target.checked);
    }
  };

  return (
    <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid' }}>
      <p style={{ marginBottom: 0, marginTop: 0 }}>{filterName}</p>
      <Checkbox style={{ paddingTop: 0, paddingBottom: 0 }} checked={checked} onChange={handleChange} />
    </div>
  );
};
