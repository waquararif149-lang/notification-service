import bcrypt from "bcrypt";
import authRepo from "../repository/auth.repository.js";

const authrepository=new authRepo();

export default class authService{
    async signUp(data){
        const hashedpassword=await bcrypt.hash(data.password,10);
        data.password=hashedpassword;
        return await authrepository.signUp(data);
    }
}