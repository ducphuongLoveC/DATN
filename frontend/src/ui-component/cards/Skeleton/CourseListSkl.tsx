import { Box, Grid, Skeleton, useTheme } from '@mui/material';

// Skeleton loading component
const CourseListSkl: React.FC = () => {
  const theme = useTheme();
  return (
    <>
      <Box
        width={'100%'}
        height={'50px'}
        sx={{ backgroundColor: theme.palette.background.paper }}
        mb={1}
      ></Box>
      <Grid container spacing={2}>
        {Array(4)
          .fill('')
          .map(() => (
            <Grid item sm={12} md={6}>
              <Box
                sx={{ backgroundColor: theme.palette.background.paper }}
                p={2}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '25px',
                  }}
                >
                  <Skeleton variant="text" width={200} height={40} />
                  <Skeleton variant="circular" width={40} height={40} />
                </Box>
                <Grid container spacing={10}>
                  <Grid item lg={6}>
                    <Grid container spacing={2}>
                      <Grid item>
                        <Skeleton
                          variant="rectangular"
                          width={300}
                          height={60}
                        />
                      </Grid>
                      <Grid item>
                        <Skeleton
                          variant="rectangular"
                          width={120}
                          height={40}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item lg={6}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '10px',
                      }}
                    >
                      <Skeleton variant="text" width={100} />
                      <Skeleton variant="text" width={80} />
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '10px',
                      }}
                    >
                      <Skeleton variant="text" width={100} />
                      <Skeleton variant="text" width={80} />
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '10px',
                      }}
                    >
                      <Skeleton variant="text" width={100} />
                      <Skeleton variant="text" width={80} />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default CourseListSkl;
