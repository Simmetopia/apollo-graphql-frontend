import { FC, useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Typography } from '@material-ui/core';

export type FilterProps = { filterName: string; filterValues: string[] };

export const ItemFilter: FC<FilterProps> = ({ filterName, filterValues }) => {
  const [filter, setFilter] = useState('');
  return (
    <>
      <FormControl
        variant="filled"
        color="secondary"
        style={{ backgroundColor: 'ThreeDShadow', width: 200, borderRadius: 5 }}
      >
        <InputLabel>
          <Typography>
            <strong>Filter {filterName}</strong>
          </Typography>
        </InputLabel>
        <Select value={filter} onChange={(e) => setFilter(e.target.value as string)}>
          {filterValues.map((value) => (
            <MenuItem value={value.toLocaleLowerCase()}>
              <Typography color="primary">
                <strong>{value}</strong>
              </Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
