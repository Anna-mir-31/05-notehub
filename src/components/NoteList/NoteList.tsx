import type { Note } from "../../types/note";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import css from './NoteList.module.css';
import { fetchNotes, deleteNote } from "../../services/noteService";

interface NoteListProps {
  page: number;
  search: string;
}

export default function NoteList({ page, search }: NoteListProps) {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes(page, search),
    placeholderData: (prev) => prev,
  });

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] }),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data || !Array.isArray(data.notes)) return <p>No notes found.</p>;

  return (
    <ul className={css.list}>
      {data.notes.map((note: Note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button className={css.button} onClick={() => mutation.mutate(note.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}