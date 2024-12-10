import { z } from "zod";

export const SearchSchema = z.object({
  search: z.string().min(3, {
    message: "Search must be at least 3 characters",
  }),
});
