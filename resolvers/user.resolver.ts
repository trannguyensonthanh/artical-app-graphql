

import { generateRandomString } from "../helpers/generate";
import User from "../models/user.model";
import md5 from "md5";
interface data {
  token: string,
  email: string,
  fullName: string,
  id: string
}
export const resolversUser = {

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
  },
};
