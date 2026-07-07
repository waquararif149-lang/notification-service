import deviceRepo from "../repository/device.repository.js"

export default class deviceService{
  
    constructor(){
        this.devicerepository=new deviceRepo();
    }

    async register(data){
      return await this.devicerepository.register(data.email,data.deviceToken);
    }
}