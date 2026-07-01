import authService from "../services/auth.service.js";

export default class authControler{

    constructor(){
        this.authservice=new authService();
    }

    async signUp(req,res){
      try{

        const result=await this.authservice.signUp(req.body);
        res.json({
          success:"true",
          message:"signup successful",
          data:result
       })
      }catch(err){
        res.json({
            success:"false",
            message:"signup fail"
        })
      }
    }
}