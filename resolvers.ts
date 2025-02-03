import Article from "./models/article.model";

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
  },

  Mutation: {
    createArticle: async (
      _: any,
      args: {
        article: {
          title: string;
          avatar: string;
          description: string;
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
  },
};
