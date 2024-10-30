import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';

// Define the data type for the transaction
interface Transaction {
  transactionId: string;
  accountName: string;
  transactionDate: string;
  description: string;
  amount: number;
}

// Define the columns in the table
const columns = [
  { id: 'transactionId', label: 'Mã Giao Dịch', minWidth: 100 },
  { id: 'accountName', label: 'Tên Tài Khoản', minWidth: 150 },
  { id: 'transactionDate', label: 'Ngày Giao Dịch', minWidth: 150 },
  { id: 'description', label: 'Nội Dung Chuyển Khoản', minWidth: 200 },
  {
    id: 'amount',
    label: 'Tổng Tiền',
    minWidth: 120,
    align: 'right' as const,
    format: (value: number) => value.toLocaleString(),
  },
  { id: 'actions', label: 'Hành Động', minWidth: 100 }, // Add actions column
];

const TransactionHistory = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState<Transaction[]>([]);

  // Fetch data from the API
  useEffect(() => {
    fetch('http://localhost:3000/transactionHistory')
      .then((response) => response.json())
      .then((data) => setRows(data))
      .catch((error) =>
        console.error('Error fetching transaction history:', error)
      );
  }, []);

  // Handle page change
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle change in number of rows per page
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Function to handle the detail button click
  const handleViewDetails = (transactionId: string) => {
    // Replace this with your logic to view transaction details
    alert(`Viewing details for transaction ID: ${transactionId}`);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.transactionId}
                >
                  {columns.map((column) => {
                    const value = row[column.id as keyof Transaction];
                    if (column.id === 'actions') {
                      // Render the action button for each row
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleViewDetails(row.transactionId)}
                          >
                            Chi Tiết
                          </Button>
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number'
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TransactionHistory;
