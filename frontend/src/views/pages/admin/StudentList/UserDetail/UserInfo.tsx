import { Box, Typography, Grid, Paper, Avatar } from "@mui/material";

const UserInfo = ({ user }: { user: any }) => (
  <Box sx={{ padding: "20px" }}>
    <Typography variant="h5" sx={{ marginBottom: "20px", fontWeight: "bold" }}>
      Thông Tin Người Dùng
    </Typography>

    {/* Avatar (Thumbnail) và thông tin cá nhân */}
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4} display="flex" justifyContent="center" alignItems="center">
        <Avatar
          src={user.profile_picture || "/default-avatar.png"}
          alt={user.name || "User Avatar"}
          sx={{ width: 120, height: 120, borderRadius: "50%", boxShadow: 3 }}
        />
      </Grid>

      <Grid item xs={12} sm={8}>
        <Paper sx={{ padding: "20px", borderRadius: "10px", boxShadow: 3, transition: "all 0.3s ease", '&:hover': { boxShadow: 6 } }}>
          <Typography variant="h6" sx={{ marginBottom: "10px", fontWeight: "bold" }}>
            Thông Tin Cá Nhân
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "10px" }}>
            <strong>Tên:</strong> {user.name || "Không có dữ liệu"}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "10px" }}>
            <strong>Email:</strong> {user.email || "Không có dữ liệu"}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "10px" }}>
            <strong>Số Điện thoại:</strong> {user.phone || "Không có dữ liệu"}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "10px" }}>
            <strong>Địa chỉ:</strong> {user.address || "Không có dữ liệu"}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  </Box>
);

export default UserInfo;
