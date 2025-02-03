"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleResolvers = void 0;
const article_model_1 = __importDefault(require("../models/article.model"));
const category_model_1 = __importDefault(require("../models/category.model"));
exports.ArticleResolvers = {
    Query: {
        getListArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { sortKey, sortValue, filterValue, keyword, currentPage, limitItems, } = args;
            const sortOptions = {};
            sortOptions[sortKey.toString()] = sortValue === "asc" ? 1 : -1;
            let query = { deleted: false };
            if (filterValue) {
                query.categoryID = filterValue;
            }
            if (keyword) {
                query.title = { $regex: keyword, $options: "i" };
            }
            const articles = yield article_model_1.default.find(query)
                .sort(sortOptions)
                .skip((currentPage - 1) * limitItems)
                .limit(limitItems);
            return articles;
        }),
        getArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = args;
            const article = yield article_model_1.default.findOne({
                _id: id,
                deleted: false,
            });
            return article;
        }),
    },
    Article: {
        category: (article) => __awaiter(void 0, void 0, void 0, function* () {
            const categoryID = article.categoryID;
            const category = yield category_model_1.default.findOne({
                _id: categoryID,
            });
            return category;
        }),
    },
    Mutation: {
        createArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { article } = args;
            const newArticle = new article_model_1.default(article);
            yield newArticle.save();
            return newArticle;
        }),
        deleteArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = args;
            const article = yield article_model_1.default.findByIdAndUpdate(id, {
                deleted: true,
                deletedAt: new Date(),
            });
            if (!article) {
                return "Article not found";
            }
            return "Article deleted successfully";
        }),
        updateArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id, article } = args;
            const updatedArticle = yield article_model_1.default.findByIdAndUpdate(id, { $set: article }, { new: true });
            if (!updatedArticle) {
                return "Article not found";
            }
            return updatedArticle;
        }),
    },
};
