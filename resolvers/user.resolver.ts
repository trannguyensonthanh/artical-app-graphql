import { generateRandomString } from "../helpers/generate";
import User from "../models/user.model";
import md5 from "md5";

export const resolversUser = {
  Query: {
    getUser: async(_, args, context) => {
 
      const infoUser = await User.findOne({
        token: context["user"].token,
        deleted: false
      });
      if(infoUser){
        return {
          code: 200,
          message: "Thanh cong!",
          id: infoUser.id,
          fullName: infoUser.fullName,
          email: infoUser.email,
          token: infoUser.token
        };
      
      } else {
        return {
          code: 400,
          message: "That bai!"
        }
      }
    },
  },
  Mutation: {
    registerUser: async (_, args): Promise<any> => {
      const { user } = args;
      // const record = new Article(category);
      // await record.save();
      // return record;
      const existEmail = await User.findOne({
        email: user.email,
        deleted: false
      })
    if (existEmail) {
      return {
        code: 400,
        message: "Email đã tồn tại"
      }
    } else {
      user.password = md5(user.password);
      user.token = generateRandomString(30);
      const newUser = new User(user);
     const data = await newUser.save();
     return {
      code: 200,
      message: 'Thanh cong',
      id: data.id,
      fullName: data.fullName,
      email: data.email,
      token: data.token
     }
    }
    },
    loginUser: async(_,args) => {
      const {email, password} = args.user;
      const infoUser = await User.findOne({
        email: email,
        deleted: false
      });
      
      if(!infoUser){
     return {
          code: 400,
          message: "Email không tồn tại!",
        }; 
 
      }
       
      
      if(md5(password) !== infoUser.password){
     return {
        code: 400,
        message: "Sai mật khẩu!"
      };

      }
      

   return {
        code: 200,
        message: "Đăng nhập thành công!",
        id: infoUser.id,
        fullName: infoUser.fullName,
        email: infoUser.email,
        token: infoUser.token
      };
       
    }
  },
};
