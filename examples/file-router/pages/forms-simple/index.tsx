import { allNotes } from "./actions";

export default async function FormsListPage() {
  const notes = await allNotes();
  return (
    <div>
      <a href="/forms-simple/note/new" className="button primary">
        Create Note
      </a>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => (
            <tr key={note.id}>
              <td>{note.title}</td>
              <td>{note.note}</td>
              <td>
                <a href={`/forms-simple/note/${note.id}`} className="button">
                  Edit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
