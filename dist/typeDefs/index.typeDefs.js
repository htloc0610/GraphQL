"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const article_typeDefs_1 = require("./article.typeDefs");
const category_typeDefs_1 = require("./category.typeDefs");
const user_typeDefs_1 = require("./user.typeDefs");
const typeDefs = [article_typeDefs_1.typeDefsArticle, category_typeDefs_1.typeDefsCategory, user_typeDefs_1.typeDefsUser];
exports.default = typeDefs;
