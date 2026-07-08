import { userModel } from "../models/user.model.js";

export default class deviceRepo{

    async register(email,token){
       const user= await userModel.findOneAndUpdate(
            {email},
            {deviceTokens:token},
            {returnDocument: "after"}
        )
      console.log(user);
      return user;
    }
}