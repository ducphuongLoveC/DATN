import {
  Dialog as MuiDialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface DialogProps {
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  open: boolean;  
}

const Dialog: React.FC<DialogProps> = ({
  onClose,
  children,
  title = 'Dialog',
  open,
}) => {
  return (

      <MuiDialog component={'div'} open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography >{title}</Typography>
          <IconButton

            onClick={onClose}
            aria-label="close"
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
      </MuiDialog>
  );
};

export default Dialog;
