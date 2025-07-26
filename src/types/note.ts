export type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';

export interface Note {
  id: number; // має бути number!
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}