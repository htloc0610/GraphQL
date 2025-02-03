import { gql } from "apollo-server-express";

export const typeDefsArticle = gql`
  type Article {
    id: ID
    title: String
    avatar: String
    description: String
    category: Category
  }

  type Category {
    id: ID
    title: String
    avatar: String
  }

  # Để lấy dữ liệu
  type Query {
    getListArticle: [Article]
    getArticle(id: ID): Article
  }

  input ArticleInput {
    title: String
    avatar: String
    description: String
    categoryID: ID
  }

  # Chỉnh sửa (thêm sửa xoá) dữ liệu
  type Mutation {
    createArticle(article: ArticleInput): Article
    updateArticle(id: ID, article: ArticleInput): Article
    deleteArticle(id: ID): String
  }
`;
