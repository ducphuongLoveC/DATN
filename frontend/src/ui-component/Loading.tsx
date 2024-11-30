import { Dialog, DialogContent, Typography } from '@mui/material';
import { BeatLoader } from 'react-spinners';
export default function Loading() {
  return (
    <Dialog
      open={true} 
      disableEscapeKeyDown={true}
    >
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          px: 5,
        }}
      >
        <BeatLoader />
        <Typography mt={2} variant="body1" gutterBottom>
          Vui lòng đợi...
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
