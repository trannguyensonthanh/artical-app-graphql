import { gql } from "apollo-server-express";

export const typeDefsArticle = gql`
  type Article {
    id: ID,
    title: String,
    avatar: String,
    description: String,
    category: Category,
  }

  type Query {
    getListArticle: [Article],
    getArticle(id: ID): Article,
    getListCategory: [Category],
    getCategory(id: ID): Category,
  }

 input ArticleInput {
  title: String,
    avatar: String,
    description: String,
    categoryId: String
 }
  
  type Mutation {
    createArticle(article: ArticleInput ): Article,
    deleteArticle(id: ID): String
    updateArticle(id: ID, article: ArticleInput): Article,
  }
`;