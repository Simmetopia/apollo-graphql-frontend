import { FC, useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Typography } from '@material-ui/core';
import { makeVar } from '@apollo/client';

export const sortItemsVar = makeVar<string>('none');

export const ItemSort: FC = () => {
  const [sort, setSort] = useState(sortItemsVar);
  return (
    <>
      <FormControl
        variant="filled"
        color="secondary"
        style={{ backgroundColor: 'ThreeDShadow', width: 200, borderRadius: 5 }}
      >
        <InputLabel>
          <Typography>
            <strong>Sort by</strong>
          </Typography>
        </InputLabel>
        <Select value={sort} onChange={(e) => setSort(e.target.value as string)}>
          <MenuItem value={'none'}>
            <Typography color="primary">
              <strong>None</strong>
            </Typography>
          </MenuItem>
          <MenuItem value={'low'}>
            <Typography color="primary">
              <strong>Low price</strong>
            </Typography>
          </MenuItem>
          <MenuItem value={'high'}>
            <Typography color="primary">
              <strong>High price</strong>
            </Typography>
          </MenuItem>
        </Select>
      </FormControl>
    </>
  );
};
