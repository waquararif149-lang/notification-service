import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
},
{
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
)

export const userModel= mongoose.model("User",userSchema);