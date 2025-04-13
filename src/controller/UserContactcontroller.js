import userContact from "../model/UserContact.js";



export const CreateUser=async(req,res)=>{
  
    try {
        const user = new userContact(req.body);
        const {email} = user;
        const isExits= await userContact.findOne({email});
        if(isExits){
            res.status(401).json({ error: "User has already exist" }); 
        }
        else{
            await userContact.save();
            res.status(201).json({ message: "User created successfully" });
        }
        
    } catch (error) {
        res.status(400).json({ error: error.message });
      }
}

export const GetAllUsers = async (req, res) => {
  try {
    const users = await userContact.find(); 

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const GetUserById = async (req, res) => {
  try {
    const { id } = req.params; 

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const user = await userContact.findById({_id:id});

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const UpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await userContact.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
  }
    res.json({ message: "User data Updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const DeleteUser = async (req, res) => {
  try {
    const { id } = req.params; 


    const deletedUser = await userContact.findOneAndDelete({_id:id});
    // const deletedUser = await User.deleteMany({ email });//it is for delete many user with same email

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully", user: deletedUser });
    // res.json({ message: "User deleted successfully", user: deletedUser.deletedCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};