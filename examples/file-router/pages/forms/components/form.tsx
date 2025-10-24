"use client";
import { useActionState } from "react";
import { useState } from "react";

import { useClient } from "@lazarv/react-server/client";

import { createOrUpdateNote, Note } from "../actions";

export default function NoteForm({ note }: { note: Note }) {
  const [editedNote, setEditedNote] = useState(false);
  const [state, submitAction, isPending] = useActionState(createOrUpdateNote, {
    error: null,
  });
  const { navigate } = useClient();

  const handleCancel = () => {
    if (note?.id) {
      navigate(`/forms`);
    }
  };
  return (
    <form action={submitAction}>
      {note?.id && <input type="hidden" name="id" value={note.id} />}
      <div>
        <label>
          Title:
          <input
            defaultValue={note.title}
            type="text"
            name="title"
            disabled={isPending}
          />
        </label>
      </div>
      <div>
        <label>
          Note:{" "}
          <input
            type="checkbox"
            value={editedNote}
            onChange={() => setEditedNote(!editedNote)}
            disabled={isPending}
          />{" "}
          allow edit
          <textarea
            defaultValue={note.note}
            name="note"
            disabled={isPending}
            readOnly={!editedNote}
          ></textarea>
        </label>
      </div>
      {state?.error?.map?.(({ message }, i) => (
        <p key={i} className="error">
          {message}
        </p>
      )) ??
        (state.error && <p className="error">{state.error?.toString()}</p>)}
      <div className="button-group">
        <button
          type="button"
          className="button"
          onClick={handleCancel}
          disabled={isPending}
        >
          Cancel
        </button>
        <button type="submit" className="button primary" disabled={isPending}>
          Save Note
        </button>
      </div>
    </form>
  );
}
