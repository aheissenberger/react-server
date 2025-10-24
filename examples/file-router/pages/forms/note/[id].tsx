import { getNoteById, Note } from "../actions";
import NoteForm from "../components/form";

export default async function NotePage({ id }: { id: string }) {
  const noteId = parseInt(id.toString(), 10);
  const note =
    id !== "new"
      ? await getNoteById(noteId)
      : ({ title: "", note: "" } as Note);

  return (
    <div>
      <h1>Note Page</h1>
      <p>Viewing note with ID: {id}</p>
      <NoteForm note={note} />
    </div>
  );
}
