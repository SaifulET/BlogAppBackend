import mongoose from "mongoose";

const DataSchema= new mongoose.Schema({ 
    
    title: { type: String, required: true },
    icon: { type: String, required: true },
    description: { type: String, required: true },
    
 
},{
    timestamps:true,
    versionKey:false
}

)

const serviceModel=mongoose.model('service',DataSchema)
export default serviceModel