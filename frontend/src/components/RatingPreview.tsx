// import {
//   Box,
//   Typography,
//   LinearProgress,
//   Grid,
//   Button,
//   TextField,
//   Alert,
//   TablePagination,
//   FormControl,
//   Select,
//   MenuItem,
// } from '@mui/material';
// import StarRatings from 'react-star-ratings';
// import { useState } from 'react';

// interface RatingPreviewProps {
//   user_id?: string;
//   comments: any;
//   ratingCounts: number[];
//   mode: 'view' | 'edit';
//   onChange?: (newRating: number, newComment: string) => void;
//   onStar: (star: string) => void;
// }

// export const RatingPreview: React.FC<RatingPreviewProps> = ({
//   user_id,
//   comments,
//   ratingCounts,
//   mode = 'view',
//   onChange,
//   onStar,
// }) => {
//   const totalRatings = ratingCounts.reduce((sum, count) => sum + count, 0);

//   let averageRating = 0;
//   if (totalRatings > 0) {
//     averageRating = ratingCounts.reduce((sum, count, index) => sum + count * (index + 1), 0) / totalRatings;
//   }

//   const [comment, setComment] = useState<any>('');
//   const [selectedRating, setSelectedRating] = useState(averageRating);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(4);

//   const handleRatingChange = (newRating: number) => {
//     setSelectedRating(newRating);
//   };

//   const handleSubmit = () => {
//     if (onChange) {
//       onChange(selectedRating, comment);
//     }
//   };

//   const handleChangePage = (_event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   // Lấy các bình luận cho trang hiện tại
//   const displayedComments = comments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   return (
//     <Box mt="var(--medium-space)">
//       <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
//         <Typography variant="h3" component="span" sx={{ fontWeight: 'bold', mr: 2 }}>
//           {averageRating.toFixed(1)}
//         </Typography>
//         <Box>
//           <StarRatings
//             rating={averageRating}
//             starRatedColor="#FFA41C"
//             numberOfStars={5}
//             starDimension="24px"
//             starSpacing="2px"
//           />
//           <Typography variant="body2" color="text.secondary">
//             {totalRatings} tổng số đánh giá
//           </Typography>
//         </Box>
//       </Box>
//       <Box>
//         {ratingCounts.map((count, index) => (
//           <Grid container spacing={2} alignItems="center" key={index} sx={{ mb: 1 }}>
//             <Grid item xs={2}>
//               <Typography variant="body2" color="text.secondary">
//                 {index + 1} sao
//               </Typography>
//             </Grid>
//             <Grid item xs={8}>
//               <LinearProgress
//                 variant="determinate"
//                 value={count === 0 ? 0 : (count / totalRatings) * 100}
//                 sx={{ height: 8, borderRadius: 4 }}
//               />
//             </Grid>
//             <Grid item xs={2}>
//               <Typography variant="body2" color="text.secondary" align="right">
//                 {count}
//               </Typography>
//             </Grid>
//           </Grid>
//         ))}
//       </Box>

//       {/* Bộ lọc số sao */}
//       <Box mb={2}>
//         <Typography variant="body2" color="text.secondary" mb={1}>
//           Lọc theo số sao:
//         </Typography>
//         <FormControl fullWidth>
//           <Select
//             defaultValue=""
//             onChange={(e) => {
//               const value = e.target.value as string;
//               onStar(value);
//             }}
//             displayEmpty
//           >
//             <MenuItem selected value="">
//               Tất cả
//             </MenuItem>
//             {[1, 2, 3, 4, 5].map((star) => (
//               <MenuItem key={star} value={star}>
//                 {star} Sao
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </Box>

//       <Box mt={2} py={3} borderRadius={2}>
//         <Typography mb={2} variant="body2" color="text.secondary">
//           Người dùng đánh giá:
//         </Typography>
//         {comments.length > 0 ? (
//           displayedComments.map((c: any) => (
//             <Box
//               key={c._id}
//               display={'flex'}
//               flexDirection={'column'}
//               mb={2}
//               p={2}
//               borderRadius={2}
//               sx={{
//                 backgroundColor: (theme) => theme.palette.background.default,
//                 boxShadow: 2,
//                 '&:hover': { boxShadow: 5 },
//               }}
//             >
//               <Box display={'flex'} justifyContent={'space-between'} mb={1}>
//                 <Typography variant="h6" fontWeight="bold">
//                   {c.user.name} {user_id === c.user._id && '( bạn )'}
//                 </Typography>
//                 <Typography variant="body2" color="textSecondary">
//                   {new Date(c.createdAt).toLocaleDateString()}
//                 </Typography>
//               </Box>
//               <Typography variant="body1" mb={2} sx={{ lineHeight: 1.6 }}>
//                 {c.comment}
//               </Typography>
//               <StarRatings
//                 rating={c.stars}
//                 starRatedColor="#FFA41C"
//                 numberOfStars={5}
//                 starDimension="24px"
//                 starSpacing="2px"
//               />
//             </Box>
//           ))
//         ) : (
//           <Typography>Không có người dùng đánh giá</Typography>
//         )}
//         <TablePagination
//           rowsPerPageOptions={[4, 8, 12]}
//           component="div"
//           count={comments.length}
//           page={page}
//           onPageChange={handleChangePage}
//           rowsPerPage={rowsPerPage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Box>

//       {mode === 'edit' && (
//         <Box mt={2}>
//           <Typography variant="body2" color="text.secondary">
//             Chọn số sao đánh giá:
//           </Typography>
//           <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
//             <StarRatings
//               rating={selectedRating}
//               starRatedColor="#FFA41C"
//               numberOfStars={5}
//               starDimension="40px"
//               starSpacing="5px"
//               changeRating={handleRatingChange}
//             />
//           </Box>
//           <Box mt={2}>
//             <TextField
//               label="Nhập suy nghĩ của bạn"
//               onChange={(e) => setComment(e.target.value)}
//               fullWidth
//               multiline
//               rows={4}
//               sx={{
//                 minHeight: 120,
//                 fontSize: '16px',
//               }}
//               variant="outlined"
//             />
//             <Alert severity="info">Vui lòng thận trọng trước khi đánh giá. Sau khi đánh giá không thể sửa</Alert>
//             <Button sx={{ mt: 2 }} variant="contained" color="primary" onClick={handleSubmit}>
//               Gửi đánh giá
//             </Button>
//           </Box>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default RatingPreview;

import {
  Box,
  Typography,
  LinearProgress,
  Grid,
  Button,
  TextField,
  Alert,
  TablePagination,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import StarRatings from 'react-star-ratings';
import { useState } from 'react';
import moment from 'moment';

interface RatingPreviewProps {
  user_id?: string;
  comments: any;
  ratingCounts: number[];
  mode: 'view' | 'edit';
  onChange?: (newRating: number, newComment: string) => void;
}

export const RatingPreview: React.FC<RatingPreviewProps> = ({
  user_id,
  comments,
  ratingCounts,
  mode = 'view',
  onChange,
}) => {
  const totalRatings = ratingCounts.reduce((sum, count) => sum + count, 0);

  let averageRating = 0;
  if (totalRatings > 0) {
    averageRating = ratingCounts.reduce((sum, count, index) => sum + count * (index + 1), 0) / totalRatings;
  }

  const [comment, setComment] = useState<any>('');
  const [selectedRating, setSelectedRating] = useState(averageRating);
  const [selectedStar, setSelectedStar] = useState<number | null>(null); // Manage selected star filter
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);

  const handleRatingChange = (newRating: number) => {
    setSelectedRating(newRating);
  };

  const handleSubmit = () => {
    if (onChange) {
      onChange(selectedRating, comment);
    }
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter comments based on selectedStar
  const filteredComments = selectedStar ? comments.filter((c: any) => c.stars === selectedStar) : comments;

  // Lấy các bình luận cho trang hiện tại
  const displayedComments = filteredComments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box mt="var(--medium-space)">
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Typography variant="h3" component="span" sx={{ fontWeight: 'bold', mr: 2 }}>
          {averageRating.toFixed(1)}
        </Typography>
        <Box>
          <StarRatings
            rating={averageRating}
            starRatedColor="#FFA41C"
            numberOfStars={5}
            starDimension="24px"
            starSpacing="2px"
          />
          <Typography variant="body2" color="text.secondary">
            {totalRatings} tổng số đánh giá
          </Typography>
        </Box>
      </Box>
      <Box>
        {ratingCounts.map((count, index) => (
          <Grid container spacing={2} alignItems="center" key={index} sx={{ mb: 1 }}>
            <Grid item xs={2}>
              <Typography variant="body2" color="text.secondary">
                {index + 1} sao
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <LinearProgress
                variant="determinate"
                value={count === 0 ? 0 : (count / totalRatings) * 100}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2" color="text.secondary" align="right">
                {count}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Box>

      {/* Bộ lọc số sao */}
      <Box mb={2}>
        <Typography variant="body2" color="text.secondary" mb={1}>
          Lọc theo số sao:
        </Typography>
        <FormControl fullWidth>
          <Select
            value={selectedStar || ''}
            onChange={(e) => {
              const value = e.target.value as string;
              setSelectedStar(value === '' ? null : parseInt(value));
            }}
            displayEmpty
          >
            <MenuItem selected value="">
              Tất cả
            </MenuItem>
            {[1, 2, 3, 4, 5].map((star) => (
              <MenuItem key={star} value={star}>
                {star} Sao
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box mt={2} py={3} borderRadius={2}>
        <Typography mb={2} variant="body2" color="text.secondary">
          Người dùng đánh giá:
        </Typography>
        {displayedComments.length > 0 ? (
          displayedComments.map((c: any) => (
            <Box
              key={c._id}
              display={'flex'}
              flexDirection={'column'}
              mb={2}
              p={2}
              borderRadius={2}
              sx={{
                backgroundColor: (theme) => theme.palette.background.default,
                boxShadow: 2,
                '&:hover': { boxShadow: 5 },
              }}
            >
              <Box display={'flex'} justifyContent={'space-between'} mb={1}>
                <Typography variant="h6" fontWeight="bold">
                  {c.user.name} - {c.user.email} {user_id === c.user._id && '( bạn )'}
                </Typography>
                <Typography variant="h6" fontWeight="bold"></Typography>

                <Typography variant="body2" color="textSecondary">
                  {moment(c.createdAt).format('YYYY-MM-DD - HH:mm:ss')}
                </Typography>
              </Box>
              <Typography variant="body1" mb={2} sx={{ lineHeight: 1.6 }}>
                {c.comment}
              </Typography>
              <StarRatings
                rating={c.stars}
                starRatedColor="#FFA41C"
                numberOfStars={5}
                starDimension="24px"
                starSpacing="2px"
              />
            </Box>
          ))
        ) : (
          <Typography>Không có người dùng đánh giá</Typography>
        )}
        <TablePagination
          rowsPerPageOptions={[4, 8, 12]}
          component="div"
          count={filteredComments.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>

      {mode === 'edit' && (
        <Box mt={2}>
          <Typography variant="body2" color="text.secondary">
            Chọn số sao đánh giá:
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <StarRatings
              rating={selectedRating}
              starRatedColor="#FFA41C"
              numberOfStars={5}
              starDimension="40px"
              starSpacing="5px"
              changeRating={handleRatingChange}
            />
          </Box>
          <Box mt={2}>
            <TextField
              label="Nhập suy nghĩ của bạn"
              onChange={(e) => setComment(e.target.value)}
              fullWidth
              multiline
              rows={4}
              sx={{
                minHeight: 120,
                fontSize: '16px',
              }}
              variant="outlined"
            />
            <Alert severity="info">Vui lòng thận trọng trước khi đánh giá. Sau khi đánh giá không thể sửa</Alert>
            <Button sx={{ mt: 2 }} variant="contained" color="primary" onClick={handleSubmit}>
              Gửi đánh giá
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default RatingPreview;
