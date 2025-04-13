import mongoose from "mongoose";
const ImageSchema = new mongoose.Schema({
    filename: String, 
    filepath: String, // Stores local file path
    imageUrl: String,
});

const Image= mongoose.model("imgs", ImageSchema);
export default Image;