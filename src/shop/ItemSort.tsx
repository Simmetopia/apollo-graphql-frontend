import { FC, useEffect, useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Typography } from '@material-ui/core';
import { makeVar } from '@apollo/client';

export const sortItemsVar = makeVar<string>('none');

export enum sortVariants {
  ascendingPrice,
  descendingPrice,
  nameAlphabetically,
}

export const ItemSort: FC = () => {
  const [sort, setSort] = useState(sortItemsVar);

  useEffect(() => {
    sortItemsVar(sort);
  }, [sort]);

  return (
    <>
      <FormControl
        variant="filled"
        color="secondary"
        style={{ backgroundColor: 'ThreeDShadow', width: '16em', borderRadius: 5 }}
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
          <MenuItem value={sortVariants.ascendingPrice}>
            <Typography color="primary">
              <strong>Price ascending</strong>
            </Typography>
          </MenuItem>
          <MenuItem value={sortVariants.descendingPrice}>
            <Typography color="primary">
              <strong>Price descending</strong>
            </Typography>
          </MenuItem>
          <MenuItem value={sortVariants.nameAlphabetically}>
            <Typography color="primary">
              <strong>Name alphabetically</strong>
            </Typography>
          </MenuItem>
        </Select>
      </FormControl>
    </>
  );
};
