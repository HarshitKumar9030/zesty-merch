import mongoose, { Schema, model, models, Model, Document } from "mongoose";
import {
  UserDocument,
  CustomDesignDocument,
  ContestDesignDocument,
  ContestDocument,
} from "@/types/types";

const ContestDesignSchema = new Schema<ContestDesignDocument>({
  design: {
    type: Schema.Types.ObjectId,
    ref: "CustomDesign",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  ratings: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      rating: {
        type: Number,
        min: 0,
        max: 5,
      },
    },
  ],
});

const ContestSchema = new Schema<ContestDocument>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    startAt: {
      type: Date,
      required: true,
    },
    endAt: {
      type: Date,
      required: true,
    },
    enrolledUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    designs: [ContestDesignSchema],
  },
  {
    timestamps: true,
  }
);

export const Contest = (models.Contest ||
  model<ContestDocument>("Contest", ContestSchema)) as Model<ContestDocument>;

export default Contest;
