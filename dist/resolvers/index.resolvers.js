"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const article_resolvers_1 = require("./article.resolvers");
const category_resolvers_1 = require("./category.resolvers");
const user_resolvers_1 = require("./user.resolvers");
const resolvers = [article_resolvers_1.ArticleResolvers, category_resolvers_1.CategoryResolvers, user_resolvers_1.UserResolvers];
exports.default = resolvers;
