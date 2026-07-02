import bcrypt from "bcrypt";
import authRepo from "../repository/auth.repository.js";
import notificationService from "./notification.service.js";

const authrepository=new authRepo();

export default class authService{
    async signUp(data){
        const hashedpassword=await bcrypt.hash(data.password,10);
        data.password=hashedpassword;
        const user= await authrepository.signUp(data);
        await notificationService.sendWelcomeemail(user);
        return user;
    }
}