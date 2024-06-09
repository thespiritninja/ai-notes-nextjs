"use client";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { NoteCard } from "./note-card";
import AddNotes from "./add-note-dialog";

export default function Home() {
  const createNotes = useMutation(api.notes.createNotes);
  const listNotes = useQuery(api.notes.listNotes);
  return (
    <main className="p-24 space-y-7">
      <div className="flex justify-between items-center">
        <h1 className="text-5xl">ai-Notes</h1>
        <AddNotes />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {listNotes?.map((note) => {
          return <NoteCard note={note} key={note._id} />;
        })}
      </div>
    </main>
  );
}
