import { Schema, model, models, Document } from "mongoose";

export interface IInteraction extends Document {
  user: Schema.Types.ObjectId;
  action: string;
  question: Schema.Types.ObjectId;
  tags: Schema.Types.ObjectId[];
  answer: Schema.Types.ObjectId;
  createdAt: Date;
}

const InteractionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  action: String,
  question: {
    type: Schema.Types.ObjectId,
    ref: "Question",
  },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tags" }],
  answer: { type: Schema.Types.ObjectId, ref: "Answer" },
  createdAt: { type: Date, default: Date.now },
});

const Interaction =
  models.Interaction || model<IInteraction>("Interaction", InteractionSchema);

export default Interaction;
