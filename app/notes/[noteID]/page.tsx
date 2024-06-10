"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import QueryPanel from "./query-panel";

export default function NotesPage({
  params,
}: {
  params: {
    noteID: Id<"notes">;
  };
}) {
  const note = useQuery(api.notes.getNote, { noteID: params.noteID });
  if (!note) return <h1>No notes found or unauthorised</h1>;
  return (
    <main className="p-24 space-y-7">
      <div className="flex justify-between items-center">
        <h1 className="text-5xl">{note.title}</h1>
        <h2 className="text-5xl">{note.noteFileURL}</h2>
      </div>
      <div className="flex gap-11">
        <div className="bg-gray-600 p-4 rounded flex-1 h-[600px]">
          {note.noteFileURL && (
            <iframe src={note.noteFileURL} className="w-full h-full" />
          )}
        </div>
        <QueryPanel />
      </div>
    </main>
  );
}
