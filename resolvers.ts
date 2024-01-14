import Article from "./models/article.model";

export const resolvers = {
  Query: {
      hello: () => {
        return "Hello world";
      },
      getListArticle: async () => {
        const articles = await Article.find({
          deleted: false
        })
        return articles;
      },

      getArticle: async (_, args) => {
       const {id} = args;

        const articles = await Article.findOne({
          _id: id,
          deleted: false
        })
        return articles;
      }
  },
  Mutation : {
   createArticle: async (_, args): Promise<any> => {
      const { article  } = args;
        const record = new Article(article);
        await record.save();
        return record;
        }  
  }
}; 