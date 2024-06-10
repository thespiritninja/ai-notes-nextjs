"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useAction } from "convex/react";

export default function QueryPanel({ noteID }: { noteID: Id<"notes"> }) {
  const askQuery = useAction(api.notes.askQuestion);
  return (
    <div className="w-[300px] bg-gray-700 flex flex-col gap-2 p-3">
      <div className="h-[350px] overflow-y-auto">
        <div className="p-2 bg-gray-900">Text zText</div>
        <div className="p-2 bg-gray-900">Text zText</div>
        <div className="p-2 bg-gray-900">Text zText</div>
        <div className="p-2 bg-gray-900">Text zText</div>
        <div className="p-2 bg-gray-900">Text zText</div>
        <div className="p-2 bg-gray-900">Text zText</div>
        <div className="p-2 bg-gray-900">Text zText</div>
        <div className="p-2 bg-gray-900">Text zText</div>
        <div className="p-2 bg-gray-900">Text zText</div>
        <div className="p-2 bg-gray-900">Text zText</div>
      </div>
      <div className="flex gap-1">
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const form = event.target as HTMLFormElement;
            const formData = new FormData(form);
            const text = formData.get("text") as string;
            await askQuery({ noteID: noteID, question: text }).then(
              console.log
            );
          }}
        >
          <Input required name="text" />
          <Button>Query?</Button>
        </form>
      </div>
    </div>
  );
}
