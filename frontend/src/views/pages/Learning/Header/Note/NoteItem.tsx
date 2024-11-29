import { Box, styled, Button, Typography, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';

import TextEditor from '@/components/TextEditor';
import formatTime from '@/utils/formatTime';
import { useState, useCallback } from 'react';

interface NoteItemProp {
  _id: string;
  title: string;
  content: string;
  markAt: number;
  onEdit: (id: string, newContent: string) => void;
  onDelete: (id: string) => void;
  onSeek: (seek: number) => void;
}

const NoteHeader = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const NoteBody = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper2,
  borderRadius: theme.shape.borderRadius,
}));

const NoteItem: React.FC<NoteItemProp> = ({ _id, title, content, markAt, onEdit, onDelete, onSeek }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newContent, setNewContent] = useState(content);

  const handleEdit = useCallback(() => {
    if (isEdit) {
      onEdit(_id, newContent);
    }
    setIsEdit((prev) => !prev);
  }, [isEdit, _id, newContent, onEdit]);

  const handleDelete = useCallback(() => {
    onDelete(_id);
  }, [_id, onDelete]);

  const handleSeek = () => {
    onSeek(markAt);
  };

  return (
    <Box mb={3}>
      <NoteHeader>
        <Box display="flex" alignItems="center">
          <Button onClick={handleSeek} variant="outlined" size="small" sx={{ mr: 2 }}>
            {formatTime(markAt)}
          </Button>
          <Typography variant="h5">{title}</Typography>
        </Box>
        <Box display="flex">
          <Tooltip title={isEdit ? 'Hoàn tất chỉnh sửa' : 'Chỉnh sửa'}>
            <Button onClick={handleEdit}>{isEdit ? <DoneIcon /> : <EditIcon />}</Button>
          </Tooltip>
          <Tooltip title="Xóa ghi chú">
            <Button onClick={handleDelete} color="error">
              <DeleteIcon />
            </Button>
          </Tooltip>
        </Box>
      </NoteHeader>
      <NoteBody>
        {isEdit ? (
          <TextEditor value={newContent} onChange={setNewContent} />
        ) : (
          <Typography variant="body1" dangerouslySetInnerHTML={{ __html: content }} />
        )}
      </NoteBody>
    </Box>
  );
};

export default NoteItem;
