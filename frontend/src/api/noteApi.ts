import axiosInstance from './axiosInstance';

export const getNotes = async (resource_id: string, user_id: string) => {
  try {
    const { data } = await axiosInstance.get(`api/note?resource_id=${resource_id}&user_id=${user_id}`);
    console.log(`api/note?resource_id=${resource_id}&user_id=${user_id}`);

    return data.notes;
  } catch (error) {
    throw error;
  }
};

export const createNote = async (noteData: {
  title: string;
  content: string;
  resource_id: string;
  user_id: string;
  markAt: number;
}) => {
  try {
    const { data } = await axiosInstance.post('api/note', noteData);
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateNote = async (noteId: string, noteData: { title: string; content: string; markAt: number }) => {
  try {
    const { data } = await axiosInstance.put(`api/note/update/${noteId}`, noteData);
    return data;
  } catch (error) {
    console.log('Error updating note:', error);
    throw error;
  }
};

export const deleteNote = async (noteId: string) => {
  try {
    const { data } = await axiosInstance.delete(`api/note/delete/${noteId}`);
    return data;
  } catch (error) {
    console.log('Error deleting note:', error);
    throw error;
  }
};
