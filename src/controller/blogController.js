import Blog from "../model/blogModel.js";



export const CreateBlog=async(req,res)=>{
  
    try {
      

        const user = new Blog(req.body);

        // const {email} = user;
        // const isExits= await userContact.findOne({email});
        // if(isExits){
        //     res.status(401).json({ error: "User has already exist" }); 
        // }
        // else{
        
            await user.save();
            

            res.status(201).json({ message: "Blog created successfully" });
        // }
        
    } catch (error) {
        res.status(400).json({ error: error.message });
      }
}

export const GetAllBlogs = async (req, res) => {
  try {
    const users = await Blog.find(); 

    if (users.length === 0) {
      return res.status(404).json({ message: "No Blogs found" });
    }

    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const GetBlogById = async (req, res) => {
  try {
    const { id } = req.params; 

    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    const user = await Blog.findById({_id:id});

    if (!user) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const UpdateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    
    const updatedUser = await Blog.findByIdAndUpdate({_id:id}, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
  }
  
    res.json({ message: "BlogData Updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const DeleteBlog = async (req, res) => {
  try {
    const { id } = req.params; 
    const deletedUser = await Blog.findOneAndDelete({_id:id});
    // const deletedUser = await User.deleteMany({ email });//it is for delete many user with same email

    if (!deletedUser) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json({ message: "Blog deleted successfully", user: deletedUser });
    // res.json({ message: "User deleted successfully", user: deletedUser.deletedCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};