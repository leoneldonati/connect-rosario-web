import { z } from "zod";

export const productSchema = z.object({
  title: z.string().max(240).nonempty(),
  description: z.string().nonempty(),
  category: z.string().max(12).nonempty(),
  sub_category: z.string().nonempty(),
  retail_price: z.number().min(0),
  wholesale_price: z.number().min(10),
});
