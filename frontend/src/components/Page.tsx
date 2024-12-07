import { TablePagination } from '@mui/material';
import { useState } from 'react';

interface PageProps {
  page: null | number;
  count: number;
  rowsPerPageOptions: number[];
  onChange: (page: number, rowsPerPage: number) => void;
}

const Page: React.FC<PageProps> = ({ page, count, rowsPerPageOptions, onChange }) => {
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const handlePageChange = (_event: unknown, newPage: number) => {
    onChange(newPage, rowsPerPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    onChange(0, newRowsPerPage);
  };

  return (
    <TablePagination
      rowsPerPageOptions={rowsPerPageOptions}
      component="div"
      count={count}
      rowsPerPage={rowsPerPage}
      page={page ? page - 1 : 0}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
    />
  );
};

export default Page;
