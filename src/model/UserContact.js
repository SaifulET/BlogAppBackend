import mongoose from "mongoose";

const DataSchema= new mongoose.Schema({ 
    userID:{type:mongoose.Schema.Types.ObjectId,require:true},
    name:{type:String,required:true},
    email:{type:String,required:true},
    message:{type:String,required:true},
    
    
 
},{
    timestamps:true,
    versionKey:false
}

)

const userContact=mongoose.model('Contacts',DataSchema)
export default userContact