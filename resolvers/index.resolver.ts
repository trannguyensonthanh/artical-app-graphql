import { resolversArticle } from "./articles.resolver";
import { resolversCategory } from "./category.resolver";
import { resolversUser } from "./user.resolver";

export const resolvers = [
  resolversCategory,
  resolversArticle,
  resolversUser
]