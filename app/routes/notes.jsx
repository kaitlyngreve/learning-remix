import { redirect } from "react-router";
import NewNote, { links as newNoteLinks } from "~/components/NewNote";
import { getStoredNotes, storeNotes } from "~/data/notes";

export default function NotesPage() {
  return (
    <main>
      <NewNote />
    </main>
  );
}

// the 'request' paramter is just data.request destructured
export async function action({ request }) {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData);
  // OR - this does the same thing
  // const noteData = {
  //   title: formData.get("title"),
  //   content: formData.get("content"),
  // };

  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();

  const updatedNotes = existingNotes.concat(noteData);
  await storeNotes(updatedNotes);

  return redirect("/notes");
}

export function links() {
  return [...newNoteLinks()];
}
