import { z, ZodSchema } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "name must be at least 2 characters",
    })
    .max(100, {
      message: "name must be less than 100 characters",
    }),
  company: z.string(),
  featured: z.coerce.boolean(),
  price: z.coerce.number().int().min(0, {
    message: "price must be a positive number",
  }),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(" ").length;
      return wordCount >= 10 && wordCount <= 1000;
    },
    {
      message: "description must be between 10 and 1000 words",
    }
  ),
});
// Image schema
export const imageSchema = z.object({
  image: validateImageFile(),
});
// validateImageFile method - We are checking if the file type is an image, and max uploaded size, and if no file or file size is bigger than max size, then we return error message. Otherwise we return that file. Then another refine for checking the file type
function validateImageFile() {
  const maxUploadSize = 1024 * 1024;
  const acceptedFileTypes = ["image/"];
  return z
    .instanceof(File)
    .refine((file) => {
      return !file.size || file.size <= maxUploadSize;
    }, "File size must be less than 1MB")
    .refine((file) => {
      return (
        !file.type ||
        acceptedFileTypes.some((type) => file.type.startsWith(type))
      );
    }, "File must be an image");
}
// We set this as generic bec we don't know what would be the type of schema !!

export function validateWithZodSchema<T>(
  schema: ZodSchema<T>,
  data: unknown
): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((err) => err.message);
    throw new Error(errors.join(", "));
  }
  return result.data;
}
export const reviewSchema = z.object({
  productId: z.string().refine((value) => value !== "", {
    message: "Product ID cannot be empty",
  }),
  authorName: z.string().refine((value) => value !== "", {
    message: "Author name cannot be empty",
  }),
  authorImageUrl: z.string().refine((value) => value !== "", {
    message: "Author image URL cannot be empty",
  }),
  rating: z.coerce
    .number()
    .int()
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating must be at most 5" }),
  comment: z
    .string()
    .min(10, { message: "Comment must be at least 10 characters long" })
    .max(1000, { message: "Comment must be at most 1000 characters long" }),
});
