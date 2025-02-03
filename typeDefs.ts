import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Article {
    id: ID
    title: String
    avatar: String
    description: String
  }
  # Để lấy dữ liệu
  type Query {
    hello: String
    getListArticle: [Article]
    getArticle(id: ID): Article
  }

  input ArticleInput {
    title: String
    avatar: String
    description: String
  }

  # Chỉnh sửa (thêm sửa xoá) dữ liệu
  type Mutation {
    createArticle(article: ArticleInput): Article
    deleteArticle(id: ID): String
    updateArticle(id: ID, article: ArticleInput): Article
  }
`;
