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
exports.resolvers = void 0;
const article_model_1 = __importDefault(require("./models/article.model"));
const category_model_1 = __importDefault(require("./models/category.model"));
exports.resolvers = {
    Query: {
        getListArticle: () => __awaiter(void 0, void 0, void 0, function* () {
            const articles = yield article_model_1.default.find({
                deleted: false,
            });
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
        getListCategory: () => __awaiter(void 0, void 0, void 0, function* () {
            const categories = yield category_model_1.default.find({
                deleted: false,
            });
            return categories;
        }),
        getCategory: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = args;
            const category = yield category_model_1.default.findOne({
                _id: id,
                deleted: false,
            });
            return category;
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
        createCategory: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { category } = args;
            const newCategory = new category_model_1.default(category);
            yield newCategory.save();
            return newCategory;
        }),
        updateCategory: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id, category } = args;
            const updatedCategory = yield category_model_1.default.findByIdAndUpdate(id, { $set: category }, { new: true });
            if (!updatedCategory) {
                return "Category not found";
            }
            return updatedCategory;
        }),
        deleteCategory: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = args;
            const category = yield category_model_1.default.findByIdAndUpdate(id, {
                deleted: true,
                deletedAt: new Date(),
            });
            if (!category) {
                return "Category not found";
            }
            return "Category deleted successfully";
        }),
    },
};
