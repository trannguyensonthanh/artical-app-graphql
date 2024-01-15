import Article from "../models/article.model";
import Category from "../models/category.model";

export const resolversCategory = {
  Query: {

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
  Mutation: {
    createCategory: async (_, args): Promise<any> => {
      const { category } = args;
      const record = new Article(category);
      await record.save();
      return record;
    },

    updateCategory: async (_, args): Promise<any> => {
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
