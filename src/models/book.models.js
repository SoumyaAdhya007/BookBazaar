import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
    },
    authors: {
      type: [String],
      required: true,
    },
    genre: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    publisher: {
      type: String,
    },
    publishedDate: {
      type: Date,
    },
    coverImage: {
      type: String, // store image URL or path
    },
    stock: {
      type: Number,
      default: 0,
    },
    ratingsAverage: {
      type: Number,
      default: 0,
    },
    ratingsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("book", bookSchema);

export default Book;
