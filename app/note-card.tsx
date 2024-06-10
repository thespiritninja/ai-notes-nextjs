import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Doc } from "@/convex/_generated/dataModel";
import { View } from "lucide-react";
import Link from "next/link";

export function NoteCard({ note }: { note: Doc<"notes"> }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
        <CardDescription>{note.body}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <Button
          asChild
          variant="secondary"
          className="flex items-center gap-x-2"
        >
          <Link href={`/notes/${note._id}`}>
            <View />
            View Notes
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
