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
       return await userModel.findOneAndUpdate(
        {email},
        {isVerified:true},
        {new:true}
       )
    }
}