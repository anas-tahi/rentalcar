import React from 'react';
import { FormControl, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/system';

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(2),
  '& .MuiInputBase-root': {
    fontSize: '1.5rem',
  },
  '& .MuiSelect-select': {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

const CarFilter = ({ filters, setFilters, categories, gasTypes, gearTypes }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
      <StyledFormControl variant="outlined">
        <Select
          displayEmpty
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          renderValue={(selected) => {
            if (selected === "") {
              return <span>Category</span>;
            }
            return selected;
          }}
        >
          <MenuItem value="">
            <span>Category</span>
          </MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>{category}</MenuItem>
          ))}
        </Select>
      </StyledFormControl>

      <StyledFormControl variant="outlined">
        <Select
          displayEmpty
          name="gas"
          value={filters.gas}
          onChange={handleFilterChange}
          renderValue={(selected) => {
            if (selected === "") {
              return <span>Gas Type</span>;
            }
            return selected;
          }}
        >
          <MenuItem value="">
            <span>Gas Type</span>
          </MenuItem>
          {gasTypes.map((gas) => (
            <MenuItem key={gas} value={gas}>{gas}</MenuItem>
          ))}
        </Select>
      </StyledFormControl>

      <StyledFormControl variant="outlined" sx={{ width: 'auto' }}> {/* Adjust the width for sorting dropdown */}
        <Select
          displayEmpty
          name="gear"
          value={filters.gear}
          onChange={handleFilterChange}
          renderValue={(selected) => {
            if (selected === "") {
              return <span>Gear Type</span>;
            }
            return selected;
          }}
        >
          <MenuItem value="">
            <span>Gear Type</span>
          </MenuItem>
          {gearTypes.map((gear) => (
            <MenuItem key={gear} value={gear}>{gear}</MenuItem>
          ))}
        </Select>
      </StyledFormControl>
    </div>
  );
};

export default CarFilter;
