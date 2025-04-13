import serviceModel from "../model/serviceModel.js";

export const CreateService=async(req,res)=>{
  
    try {
      

        const user = new serviceModel(req.body);

        // const {email} = user;
        // const isExits= await userContact.findOne({email});
        // if(isExits){
        //     res.status(401).json({ error: "User has already exist" }); 
        // }
        // else{
        
            await user.save();
            

            res.status(201).json({ message: "Service created successfully" });
        // }
        
    } catch (error) {
        res.status(400).json({ error: error.message });
      }
}

export const GetAllServices = async (req, res) => {
  try {
    const users = await serviceModel.find(); 

    if (users.length === 0) {
      return res.status(404).json({ message: "No Service found" });
    }

    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const GetServiceById = async (req, res) => {
  try {
    const { id } = req.params; 

    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    const user = await serviceModel.findById({_id:id});

    if (!user) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const UpdateService = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedService = await serviceModel.findByIdAndUpdate({_id:id}, req.body, { new: true });
    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
  }
    res.json({ message: "Service Updated successfully", user: updatedService });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const DeleteService = async (req, res) => {
  try {
    const { id } = req.params; 
    const deletedService = await serviceModel.findOneAndDelete({_id:id});
    // const deletedUser = await User.deleteMany({ email });//it is for delete many user with same email

    if (!deletedService) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.json({ message: "Service deleted successfully", user: deletedService  });
    // res.json({ message: "User deleted successfully", user: deletedUser.deletedCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
