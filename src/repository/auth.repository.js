import { userModel } from "../models/user.model.js"

export default class authRepo{
    async signUp(data){
     try{
       const user=await userModel.create(data);
       user.save();
       return user;
     }catch(err){
       throw err;
     }
    }

    async verifyUser(email){
      try{
       return await userModel.findOneAndUpdate(
        {email},
        {isVerified:true},
        {new:true}
       )
      }catch(err){
        throw err;
      }
    }

    async updatePassword(email,password){
       try{
         return await userModel.findOneAndUpdate(
          {email},
          {password},
          {new:true}
         )
       }catch(err){
         throw err;
       }
    }

    async findByEmail(email){
      return await userModel.findOne({email});
    }
}