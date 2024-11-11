
import { Box, Skeleton, Stack, useTheme } from '@mui/material';

const CourseDetailSkeleton: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ bgcolor: theme.palette.background.paper, minHeight: '100vh', color: 'text.primary' }}>
      <Stack direction="row" spacing={4} sx={{ p: 3 }}>
        {/* Left Content */}
        <Stack spacing={3} sx={{ flex: 1 }}>
          {/* Course Title & Rating */}
          <Box>
            <Skeleton variant="text" width="60%" height={40} sx={{ mb: 1 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Skeleton variant="text" width={100} />
              <Skeleton variant="text" width={100} />
            </Box>
          </Box>

          {/* Instructor */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="text" width={150} />
          </Stack>

          {/* Course Description */}
          <Skeleton variant="text" width="90%" />
          <Skeleton variant="text" width="40%" />

          {/* Course Content */}
          <Box sx={{ mt: 4 }}>
            <Skeleton variant="text" width="40%" height={32} sx={{ mb: 2 }} />
            <Skeleton variant="text" width="60%" sx={{ mb: 2 }} />
            
            {/* Chapter List */}
            {[...Array(4)].map((_, index) => (
              <Stack
                key={index}
                sx={{
                  p: 2,
                  mb: 1,
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 1,
                  bgcolor: theme.palette.background.paper2
                }}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Skeleton variant="text" width="70%" />
                <Skeleton variant="text" width="20%" />
              </Stack>
            ))}
          </Box>
        </Stack>

        {/* Right Content */}
        <Box sx={{ width: 400 }}>
          <Box sx={{ position: 'sticky', top: 20 }}>
            {/* Video Preview */}
            <Box sx={{ position: 'relative', mb: 3 }}>
              <Skeleton 
                variant="rectangular" 
                width="100%" 
                height={225} 
                sx={{ borderRadius: 2 }}
              />
            </Box>

            {/* Price */}
            <Stack spacing={2} sx={{ p: 2, bgcolor: theme.palette.background.paper2, borderRadius: 2 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Skeleton variant="text" width={120} height={40} />
                <Skeleton variant="text" width={100} sx={{ opacity: 0.5 }} />
              </Stack>

              {/* Coupon Input */}
              <Stack direction="row" spacing={1}>
                <Skeleton variant="rectangular" width="70%" height={40} sx={{ borderRadius: 1 }} />
                <Skeleton variant="rectangular" width="30%" height={40} sx={{ borderRadius: 1 }} />
              </Stack>

              <Skeleton variant="rectangular" width="100%" height={48} sx={{ borderRadius: 1 }} />

              {/* Course Includes */}
              <Skeleton variant="text" width="50%" height={32} sx={{ mt: 2, mb: 1 }} />
              <Stack spacing={2}>
                {[...Array(3)].map((_, index) => (
                  <Skeleton key={index} variant="text" width="80%" />
                ))}
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default CourseDetailSkeleton;