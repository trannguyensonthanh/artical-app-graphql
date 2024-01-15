
import express, {Express} from "express"
import dotenv from "dotenv";
// import path from "path";
// import methodOverride from "method-override"
import * as database from "./config/database";
import {ApolloServer} from "apollo-server-express";
import { typeDefs } from './typeDefs/index.typeDefs';
import { resolvers } from "./resolvers/index.resolver";
// import clientRoutes from "./routes/client/index.route";
// import adminRoutes from "./routes/admin/index.route";
// import {systemConfig} from "./config/system"

const startServer = async () => {
  const app: Express = express();
const port: number | string = process.env.PORT || 3000
dotenv.config();
// app.locals.prefixAdmin = systemConfig.prefixAdmin;
// app.set("views", `${__dirname}/views`); // đẩy dữ liệu ra views  sử dụng thêm __dirname để sử dụng trên cả online luôn
// app.set("view engine", "pug"); // sử dụng pug
database.connect(); // kết nối với mongodb
// app.use(express.static(`${__dirname}/public`)); // sử dụng file static để cho code bk là file nào đc xuất ra  sử dụng thêm __dirname để sử dụng trên cả online luôn
// app.use(methodOverride("_method"));

// // Sử dụng middleware để xử lý dữ liệu JSON
// app.use(express.json());

// // Sử dụng middleware để xử lý dữ liệu từ form-urlencoded
// app.use(express.urlencoded({ extended: true }));

// // tinymce
// app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
// // end tiny mce

//GraphQl

const apolloServer = new ApolloServer({
  typeDefs: typeDefs, // typeDefs là tên của apolloserver
  resolvers: resolvers
});

await apolloServer.start();

apolloServer.applyMiddleware({
  app: app,
  path: "/graphql"
});

// clientRoutes(app);
// adminRoutes(app);
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

}

startServer();