import { Schema, model, models, Model } from "mongoose";
import { NewsletterDocument } from "@/types/types"; 

const NewsletterSchema = new Schema<NewsletterDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    subscribedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Newsletter = (models.Newsletter ||
  model<NewsletterDocument>("Newsletter", NewsletterSchema)) as Model<NewsletterDocument>;
