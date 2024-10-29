import { Box, styled, Typography, Grid } from '@mui/material';

const BoxMain = styled(Box)(() => ({
  width: '100%',
  height: '100vh',
}));

const NotNoteBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  height: '80%',
}));

const Note: React.FC = () => {
  return (
    <BoxMain>
      <Box p={3}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant={'h3'}>Ghi chú của tôi</Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box>
              <select
                id="filter-notes"
                className="mr-2 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value=''>Lọc theo chương</option>
                <option value={2}>Trong chương này</option>
                <option value={3}>Tất cả trương</option>
              </select>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box>
              <select
                id="filter-date"
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={1}>lọc theo thời gian</option>
                <option value={1}>Cũ đến mới</option>
                <option value={2}>Mới đến cũ</option>
              </select>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <NotNoteBox>
        <Typography variant="h4">Bạn chưa có ghi chú nào</Typography>
        <Typography variant="body1">
          Hãy ghi chép để nhớ những gì bạn đã học!
        </Typography>
      </NotNoteBox>
    </BoxMain>
  );
};

export default Note;
