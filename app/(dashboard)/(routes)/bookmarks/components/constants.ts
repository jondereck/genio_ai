import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  src: z.string().min(1, {
    message: "Image is required",
  }),
  categoryId: z.string().min(1, {
    message: "Category is required",
  }),
  tags: z.string().refine((value) => {
    const tags = value.split(',').map(tag => tag.trim());
    return tags.length >= 2 && !tags.includes('');
  }, {
    message: "Tags should have at least two non-empty words separated by commas",
  }),

});