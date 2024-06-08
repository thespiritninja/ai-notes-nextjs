"use client";
import { api } from "@/convex/_generated/api";
import { SignInButton, UserButton } from "@clerk/nextjs";
import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";
import Image from "next/image";

export default function Home() {
  const createNotes = useMutation(api.notes.createNotes);
  const listNotes = useQuery(api.notes.listNotes);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
      <Authenticated>
        <UserButton />
        <button
          onClick={() =>
            createNotes({
              title: "BaaS Implemented",
              body: "Convex is FUNNN!!!",
            })
          }
        >
          Click Me!
        </button>
        {listNotes?.map((note) => {
          return (
            <div key={note._id}>
              <h1>{note.title}</h1>
              <p>{note.body}</p>
            </div>
          );
        })}
      </Authenticated>
    </main>
  );
}
