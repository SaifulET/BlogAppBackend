import mongoose from "mongoose";

const DataSchema= new mongoose.Schema({ 
    name:{type:String,required:true},
    des:{type:String,required:true},
    image:{type:String,required:true},
    role:{type:String,required:true},
},{
    timestamps:true,
    versionKey:false
}

)

const teamModel=mongoose.model('members',DataSchema)
export default teamModel