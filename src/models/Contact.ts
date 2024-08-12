import mongoose, { Schema, model, Model, Document } from "mongoose";
import { ContactDocument } from "@/types/types";

const ContactSchema = new Schema<ContactDocument>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String },
  details: { type: String, required: true },
  purpose: {
    type: String,
    required: true,
    enum: ['contact', 'technical', 'orders', 'designBattles', 'others'],
  },
  orderId: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

ContactSchema.pre<ContactDocument>('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export const Contact = (mongoose.models.Contact ||
  model<ContactDocument>(
    "Contact",
    ContactSchema
  )) as Model<ContactDocument>;
