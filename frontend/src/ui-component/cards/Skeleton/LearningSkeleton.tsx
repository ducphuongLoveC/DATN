import { Box, Skeleton, Stack, useTheme } from '@mui/material';

export const ResourceSkeleton: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ flex: 1, p: 2, bgcolor: theme.palette.background.paper }}>
      <Skeleton variant="rectangular" width="100%" height={500} sx={{ mb: 2 }} />

      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="text" width={100} />
      </Stack>

      <Skeleton variant="text" width={200} height={40} sx={{ mb: 1 }} />
      <Skeleton variant="text" width={150} />
    </Box>
  );
};

export const ModulesSkeleton: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ width: 440, p: 2, bgcolor: theme.palette.background.paper }}>
      <Stack spacing={2}>
        <Skeleton variant="text" width={200} height={30} />
        {[...Array(5)].map((_, i) => (
          <Stack key={i} spacing={1}>
            <Skeleton variant="text" width={280} />
            <Skeleton variant="text" width={100} />
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};
