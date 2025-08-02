import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
    },
    like: {
      type: Number,
      default: 0,
    },
    dislike: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

reviewSchema.index({ bookId: 1, userId: 1 });

const Review = mongoose.model("review", reviewSchema);

export default Review;
