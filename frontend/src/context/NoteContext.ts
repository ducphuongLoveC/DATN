import { createContext } from 'react';
export const NoteContext = createContext({
  onNoteFilter: (_val: string) => {},
  onNoteDate: (_val: string) => {},
  onNoteSave: (_id: string, _newContent: string) => {},
  onNoteDelete: (_id: string) => {},
});
