import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createNotes = mutation({
  args: {
    title: v.string(),
    body: v.string(),
  },
  async handler(ctx, args) {
    await ctx.db.insert("notes", {
      title: args.title,
      body: args.body,
    });
  },
});

export const listNotes = query({
  async handler(ctx) {
    const notes = await ctx.db.query("notes").collect();
    return notes;
  },
});
