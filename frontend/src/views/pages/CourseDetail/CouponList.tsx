import { Box, Button, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material';
import moment from 'moment';
interface CouponListProps {
  coupons: any;
  onChange: (code: string) => void;
}

const CouponList: React.FC<CouponListProps> = ({ coupons, onChange }) => {
  const theme = useTheme();
  return (
    <Grid container spacing={2}>
      {coupons?.map((c: any) => (
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              height: '120px',
              display: 'flex',
              alignItems: 'center',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
              mt: 1,
            }}
          >
            <Box
              width={'30%'}
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: theme.palette.background.paper2,
                height: '100%',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h2">
                {c.discount_value}{' '}
                {(() => {
                  switch (c.discount_type) {
                    case 'percentage':
                      return '%';
                  }
                })()}
              </Typography>
            </Box>
            <Box sx={{ ml: 2 }} display={'flex'} justifyContent={'center'} alignItems={'center'}>
              <Box>
                <Typography my={1} variant="h4">
                  {c.code}
                </Typography>
                <Typography>
                  giá trị giảm {c.discount_value}
                  {(() => {
                    switch (c.discount_type) {
                      case 'percentage':
                        return '%';
                    }
                  })()}
                </Typography>
                <Typography> số lượng còn {c.max_uses - c.used_count}</Typography>
                <Typography variant="caption">hạn sử dụng: {moment(c.end_date).format('HH:mm DD-MM-YYYY')}</Typography>
              </Box>
              <Box>
                <Button onClick={() => onChange(c.code)} sx={{ ml: 2 }} variant="outlined">
                  Dùng
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};
export default CouponList;
