import express from "express";
import * as blogController from "../src/controller/blogController.js";
import * as teamController from "./../src/controller/teamController.js";
import * as userController from "../src/controller/userController.js"
import * as ServiceController from "../src/controller/serviceController.js"
import { AuthMiddleware } from "../src/middleware/AuthMiddleware.js";
import * as ImgController from "../src/controller/imageController.js"
import { CreateUser,UpdateUser,DeleteUser,GetAllUsers,GetUserById } from "../src/controller/UserContactcontroller.js";
import { upload } from "../src/middleware/MulterMiddleware.js";

const route= express.Router();

route.post("/UserCreate",CreateUser)
route.get("/findAll", GetAllUsers)
route.get("/findById/:id",GetUserById)
route.put("/UserUpdate/:id",UpdateUser)
route.delete("/UserDelete/:id",DeleteUser)
// route.post("signup",)
route.post("/contact",userController.Contact);
route.post("/register",userController.register);
route.post("/login",userController.login);
route.get("/home",AuthMiddleware,userController.verify);
route.post("/logout",userController.logout)



route.post("/CreateBlog",blogController.CreateBlog);
route.get("/findAllBlog", blogController.GetAllBlogs);
route.get("/findBlogById/:id",blogController.GetBlogById);
route.put("/UpdateBlog/:id",blogController.UpdateBlog);
route.delete("/DeleteBlog/:id",blogController.DeleteBlog);


route.post("/CreateService",ServiceController.CreateService);
route.get("/findAllService", ServiceController.GetAllServices);
route.get("/findServiceById/:id",ServiceController.GetServiceById);
route.put("/UpdateService/:id",ServiceController.UpdateService);
route.delete("/DeleteService/:id",ServiceController.DeleteService);



route.post("/upload",upload.single("file"), ImgController.uploadImage); // Upload local/global image
route.get("/images", ImgController.getImages); // Fetch images
route.get("/image/:id",ImgController.getImageById);


route.post("/CreateMember",upload.single("file"),teamController.CreateTeam);
route.get("/findAllMembers",teamController.GetTeam);
route.get("/findMemberById/:id",teamController.GetMemberById);

const conditionalUpload = (uploadMiddleware) => (req, res, next) => {
    if (!req.file && !req.files) {
      return next(); // Skip Multer if no file is present
    }
    uploadMiddleware(req, res, next); // Proceed with the Multer upload middleware
  };

route.put("/UpdateMemberInfo/:id",conditionalUpload(upload.single("file")),teamController.UpdateTeam);
route.delete("/DeleteMember/:id",teamController.DeleteMember);
export default route;
