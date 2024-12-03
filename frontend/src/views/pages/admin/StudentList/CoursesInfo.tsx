import { Box, Typography, Grid, Paper, LinearProgress } from "@mui/material";

const CoursesInfo = ({ courses }: { courses: any[] }) => (
  <Box sx={{ padding: "20px" }}>
    <Typography variant="h4" sx={{ marginBottom: "20px", fontWeight: "bold" }}>
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
              <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: "15px" }}>
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

              <Typography variant="h5" sx={{ fontWeight: "bold" }} mt={1}>
                Hoàn thành chương: {`${course.completedModules} / ${course.totalModules}`}{' '}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }} mt={1}>
                Hoàn thành bài học: {` ${course.completedResources} / ${course.totalResources}`}{' '}
              </Typography>

              {/* Hiển thị tiến độ */}
              <Typography variant="body2" sx={{ marginBottom: "10px", fontWeight: "bold" }} mt={1}>
                Tiến độ hoàn thành: {`${course.progress || 0}%`}
              </Typography>

              {/* Thanh LinearProgress */}
              <LinearProgress
                variant="determinate"
                value={course.progress || 0}
                sx={{
                  height: "10px",
                  borderRadius: "5px",
                  backgroundColor: "#e0e0e0", // Màu xám cho phần chưa hoàn thành
                  "& .MuiLinearProgress-bar": {
                    backgroundColor:
                      course.progress === 0
                        ? "#e0e0e0" // Màu xám khi tiến độ 0%
                        : "#76c7c0", // Màu xanh khi tiến độ > 0%
                  },
                }}
              />

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
