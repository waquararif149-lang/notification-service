import authService from "../services/auth.service.js";

export default class authControler{

    constructor(){
        this.authservice=new authService();
    }

    async signUp(req,res){
      try{

        const result=await this.authservice.signUp(req.body);
        res.status(200).json({
          success:"true",
          message:"created acount please verify you Eamil",
          data:result
       })
      }catch(err){
        res.json({
            success:"false",
            message:"signup fail"
        })
      }
    }

    async verifyOtp(req,res){
      try{
        const user=await this.authservice.verifyOtp(req.body);
        res.status(200).json({
          success:true,
          message:"email verified successfully",
          data:user
        })
      }catch(err){
        res.status(400).json({
            success:"false",
            message:`${err.message}`
        })
      }
    }
}