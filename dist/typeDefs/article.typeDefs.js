"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefsArticle = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefsArticle = (0, apollo_server_express_1.gql) `
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
    getListArticle(
      sortKey: String
      sortValue: String
      currentPage: Int = 1
      limitItems: Int = 2
      filterValue: String
      keyword: String
    ): [Article]
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
