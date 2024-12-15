import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import {
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  FormControl,
  Paper,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import Dialog from '@/components/Dialog';
import { getMedia } from '@/api/mediaApi';

const MediaDisplay = ({
  resourceType,
  secureUrl,
  alt,
}: {
  resourceType: 'image' | 'video';
  secureUrl: string;
  alt: string;
}) => {
  switch (resourceType) {
    case 'image':
      return (
        <img
          src={secureUrl}
          alt={alt}
          style={{ width: '100%', height: '150px', borderRadius: '8px', objectFit: 'cover' }}
        />
      );
    case 'video':
      return (
        <video controls style={{ width: '100%', height: 'auto', borderRadius: '8px' }}>
          <source src={secureUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    default:
      return null;
  }
};

interface StorageProps {
  type: 'videos' | 'images';
  onSelectMedia: (mediaUrl: string) => void;
}

const Storage: React.FC<StorageProps> = ({ type, onSelectMedia }) => {
  const [open, setOpen] = useState(false);
  const [params, setParams] = useState({
    order: 'asc',
  });

  const { data: media, isPending } = useQuery({
    queryKey: ['media', type, params],
    queryFn: () => getMedia(type, params),
  });

  return (
    <>
      <Dialog title="Kho lưu trữ" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ mb: 2, p: 2 }} component={Paper}>
          <FormControl sx={{ width: '250px' }}>
            <InputLabel>Sắp xếp thời gian tải lên</InputLabel>
            <Select
              value={params.order}
              onChange={(e: any) => setParams((pre: any) => ({ ...pre, order: e.target.value }))}
              fullWidth
              label="Sắp xếp theo giá trị giảm"
            >
              <MenuItem value="asc">Tăng dần</MenuItem>
              <MenuItem value="desc">Giảm dần</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {isPending ? (
          'loading...'
        ) : (
          <Box p={2}>
            <Grid container spacing={2}>
              {media?.map((m: any) => (
                <Grid item xs={12} sm={6} md={4} key={m.public_id}>
                  <Card
                    onClick={() => {
                      onSelectMedia(m.secure_url);
                      setOpen(false);
                    }}
                    sx={{ cursor: 'pointer', maxWidth: 345, borderRadius: 2, boxShadow: 3 }}
                  >
                    <MediaDisplay resourceType={m.resource_type} secureUrl={m.secure_url} alt={m.display_name} />

                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {m.display_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Loại: {m.resource_type}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Kích thước: {Math.round(m.bytes / 1024)} KB
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Định dạng: {m.format}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Tải lên: {moment(m.created_at).format('DD/MM/YYYY HH:mm')}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" href={m.secure_url} target="_blank" rel="noopener noreferrer">
                        Xem chi tiết
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Dialog>
      <Button onClick={() => setOpen(true)}>Chọn từ kho lưu trữ</Button>
    </>
  );
};

export default Storage;
