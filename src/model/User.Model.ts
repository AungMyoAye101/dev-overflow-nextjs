import { Schema, models, model, Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  name: string;
  email: string;
  password?: string;
  bio?: string;
  picture?: string;
  location?: string;
  portfolio?: string;
  reputation?: number;
  questons: Schema.Types.ObjectId[];
  saved: Schema.Types.ObjectId[];
  joinedAt: Date;
}

const UserSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  bio: {
    type: String,
  },
  picture: {
    type: String,
  },
  location: {
    type: String,
  },
  portfolio: {
    type: String,
  },
  reputation: {
    type: Number,
    default: 0,
  },
  questions: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
  },
  saved: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = models.User || model<IUser>("User", UserSchema);
export default User;
