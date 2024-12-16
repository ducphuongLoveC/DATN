import { Box, styled, Typography, Grid } from '@mui/material';
import { useContext } from 'react';
import { NoteContext } from '@/context/NoteContext';
import { useDispatch } from 'react-redux';

import useQueryParams from '@/hooks/useQueryParams';

const BoxMain = styled(Box)(() => ({
  width: '100%',
  height: '100vh',
}));

const NotNoteBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  height: '80%',
}));

import { Notes } from '@/interfaces/Note';
import NoteItem from './NoteItem';
import { SET_SEEK } from '@/store/actions';

const Note: React.FC<Notes> = ({ notes }) => {
  const query = useQueryParams();
  const dispatch = useDispatch();

  console.log(notes);
  

  const handleSeek = (seek: number, idCurrentResource: string) => {
    const idResource = query.get('id');
    if (idResource !== idCurrentResource) {
      query.set('id', idCurrentResource);
    }
    dispatch({ type: SET_SEEK, payload: seek });
  };
  const { onNoteFilter, onNoteDate, onNoteSave, onNoteDelete } = useContext(NoteContext);

  return (
    <BoxMain>
      <Box p={3}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant={'h3'}>Ghi chú của tôi</Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box>
              <select
                onChange={(e) => onNoteFilter(e.target.value)}
                id="filter-notes"
                className="mr-2 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="in_chapter">Trong tài liệu này</option>
                <option value="all_chapters">Tất cả tài liệu </option>
              </select>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box>
              <select
                onChange={(e) => onNoteDate(e.target.value)}
                id="filter-date"
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="ASC">Cũ đến mới</option>
                <option value="DESC">Mới đến cũ</option>
              </select>
            </Box>
          </Grid>
        </Grid>
        {/* box main */}
        <Box mt={5}>
          {notes.map((n) => (
            <NoteItem
              _id={n._id}
              title={n.title}
              content={n.content}
              markAt={n.markAt}
              onEdit={onNoteSave}
              onDelete={(id) => {
                if (confirm('Bạn có muốn xóa không?')) {
                  onNoteDelete(id);
                }
              }}
              onSeek={(seek) => handleSeek(seek, n.resource_id)}
            />
          ))}
        </Box>
      </Box>
      {!notes?.length && (
        <NotNoteBox>
          <Typography variant="h4">Bạn chưa có ghi chú nào</Typography>
          <Typography variant="body1">Hãy ghi chép để nhớ những gì bạn đã học!</Typography>
        </NotNoteBox>
      )}
    </BoxMain>
  );
};

export default Note;
