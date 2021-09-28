import { FC, useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export const SortItemList: FC = () => {
  const [itemSort, setItemSort] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setItemSort(event.target.value as string);
  };

  useEffect(() => {
    console.log(itemSort);
  }, [itemSort]);

  return (
    <>
      <FormControl fullWidth variant="filled" color="primary">
        <InputLabel>Sort items by</InputLabel>
        <Select value={itemSort} onChange={handleChange}>
          <MenuItem value={1}>All items</MenuItem>
          <MenuItem value={2}>Items in shop</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default SortItemList;
