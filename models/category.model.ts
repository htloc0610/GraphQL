import { Schema, model } from "mongoose";

export interface Category {
  title: string;
  avatar: string;
  deleted: boolean;
  deletedAt: Date | null;
}
const categorySchema = new Schema<Category>(
  {
    title: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Category = model<Category>("Category", categorySchema, "category");

export default Category;
