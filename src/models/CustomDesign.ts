// @ts-nocheck 

import mongoose, { model, Model, Schema } from "mongoose";
import { CustomDesignDocument } from "@/types/types";

const CustomDesignSchema = new Schema<CustomDesignDocument>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const CustomDesign = (mongoose.models.CustomDesign ||
  model<CustomDesignDocument>(
    "CustomDesign",
    CustomDesignSchema
  )) as Model<CustomDesignDocument>;
