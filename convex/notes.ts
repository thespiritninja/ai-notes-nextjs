import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

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
      return [];
    }
    const note = await ctx.db.get(args.noteID);
    if (!note) {
      //No notes found
      return [];
    } else if (note.userID !== userID) {
      //Unauthorised
      return [];
    }
    return { ...note, noteFileURL: await ctx.storage.getUrl(note.fileID) };
  },
});
