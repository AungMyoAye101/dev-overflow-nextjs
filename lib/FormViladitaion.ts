import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  content: z.string().min(12, {
    message: "Content must be at least 12 characters",
  }),
  tags: z
    .array(z.string().min(1).max(10), {
      message: "Tags must be at least 1 character",
    })
    .max(3, {
      message: "Tags can be up to 3",
    }),
});

export const editProfileSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  portfolio: z.string().min(4, {
    message: "portfolio link must be at least 3 characters.",
  }),
  location: z.string().min(4, {
    message: "Location link must be at least 3 characters.",
  }),
  bio: z.string().min(12, {
    message: "bio must be at least 12 characters.",
  }),
});
