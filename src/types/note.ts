export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
}

export type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';

export interface NotesResponse {
  results: Note[];
  totalPages: number;
}