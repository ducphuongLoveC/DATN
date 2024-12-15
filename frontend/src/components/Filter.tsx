import React, { useState } from 'react';
import {
  Box,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
  ListItemText,
  Paper,
  Grid,
  Button,
} from '@mui/material';

type FilterProps = {
  filters: any;
  onFilter: (filters: any) => void;
};

const FilterComponent: React.FC<FilterProps> = ({ filters, onFilter }) => {
  const [searchText, setSearchText] = useState<string>('');
  const [selectedFilters, setSelectedFilters] = useState<Record<string, any[]>>({});

  // Gửi kết quả sau khi debounce
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleFilter = () => {
    console.log(selectedFilters);

    const data = Object.keys(selectedFilters).reduce(
      (result, filterName) => {
        const selectedItems = selectedFilters[filterName];
        const filter = filters.find((f: any) => f.name === filterName);

        // Kiểm tra xem filter có tồn tại hay không
        if (!filter || !selectedItems || selectedItems.length === 0) return result;

        // Không cần phải lọc theo `selected` nữa, chỉ sử dụng value trực tiếp
        const filteredData = selectedItems.map((value: any) => {
          return { value: value.value, display: value.display };
        });

        // Thêm vào đối tượng kết quả với key là filterName
        if (filteredData.length > 0) {
          result[filterName] = filteredData;
        }

        return result;
      },
      {} as Record<string, any>
    );

    // Gửi kết quả filter với searchText và các giá trị lọc
    onFilter({ search: searchText, ...data });
  };

  return (
    <Box component={Paper} p={2} mb={2}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField label="Tìm kiếm" variant="outlined" fullWidth value={searchText} onChange={handleSearchChange} />
          </FormControl>
        </Grid>

        {filters.map((filter: any) => (
          <Grid item xs={12} md={2} key={filter.name}>
            <FormControl fullWidth>
              <InputLabel>{filter.displayName}</InputLabel>
              <Select
                label={filter.displayName}
                multiple
                value={selectedFilters[filter.name] || []}
                onChange={(e) => {
                  const selectedValues = e.target.value as any[];

                  setSelectedFilters((prev) => ({
                    ...prev,
                    [filter.name]: selectedValues,
                  }));
                }}
                renderValue={(selecteds) => {
                  return selecteds.map((s) => s.display).join(', ');
                }}
              >
                {filter?.values?.map((value: any) => (
                  <MenuItem key={value.value} value={value}>
                    <Checkbox checked={selectedFilters[filter.name]?.includes(value) || false} />
                    <ListItemText primary={value.display} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        ))}

        <Grid item xs={12} md={2}>
          <FormControl fullWidth>
            <Button sx={{ p: 1.5 }} onClick={handleFilter} variant="outlined">
              Áp dụng
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FilterComponent;
