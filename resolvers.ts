import Article from "./models/article.model";
import Category from "./models/category.model";

export const resolvers = {
  Query: {
    hello: (): string => {
      return "Hello world!";
    },
    getListArticle: async () => {
      const articles = await Article.find({
        deleted: false,
      });
      return articles;
    },
    getArticle: async (_: any, args: { id: string }) => {
      const { id } = args;
      const article = await Article.findOne({
        _id: id,
        deleted: false,
      });
      return article;
    },
    getListCategory: async () => {
      const categories = await Category.find({
        deleted: false,
      });
      return categories;
    },
    getCategory: async (_: any, args: { id: string }) => {
      const { id } = args;
      const category = await Category.findOne({
        _id: id,
        deleted: false,
      });
      return category;
    },
  },

  Article: {
    category: async (article: {
      id: string;
      title: string;
      avatar: string;
      description: string;
      categoryID: string;
    }) => {
      const categoryID = article.categoryID;

      const category = await Category.findOne({
        _id: categoryID,
      });

      return category;
    },
  },

  Mutation: {
    createArticle: async (
      _: any,
      args: {
        article: {
          title: string;
          avatar: string;
          description: string;
          categoryID: string;
        };
      }
    ) => {
      const { article } = args;
      const newArticle = new Article(article);
      await newArticle.save();
      return newArticle;
    },
    deleteArticle: async (_: any, args: { id: string }) => {
      const { id } = args;
      const article = await Article.findByIdAndUpdate(id, {
        deleted: true,
        deletedAt: new Date(),
      });
      if (!article) {
        return "Article not found";
      }
      return "Article deleted successfully";
    },
    updateArticle: async (
      _: any,
      args: {
        id: string;
        article: {
          title?: string;
          avatar?: string;
          description?: string;
        };
      }
    ) => {
      const { id, article } = args;
      const updatedArticle = await Article.findByIdAndUpdate(
        id,
        { $set: article },
        { new: true }
      );
      if (!updatedArticle) {
        return "Article not found";
      }
      return updatedArticle;
    },
    createCategory: async (
      _: any,
      args: {
        category: {
          name: string;
          description: string;
        };
      }
    ) => {
      const { category } = args;
      const newCategory = new Category(category);
      await newCategory.save();
      return newCategory;
    },
    updateCategory: async (
      _: any,
      args: {
        id: string;
        category: {
          name?: string;
          description?: string;
        };
      }
    ) => {
      const { id, category } = args;
      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        { $set: category },
        { new: true }
      );
      if (!updatedCategory) {
        return "Category not found";
      }
      return updatedCategory;
    },
    deleteCategory: async (_: any, args: { id: string }) => {
      const { id } = args;
      const category = await Category.findByIdAndUpdate(id, {
        deleted: true,
        deletedAt: new Date(),
      });
      if (!category) {
        return "Category not found";
      }
      return "Category deleted successfully";
    },
  },
};
