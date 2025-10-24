"use server";

import { redirect } from "@lazarv/react-server";
import Database from "better-sqlite3";
import * as zod from "zod";

const db = new Database("db.sqlite");
db.exec(
  "CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, note TEXT)"
);

type Note = {
  id: number;
  title: string;
  note: string;
};

const addNoteSchema = zod.object({
  title: zod
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be at most 100 characters")
    .refine((value) => value.length > 0, "Title is required")
    .transform((value) => value.trim()),
  note: zod
    .string()
    .min(3, "Note must be at least 3 characters")
    .max(1000, "Note must be at most 1000 characters")
    .refine((value) => value.length > 0, "Note is required")
    .transform((value) => value.trim()),
});

const deleteNoteSchema = zod.object({
  id: zod.string().transform((value) => parseInt(value.trim(), 10)),
});

export async function getNoteById(id: number) {
  const note = db.prepare("SELECT * FROM notes WHERE id = ?").get(id) as
    | Note
    | undefined;
  return note || null;
}

export async function createOrUpdateNote(formData: FormData) {
  const result = addNoteSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    throw result.error.issues;
  }
  const id = formData.get("id");
  const { title, note } = result.data;

  if (id) {
    const noteId = parseInt(id.toString(), 10);
    db.prepare("UPDATE notes SET title = ?, note = ? WHERE id = ?").run(
      title,
      note,
      noteId
    );
  } else {
    db.prepare("INSERT INTO notes(title,note) VALUES (?,?)").run(title, note);
  }
  redirect("/forms");
}

export function allNotes() {
  return db.prepare("SELECT * FROM notes").all() as Note[];
}

export async function deleteNote(formData: FormData) {
  const result = deleteNoteSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    throw result.error.issues;
  }

  const { id } = result.data;
  db.prepare("DELETE FROM notes WHERE id = ?").run(id);
  redirect("/forms");
}
