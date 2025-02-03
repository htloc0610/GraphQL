import { ArticleResolvers } from "./article.resolvers";
import { CategoryResolvers } from "./category.resolvers";
import { UserResolvers } from "./user.resolvers";

const resolvers = [ArticleResolvers, CategoryResolvers, UserResolvers];

export default resolvers;
