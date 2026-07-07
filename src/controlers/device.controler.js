
import authRepo from "../repository/auth.repository.js";
import deviceService from "../services/device.service.js"
import notificationService from "../services/notification.service.js";
import pushService from "../services/push.service.js";

export default class deviceControler{
    constructor(){
       this.deviceservice=new deviceService();
       this.authrepository=new authRepo();
    }

    async register(req,res){
        try{
          const result=await this.deviceservice.register(req.body);
          res.status(200).json({
            success:true,
            message:"device registered successfully",
            data:result
          })
        }catch(err){
           res.status(404).json({
            success:false,
            message:err.message
          })
        }
    }
}