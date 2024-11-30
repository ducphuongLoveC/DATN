// import { Box, Typography, Grid, Paper } from "@mui/material";

// const CoursesInfo = ({ courses }: { courses: any[] }) => (
//   <Box>
//     <Typography variant="h6" sx={{ marginBottom: "15px" }}>
//       <strong>Số khóa học tham gia:</strong> {courses.length}
//     </Typography>
//     {courses.length > 0 ? (
//       <Grid container spacing={2}>
//         {courses.map((course, index) => (
//           <Grid item xs={12} sm={6} md={4} key={index}>
//             <Paper sx={{ padding: "20px", borderRadius: "8px", boxShadow: 2 }}>
//               <Typography variant="body1" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
//                 {course.title || "Không có tiêu đề"}
//               </Typography>
//               <img
//                 src={course.thumbnail}
          
//                 style={{
//                   maxWidth: "100%",
//                   height: "auto",
//                   borderRadius: "8px",
//                   boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                 }}
//               />
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>
//     ) : (
//       <Typography>Tài khoản này chưa đăng ký khóa học nào.</Typography>
//     )}
//   </Box>
// );

// export default CoursesInfo;
import { Box, Typography, Grid, Paper } from "@mui/material";

const CoursesInfo = ({ courses }: { courses: any[] }) => (
  <Box sx={{ padding: "20px" }}>
    <Typography variant="h5" sx={{ marginBottom: "20px", fontWeight: "bold" }}>
      Số khóa học tham gia: {courses.length}
    </Typography>

    {courses.length > 0 ? (
      <Grid container spacing={3}>
        {courses.map((course, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              sx={{
                padding: "20px",
                borderRadius: "12px",
                boxShadow: 3,
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: 6,
                  transform: "translateY(-5px)",
                },
              }}
            >
              {/* Tiêu đề khóa học */}
              <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "15px" }}>
                {course.title || "Không có tiêu đề"}
              </Typography>

              {/* Hình ảnh khóa học */}
              <Box
                sx={{
                  position: "relative",
                  paddingBottom: "56.25%", // Tạo tỷ lệ 16:9 cho hình ảnh
                  overflow: "hidden",
                  borderRadius: "8px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
                }}
              >
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    ) : (
      <Typography variant="body1" sx={{ marginTop: "20px" }}>
        Tài khoản này chưa đăng ký khóa học nào.
      </Typography>
    )}
  </Box>
);

export default CoursesInfo;
