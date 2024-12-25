import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string().min(12, {
    message: "Description must be at least 12 characters",
  }),
  tags: z
    .array(z.string().min(1).max(10), {
      message: "Tags must be at least 1 character",
    })
    .max(3, {
      message: "Tags can be up to 3",
    }),
});
