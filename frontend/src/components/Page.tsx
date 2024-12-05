import { TablePagination } from '@mui/material';
import { useState } from 'react';

interface PageProps {
  count: number; 
  rowsPerPageOptions: number[]; 
  onChange: (page: number, rowsPerPage: number) => void;
}

const Page: React.FC<PageProps> = ({ count, rowsPerPageOptions, onChange }) => {
  
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]); 
  const [page, setPage] = useState(1);

  
  const handlePageChange = (_event: unknown, newPage: number) => {
    setPage(newPage);
    onChange(newPage, rowsPerPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage); 
    setPage(0); 
    onChange(0, newRowsPerPage); 
  };

  return (
    <TablePagination
      rowsPerPageOptions={rowsPerPageOptions}
      component="div"
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
    />
  );
};

export default Page;
