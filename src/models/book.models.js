import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  etag: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  subtitle: {
    type: String,
  },
  authors: [
    {
      type: String,
      required: true,
    },
  ],
  publisher: {
    type: String,
    required: true,
  },
  publishedDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  industryIdentifiers: [
    {
      type: { type: String },
      identifier: { type: String },
    },
  ],
  readingModes: {
    text: {
      type: Boolean,
    },
    image: { type: Boolean },
  },
  pageCount: { type: Boolean },
  printType: { type: String },
  categories: [{ type: String }],
  averageRating: { type: Number },
  ratingsCount: { type: Number },
  maturityRating: { type: String },
  allowAnonLogging: { type: Boolean, default: false },
  contentVersion: { type: String },
  imageLinks: {
    smallThumbnail: { type: String },
    thumbnail: { type: String },
  },
  language: { type: String },
  previewLink: { type: String },
  infoLink: { type: String },
  canonicalVolumeLink: { type: String },
},{
    timestamps:true
});

bookSchema.index({ etag: 1, title: 1 });

const Book = mongoose.model("book", bookSchema);

export default Book;
