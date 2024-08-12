import { UserDocument } from "@/types/types";
import mongoose, { Schema, model, models, Model } from "mongoose";

const UserSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    username: {
      type: String,
      required: false,
      unique: true,
    },
    instagram: {
      type: String,
      required: false,
    },
    x: {
      type: String,
      required: false,
    },
    github: {
      type: String,
      required: false,
    },
    backgroundUrl: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    name: {
      type: String,
      required: [true, "Fullname is required"],
      minLength: [3, "fullname must be at least 3 characters"],
      maxLength: [25, "fullname must be at most 25 characters"],
    },
    phone: {
      type: String,
      default: "",
    },
    address: {
      city: String,
      country: String,
      line1: String,
      line2: String,
      postal_code: String,
      state: String,
    },
    image: {
      type: String,
    },
    customDesigns: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CustomDesign",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = (models.User ||
  model<UserDocument>("User", UserSchema)) as Model<UserDocument>;
export default User;
