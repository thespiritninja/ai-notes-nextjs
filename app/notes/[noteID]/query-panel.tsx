"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function QueryPanel() {
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
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <Input required name="text" />
          <Button>Query?</Button>
        </form>
      </div>
    </div>
  );
}
