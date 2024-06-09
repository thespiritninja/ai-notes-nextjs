"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2 } from "lucide-react";
import { LoaderButton } from "@/components/loader-button";
const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters",
    })
    .max(50, {
      message: "Title must be less than 50 characters",
    }),
  body: z
    .string()
    .min(2, {
      message: "Body must be at least 2 characters",
    })
    .max(500, {
      message: "Body must be less than 500 characters",
    }),
});

export default function NoteForm({ onUpload }: { onUpload: () => void }) {
  const createNotes = useMutation(api.notes.createNotes);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    //Just to be dramatic
    await new Promise((r) => setTimeout(r, 1500));
    await createNotes({
      title: values.title,
      body: values.body,
    });
    onUpload();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="This Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="This description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoaderButton
          isLoading={form.formState.isSubmitting}
          loadingText="Uploading..."
        >
          Upload
        </LoaderButton>
      </form>
    </Form>
  );
}
