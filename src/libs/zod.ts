import { z } from "zod";

export const productSchema = z.object({
  name: z.string().max(240).nonempty(),
  category: z.string().max(12).nonempty(),
  price: z.number().min(0),
  discount: z.number().min(0),
});
