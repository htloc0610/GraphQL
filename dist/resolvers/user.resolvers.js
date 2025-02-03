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
exports.UserResolvers = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const md5_1 = __importDefault(require("md5"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.UserResolvers = {
    Mutation: {
        registerUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { user } = args;
            const hashedPassword = (0, md5_1.default)(user.password);
            const token = jsonwebtoken_1.default.sign({ id: user.email, fullName: user.fullName }, process.env.YOUR_SECRET_KEY, { expiresIn: "1h" });
            const newUser = new user_model_1.default({
                fullName: user.fullName,
                email: user.email,
                password: hashedPassword,
                token: token,
            });
            yield newUser.save();
            return {
                id: newUser.id,
                fullName: newUser.fullName,
                email: newUser.email,
                token: newUser.token,
            };
        }),
        loginUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { user } = args;
            const existingUser = yield user_model_1.default.findOne({ email: user.email });
            if (!existingUser) {
                throw new Error("User not found");
            }
            const hashedPassword = (0, md5_1.default)(user.password);
            if (hashedPassword !== existingUser.password) {
                throw new Error("Invalid password");
            }
            return {
                id: existingUser.id,
                fullName: existingUser.fullName,
                email: existingUser.email,
                token: existingUser.token,
            };
        }),
    },
    Query: {
        getUser: (_, __, context) => __awaiter(void 0, void 0, void 0, function* () {
            const user = context["user"];
            if (!user) {
                throw new Error("User not found");
            }
            return {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                token: user.token,
            };
        }),
    },
};
