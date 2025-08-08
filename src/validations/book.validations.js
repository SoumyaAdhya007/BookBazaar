import { z } from "zod";

const postBooksValidation = {
  body: z.object({
    books: z.array(
      z.object({
        title: z.string().min(1, "Title is required"),
        subtitle: z.string().optional(),
        authors: z
          .array(z.string().min(1))
          .nonempty("At least one author is required"),
        genre: z.string().optional(),
        price: z.number().min(0, "Price must be a positive number"),
        description: z.string().optional(),
        publisher: z.string().optional(),
        publishedDate: z.union([z.string(), z.date()]).optional(),
        coverImage: z
          .string()
          .url("Cover image must be a valid URL")
          .optional(),
        stock: z.number().int().min(0).optional(),
        ratingsAverage: z.number().min(0).max(5).optional(),
        ratingsCount: z.number().int().min(0).optional(),
      })
    ),
  }),
};
const getBookDetailsValidation = {
  params: z.object({
    id: z.string(),
  }),
};
const putBooksValidation = {
  body: z.object({
    book: z.object({
      title: z.string().min(1, "Title is required"),
      subtitle: z.string().optional(),
      authors: z
        .array(z.string().min(1))
        .nonempty("At least one author is required"),
      genre: z.string().optional(),
      price: z.number().min(0, "Price must be a positive number"),
      description: z.string().optional(),
      publisher: z.string().optional(),
      publishedDate: z.union([z.string(), z.date()]).optional(),
      coverImage: z.string().url("Cover image must be a valid URL").optional(),
      stock: z.number().int().min(0).optional(),
      ratingsAverage: z.number().min(0).max(5).optional(),
      ratingsCount: z.number().int().min(0).optional(),
    }),
  }),
  params: z.object({
    id: z.string(),
  }),
};
const deleteBookValidation = {
  params: z.object({
    id: z.string(),
  }),
};
const postBookReviewsValidation = {
  params: z.object({
    bookId: z.string(),
  }),
  body: z.object({
    rating: z.number(),
    comment: z.string(),
  }),
};
const getBookAllReviewsValidation = {
  params: z.object({
    bookId: z.string(),
  }),
};
const deleteBookReviewsValidation = {
  params: z.object({
    id: z.string(),
  }),
};
export {
  postBooksValidation,
  getBookDetailsValidation,
  putBooksValidation,
  deleteBookValidation,
  postBookReviewsValidation,
  getBookAllReviewsValidation,
  deleteBookReviewsValidation,
};
