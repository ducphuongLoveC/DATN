import axiosInstance from './axiosInstance';

// export const getNotes = async (resource_id: string, user_id: string, queries: any[]) => {
//   const convertQueries = queries.map((q, index) => {
//     if (index == 0) {
//       return `?${q.key}=${q.value}`;
//     } else {
//       return `&${q.key}=${q.value}`;
//     }
//   });
//   try {
//     const { data } = await axiosInstance.get(`api/note?resource_id=${resource_id}&user_id=${user_id}${convertQueries}`);
//     console.log(`api/note?resource_id=${resource_id}&user_id=${user_id}`);

//     return data.notes;
//   } catch (error) {
//     throw error;
//   }
// };

export const getNotes = async (resource_id: string, user_id: string, queries: any[]) => {
  const queryObj: { [key: string]: string } = {};
  queries.forEach((q) => {
    queryObj[q.key] = q.value;
  });
  const queryString = Object.entries(queryObj)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  try {
    const { data } = await axiosInstance.get(
      `api/note?resource_id=${resource_id}&user_id=${user_id}${queryString ? `&${queryString}` : ''}`
    );
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

export const updateNote = async (noteId: string, content: string) => {
  try {
    const res = await axiosInstance.put(`api/note/update/${noteId}`, { content });
    return res;
  } catch (error) {
    console.log('Error updating note:', error);
    throw error;
  }
};

export const deleteNote = async (noteId: string) => {
  try {
    const res = await axiosInstance.delete(`api/note/delete/${noteId}`);
    return res;
  } catch (error) {
    console.log('Error deleting note:', error);
    throw error;
  }
};
