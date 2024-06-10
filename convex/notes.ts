import { action, mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { api } from "./_generated/api";
import OpenAI from "openai";
import { Id } from "./_generated/dataModel";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
});

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const createNotes = mutation({
  args: {
    title: v.string(),
    body: v.string(),
    fileID: v.id("_storage"),
  },
  async handler(ctx, args) {
    const userID = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userID) {
      throw new ConvexError("You must be logged in to create notes");
    }
    await ctx.db.insert("notes", {
      title: args.title,
      body: args.body,
      userID: userID,
      fileID: args.fileID,
    });
  },
});

export const listNotes = query({
  async handler(ctx) {
    const userID = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userID) {
      return [];
    }
    const notes = await ctx.db
      .query("notes")
      .withIndex("by_userID", (x) => x.eq("userID", userID))
      .collect();
    return notes;
  },
});

export const getNote = query({
  args: {
    noteID: v.id("notes"),
  },
  async handler(ctx, args) {
    const userID = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userID) {
      throw new ConvexError("You must be logged in");
    }
    const note = await ctx.db.get(args.noteID);
    if (!note) {
      //No notes found
      throw new ConvexError("No notes found");
    } else if (note.userID !== userID) {
      //Unauthorised
      throw new ConvexError("You must be authorised");
    }
    return { ...note, noteFileURL: await ctx.storage.getUrl(note.fileID) };
  },
});

export const askQuestion = action({
  args: {
    question: v.string(),
    noteID: v.id("notes"),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      throw new ConvexError("Not authenticated");
    }

    const document = await ctx.runQuery(api.notes.getNote, {
      noteID: args.noteID,
    });

    if (!document) {
      throw new ConvexError("Document not found");
    }
    const file = await ctx.storage.get(document.fileID);

    if (!file) {
      throw new ConvexError("File not found");
    }

    const text = await file.text();

    const chatCompletion: OpenAI.Chat.Completions.ChatCompletion =
      await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `Here is a text file: ${text}`,
          },
          {
            role: "user",
            content: `please answer this question: ${args.question}`,
          },
        ],
        model: "gpt-3.5-turbo",
      });

    return chatCompletion.choices[0].message.content;
  },
});
