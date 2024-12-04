import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
  ListItemText,
  Paper,
  Grid,
} from '@mui/material';
import useDebounce from '@/hooks/useDebounce';

// Kiểu dữ liệu cho các bộ lọc
type FilterOption = {
  displayName: string;
  name: string; // Tên bộ lọc, ví dụ: "Danh mục", "Loại khóa học"
  values: string[]; // Danh sách giá trị của bộ lọc
};

// Kiểu dữ liệu cho props của FilterComponent
type FilterProps = {
  filters: FilterOption[]; // Danh sách bộ lọc
  onFilter: (filters: { search: string | any; [key: string]: string[] }) => void; // Callback trả về kết quả lọc
};

const FilterComponent: React.FC<FilterProps> = ({ filters, onFilter }) => {
  const [searchText, setSearchText] = useState<string>('');
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const debouncedSearch: any = useDebounce(searchText, 300);

  // Gửi kết quả sau khi debounce
  useEffect(() => {
    const formattedFilters = Object.keys(selectedFilters).reduce(
      (acc, key) => {
        acc[key] = selectedFilters[key] || [];
        return acc;
      },
      {} as Record<string, string[]>
    );

    // Đảm bảo 'search' được truyền dưới dạng chuỗi thay vì mảng
    onFilter({ search: debouncedSearch, ...formattedFilters });
  }, [debouncedSearch, selectedFilters]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <Box component={Paper} p={2} mb={2}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Tìm kiếm</InputLabel>
            <TextField variant="outlined" fullWidth value={searchText} onChange={handleSearchChange} />
          </FormControl>
        </Grid>

        {filters.map((filter) => (
          <Grid item xs={12} md={3} key={filter.name}>
            <FormControl fullWidth>
              <InputLabel>{filter.displayName}</InputLabel>
              <Select
                multiple
                value={selectedFilters[filter.name] || []}
                onChange={(e) => {
                  // Cập nhật các giá trị đã chọn
                  const selectedValues = e.target.value as string[];
                  setSelectedFilters((prev) => ({
                    ...prev,
                    [filter.name]: selectedValues,
                  }));
                }}
                renderValue={(selected) => selected.join(', ')} // Hiển thị các giá trị đã chọn
              >
                {filter.values.map((value) => (
                  <MenuItem key={value} value={value}>
                    <Checkbox checked={selectedFilters[filter.name]?.includes(value) || false} />
                    <ListItemText primary={value} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FilterComponent;
