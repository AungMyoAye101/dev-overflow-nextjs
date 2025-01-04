import { Schema, model, models } from "mongoose";

const answerSchema = new Schema({
  answer: {
    type: String,
    required: true,
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: "Question",
  },
  upvotes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  downvotes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Answer = models.Answer || model("Answer", answerSchema);

export default Answer;
