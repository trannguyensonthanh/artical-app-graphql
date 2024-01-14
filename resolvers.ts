import Article from "./models/article.model";
import Category from "./models/category.model";

export const resolvers = {
  Query: {
    getListArticle: async () => {
      const articles = await Article.find({
        deleted: false,
      });
      return articles;
    },

    getArticle: async (_, args) => {
      const { id } = args;

      const articles = await Article.findOne({
        _id: id,
        deleted: false,
      });
      return articles;
    },

    getListCategory: async () => {
      const category = await Category.find({
        deleted: false,
      });
      return category;
    },

    getCategory: async (_, args) => {
      const { id } = args;

      const category = await Category.findOne({
        _id: id,
        deleted: false,
      });
      return category;
    },
  },
  Article: {
  category: async (article) => {
     const categoryId = article.categoryId;
     const category = await Category.findOne({
      _id: categoryId
     })
     return category;
  } 
  },
  Mutation: {
    createArticle: async (_, args): Promise<any> => {
      const { article } = args;
      const record = new Article(article);
      await record.save();
      return record;
    },
    deleteArticle: async (_, args): Promise<any> => {
      const { id } = args;
      await Article.updateOne(
        {
          _id: id,
        },
        {
          deleted: true,
          deletedAt: new Date(),
        }
      );
      return "đã xóa";
    },

    updateArticle: async (_, args): Promise<any> => {
      const { id, article } = args;
      await Article.updateOne(
        {
          _id: id,
          deleted: false,
        },
        article
      );

      const record = await Article.findOne({
        _id: id,
      });
      return record;
    },
    createCateogry: async (_, args): Promise<any> => {
      const { category } = args;
      const record = new Article(category);
      await record.save();
      return record;
    },

    updateCateogry: async (_, args): Promise<any> => {
      const { id, category } = args;
      await Article.updateOne(
        {
          _id: id,
          deleted: false,
        },
        category
      );

      const record = await Category.findOne({
        _id: id,
      });
      return record;
    },

    deleteCategory: async (_, args): Promise<any> => {
      const { id } = args;
      await Category.updateOne(
        {
          _id: id,
        },
        {
          deleted: true,
          deletedAt: new Date(),
        }
      );
      return "đã xóa";
    },
  },
};
