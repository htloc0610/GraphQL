import { Schema, model, Document } from "mongoose";

interface IArticle extends Document {
  title: string;
  avatar: string;
  description: string;
  deleted: boolean;
  deletedAt?: Date;
  categoryID: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const articleSchema = new Schema<IArticle>(
  {
    title: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    categoryID: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Article = model<IArticle>("Article", articleSchema, "articles");

export default Article;
