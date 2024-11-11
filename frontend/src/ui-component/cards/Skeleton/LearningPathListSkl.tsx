import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Skeleton, TablePagination, Typography } from '@mui/material';

const LearningPathSkeletonList = () => {
  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        <Skeleton variant="text" width={200} />
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table sx={{ minWidth: 650 }} aria-label="learning paths skeleton table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Skeleton variant="text" width={100} />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width={100} />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width={200} />
              </TableCell>
              <TableCell align="right">
                <Skeleton variant="text" width={80} />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from(new Array(5)).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton variant="text" width={150} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="rectangular" width={50} height={50} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width={250} />
                </TableCell>
                <TableCell align="right">
                  <Skeleton variant="text" width={60} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={-1} // Không có dữ liệu thực nên đặt là -1
        rowsPerPage={5}
        page={0}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
      />
    </Box>
  );
};

export default LearningPathSkeletonList;