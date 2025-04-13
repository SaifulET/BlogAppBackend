import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {type: String,required: true,},
    thumbnail: {type: String,required: true,},
    description: {type: String,required: true,},
    content: {type: String,required: true,},
    createdAt: {type: Date,default: Date.now,},
  },
  { timestamps: true }
);

const Blog = mongoose.model("blogs", blogSchema);
export default Blog;





// import mongoose from "mongoose";

// const DataSchema = new mongoose.Schema({ 
//     userID:{type:mongoose.Schema.Types.ObjectId,require:true},
//     title:{type:String,required:true},
//     des:{type :String,required:true},
//     image:{type :String,required:true},
//     author:{ type : String, required: true },
//     date:{ type : Date, required: true },
//     tags:{ type : [String], required: true },
    
 
// },{
//     timestamps:true,
//     versionKey:false
// }

// )

// const blogModel=mongoose.model('blog',DataSchema)
// export default blogModel