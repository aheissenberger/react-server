import { createOrUpdateNote, getNoteById } from "../actions";

export default async function NotePage({ id }: { id: string }) {
  const note = id !== "new" ? await getNoteById(id) : { title: "", note: "" };

  return (
    <div>
      <h1>Note Page</h1>
      <p>Viewing note with ID: {id}</p>
      <form action={createOrUpdateNote}>
        {note && <input type="hidden" name="id" value={note.id} />}
        <div>
          <label>
            Title:
            <input
              defaultValue={note.title}
              type="text"
              name="title"
              required
              minLength={3}
              maxLength={100}
            />
          </label>
        </div>
        <div>
          <label>
            Note:
            <textarea
              defaultValue={note.note}
              name="note"
              required
              minLength={3}
              maxLength={1000}
            ></textarea>
          </label>
        </div>
        <div className="button-group">
          <a href="/forms" className="button">
            Cancel
          </a>
          <button type="submit" className="button primary">
            Save Note
          </button>
        </div>
      </form>
    </div>
  );
}
